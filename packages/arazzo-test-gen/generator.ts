import { dirname, join } from "jsr:@std/path";
import ts from "npm:typescript";
import { ensureFile } from "jsr:@std/fs";
import { createFromBuffer } from "jsr:@dprint/formatter";
import { getPath as getTypeScriptFormatter } from "npm:@dprint/typescript";
import { readArazzoYaml } from "./readArazzoYaml.ts";
import { readOpenApiYaml } from "./readOpenApiYaml.ts";
import { generateTestCase } from "./generateTestCase.ts";
import type { ArazzoWorkflow } from "./types.ts";

export async function generateTests(inputPath: string, outputPath: string) {
  const realInputPath = await Deno.realPath(inputPath);
  const realOutputPath = await Deno.realPath(outputPath);

  console.log(`Reading Arazzo document from ${realInputPath}`);

  const { sourceDescriptions, workflows } = await readArazzoYaml(realInputPath);

  // If the Arazzo document has multiple source descriptions, we can use the first one to read the OpenAPI document
  const sourceDescription = sourceDescriptions[0];

  // Resolve the OpenAPI file path
  const inputDir = dirname(await Deno.realPath(realInputPath));
  const openApiPath = sourceDescription.url.startsWith(".")
    ? join(inputDir, sourceDescription.url)
    : sourceDescription.url;

  console.log(`Reading OpenAPI document from ${openApiPath}`);

  const { document: openApi, serverUrl } = await readOpenApiYaml(openApiPath);

  const factory = ts.factory;

  const importStatements: ts.Statement[] = [];

  importStatements.push(
    factory.createImportDeclaration(
      undefined,
      factory.createImportClause(
        false,
        undefined,
        factory.createNamedImports([
          factory.createImportSpecifier(
            false,
            undefined,
            factory.createIdentifier("assertEquals"),
          ),
          factory.createImportSpecifier(
            false,
            undefined,
            factory.createIdentifier("assertMatch"),
          ),
        ]),
      ),
      factory.createStringLiteral("@std/assert"),
      undefined,
    ),
  );

  const requiresJsonPath = workflows.some((workflow: ArazzoWorkflow) =>
    workflow.steps.some(({ successCriteria }) =>
      successCriteria.some((criterion) => criterion.type === "jsonpath")
    )
  );

  if (requiresJsonPath) {
    importStatements.push(
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
          false,
          undefined,
          factory.createNamedImports([
            factory.createImportSpecifier(
              false,
              undefined,
              factory.createIdentifier("JSONPath"),
            ),
          ]),
        ),
        factory.createStringLiteral("npm:jsonpath-plus@8.0.0"),
        undefined,
      ),
    );
  }

  importStatements.push(
    factory.createImportDeclaration(
      undefined,
      undefined,
      factory.createStringLiteral("jsr:@std/dotenv/load"),
      undefined,
    ),
  );

  const testCases = workflows.map((workflow) =>
    generateTestCase(workflow, serverUrl, openApi)
  );

  const sourceFile = factory.createSourceFile(
    [
      ...importStatements,
      factory.createEmptyStatement(),
      factory.createEmptyStatement(),
      ...testCases,
    ],
    factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None,
  );

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const result = printer.printNode(
    ts.EmitHint.Unspecified,
    sourceFile,
    sourceFile,
  );

  const formatter = createFromBuffer(
    await Deno.readFile(getTypeScriptFormatter()),
  );

  formatter.setConfig(
    {},
    {
      deno: true,
    },
  );

  const formattedResult = formatter.formatText({
    filePath: realOutputPath,
    fileText: result,
  });

  await ensureFile(realOutputPath);
  await Deno.writeTextFile(realOutputPath, formattedResult);
  console.log(`Tests generated and written to ${realOutputPath}`);
}
