import { dirname, join } from "jsr:@std/path";
import ts from "npm:typescript";
import { ensureFile } from "jsr:@std/fs";
import { createFromBuffer } from "jsr:@dprint/formatter";
import { getPath as getTypeScriptFormatter } from "npm:@dprint/typescript";
import { readArazzoYaml } from "./readArazzoYaml.ts";
import { readOpenApiYaml } from "./readOpenApiYaml.ts";
import { generateTestCase } from "./generateTestCase.ts";
import type { ArazzoWorkflow } from "./types.ts";

/**
 * Generates test cases based on Arazzo and OpenAPI documents.
 *
 * This function reads an Arazzo YAML file and its associated OpenAPI document,
 * generates test cases based on the workflows defined in the Arazzo document,
 * and writes the resulting TypeScript test file to the specified output path.
 *
 * @param inputPath - The path to the input Arazzo YAML file.
 * @param outputPath - The path where the generated test file will be written.
 */
export async function generateTests(inputPath: string, outputPath: string) {
  const realInputPath = await Deno.realPath(inputPath);

  await ensureFile(outputPath);
  const realOutputPath = await Deno.realPath(outputPath);

  console.log(`Reading Arazzo document from ${realInputPath}`);

  const { sourceDescriptions, workflows } = await readArazzoYaml(realInputPath);

  // If the Arazzo document has multiple source descriptions, we use the first one to read the OpenAPI document
  const sourceDescription = sourceDescriptions[0];

  // Resolve the OpenAPI file path
  const inputDir = dirname(await Deno.realPath(realInputPath));
  const openApiPath = sourceDescription.url.startsWith(".")
    ? join(inputDir, sourceDescription.url)
    : sourceDescription.url;

  console.log(`Reading OpenAPI document from ${openApiPath}`);

  const { document: openApi, serverUrl } = await readOpenApiYaml(openApiPath);

  const factory = ts.factory;

  const usedAssertions = new Set<string>();

  const importStatements: ts.ImportDeclaration[] = [];

  // Add dotenv import
  importStatements.push(
    factory.createImportDeclaration(
      undefined,
      undefined,
      factory.createStringLiteral("jsr:@std/dotenv/load"),
      undefined,
    ),
  );

  // Check if any workflow uses JSONPath for success criteria
  const requiresJsonPath = workflows.some((workflow: ArazzoWorkflow) =>
    workflow.steps.some(({ successCriteria }) =>
      successCriteria.some((criterion) => criterion.type === "jsonpath")
    )
  );

  // Add JSONPath import if required
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
        factory.createStringLiteral("npm:jsonpath-plus"),
        undefined,
      ),
    );
  }

  // Generate test cases for each workflow
  const testCases = workflows.map((workflow) =>
    generateTestCase(workflow, serverUrl, openApi, usedAssertions)
  );

  if (usedAssertions.size === 0) {
    console.log(
      "No assertions used in the test cases. Not generating test file.",
    );
    return;
  }

  // Helper function to create import specifiers for assertions
  function createAssertImport(name: string) {
    return factory.createImportSpecifier(
      false,
      undefined,
      factory.createIdentifier(name),
    );
  }

  // Add imports for used assertions
  importStatements.push(
    factory.createImportDeclaration(
      undefined,
      factory.createImportClause(
        false,
        undefined,
        factory.createNamedImports([
          ...usedAssertions.values().map((name) => createAssertImport(name)),
        ]),
      ),
      factory.createStringLiteral("jsr:@std/assert"),
      undefined,
    ),
  );

  importStatements[0] = ts.addSyntheticLeadingComment(
    importStatements[0],
    ts.SyntaxKind.MultiLineCommentTrivia,
    `*\n * This test file was generated from an arazzo.yaml document.\n * Do not edit this file manually.\n`,
    true,
  );


  // Create the source file with the comment, imports, and test cases
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

  // Print the source file to a string
  const printer = ts.createPrinter({ removeComments: false, newLine: ts.NewLineKind.LineFeed });
  const result = printer.printNode(
    ts.EmitHint.SourceFile,
    sourceFile,
    sourceFile,
  );

  // Format the generated code
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

  // Write the formatted result to the output file
  await Deno.writeTextFile(realOutputPath, formattedResult);
  console.log(`Tests generated and written to ${realOutputPath}`);
}
