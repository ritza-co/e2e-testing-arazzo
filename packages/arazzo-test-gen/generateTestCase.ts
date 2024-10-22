import ts from "npm:typescript";
import type { OpenAPIV3_1 } from "npm:openapi-types";
import type {
  ArazzoParameter,
  ArazzoRequestBody,
  ArazzoStep,
  ArazzoSuccessCriterion,
  ArazzoWorkflow,
  OperationObjectWithMetadata,
} from "./types.ts";
import {
  evaluateRuntimeExpression,
  findOperationByOperationId,
} from "./utils.ts";
import { getSecurityScheme } from "./security.ts";
import { generateSuccessCriteriaCheck } from "./successCriteria.ts";

/**
 * Generates setup statements for the test environment.
 * This function creates the necessary TypeScript statements to set up the test environment,
 * including the server URL, API key, and an empty context object.
 * @param factory - The TypeScript NodeFactory used to create AST nodes.
 * @param serverUrl - The server URL for the test environment.
 * @returns An array of TypeScript statements for environment setup.
 */
function generateTestEnvironmentSetup(
  factory: ts.NodeFactory,
  serverUrl: string,
): ts.Statement[] {
  return [
    createConstDeclaration(
      factory,
      "serverUrl",
      factory.createStringLiteral(serverUrl),
    ),
    createConstDeclaration(factory, "apiKey", createApiKeyExpression(factory)),
    createConstDeclaration(
      factory,
      "context",
      createEmptyContextObject(factory),
      factory.createTypeReferenceNode(
        factory.createIdentifier("Record"),
        [
          factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
          factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
        ],
      ),
    ),
  ];
}

/**
 * Creates a constant declaration statement.
 * This helper function simplifies the creation of const variable declarations.
 * @param factory - The TypeScript NodeFactory.
 * @param name - The name of the constant.
 * @param initializer - The initializer expression for the constant.
 * @param type - Optional type annotation for the constant.
 * @returns A TypeScript variable statement representing the constant declaration.
 */
function createConstDeclaration(
  factory: ts.NodeFactory,
  name: string,
  initializer: ts.Expression,
  type?: ts.TypeNode,
): ts.VariableStatement {
  return factory.createVariableStatement(
    undefined,
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier(name),
        undefined,
        type,
        initializer,
      )],
      ts.NodeFlags.Const,
    ),
  );
}

/**
 * Creates an expression to get the API key from environment variables.
 * This function generates a TypeScript expression that retrieves the API key
 * from the Deno environment variables.
 * @param factory - The TypeScript NodeFactory.
 * @returns A TypeScript call expression to get the API key.
 */
function createApiKeyExpression(factory: ts.NodeFactory): ts.CallExpression {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("Deno"),
        factory.createIdentifier("env"),
      ),
      factory.createIdentifier("get"),
    ),
    undefined,
    [factory.createStringLiteral("BUILDABOT_API_KEY_AUTH")],
  );
}

/**
 * Creates an empty context object expression.
 * This function generates a TypeScript object literal expression
 * representing an empty context object.
 * @param factory - The TypeScript NodeFactory.
 * @returns A TypeScript object literal expression for an empty context.
 */
function createEmptyContextObject(
  factory: ts.NodeFactory,
): ts.ObjectLiteralExpression {
  return factory.createObjectLiteralExpression([], false);
}

/**
 * Generates statements for path parameters and updates the path.
 * This function processes the path parameters, creates statements to declare them,
 * and updates the API path with the parameter placeholders.
 * @param factory - The TypeScript NodeFactory.
 * @param parameters - The list of Arazzo parameters.
 * @param path - The original API path.
 * @returns An object containing the generated statements and the updated path.
 */
function generatePathParameterStatements(
  factory: ts.NodeFactory,
  parameters: ArazzoParameter[],
  path: string,
): { statements: ts.Statement[]; updatedPath: string } {
  const statements: ts.Statement[] = [];
  let updatedPath = path;

  parameters
    .filter((param) => param["in"] === "path")
    .forEach((param) => {
      const pathParts = updatedPath.split("/");
      const paramIndex = pathParts.indexOf(`{${param.name}}`);

      if (paramIndex !== -1) {
        pathParts[paramIndex] = `\${${param.name}}`;
      }

      updatedPath = pathParts.join("/");

      statements.push(createConstDeclaration(
        factory,
        param.name,
        evaluateRuntimeExpression(param.value),
      ));
    });

  return { statements, updatedPath };
}

/**
 * Generates a fetch request statement.
 * This function creates a TypeScript statement that represents a fetch request
 * to the API, including method, path, security scheme, and request body.
 * @param factory - The TypeScript NodeFactory.
 * @param method - The HTTP method for the request.
 * @param path - The API path for the request.
 * @param securityScheme - Optional security scheme for authentication.
 * @param requestBody - Optional request body for the fetch request.
 * @returns A TypeScript statement for the fetch request.
 */
function generateFetchRequest(
  factory: ts.NodeFactory,
  method: string,
  path: string,
  securityScheme?: { name: string },
  requestBody?: ArazzoRequestBody,
): ts.Statement {
  return createConstDeclaration(
    factory,
    "response",
    factory.createAwaitExpression(
      factory.createCallExpression(
        factory.createIdentifier("fetch"),
        undefined,
        [
          createUrlExpression(factory, path),
          createFetchOptionsObject(
            factory,
            method,
            securityScheme,
            requestBody,
          ),
        ],
      ),
    ),
  );
}

/**
 * Creates a template expression for the URL.
 * This function generates a TypeScript template expression that combines
 * the server URL with the API path.
 * @param factory - The TypeScript NodeFactory.
 * @param path - The API path.
 * @returns A TypeScript template expression for the full URL.
 */
function createUrlExpression(
  factory: ts.NodeFactory,
  path: string,
): ts.TemplateExpression {
  return factory.createTemplateExpression(
    factory.createTemplateHead(""),
    [
      factory.createTemplateSpan(
        factory.createIdentifier("serverUrl"),
        factory.createTemplateTail(path, path),
      ),
    ],
  );
}

/**
 * Creates the fetch options object.
 * This function generates a TypeScript object literal expression
 * containing the options for the fetch request, including method,
 * headers, and body.
 * @param factory - The TypeScript NodeFactory.
 * @param method - The HTTP method for the request.
 * @param securityScheme - Optional security scheme for authentication.
 * @param requestBody - Optional request body for the fetch request.
 * @returns A TypeScript object literal expression for fetch options.
 */
function createFetchOptionsObject(
  factory: ts.NodeFactory,
  method: string,
  securityScheme?: { name: string },
  requestBody?: ArazzoRequestBody,
): ts.ObjectLiteralExpression {
  return factory.createObjectLiteralExpression(
    [
      factory.createPropertyAssignment(
        factory.createIdentifier("method"),
        factory.createStringLiteral(method.toUpperCase()),
      ),
      factory.createPropertyAssignment(
        factory.createIdentifier("headers"),
        createHeadersObject(factory, securityScheme),
      ),
      factory.createPropertyAssignment(
        factory.createIdentifier("body"),
        requestBody
          ? factory.createStringLiteral(
            JSON.stringify(requestBody.payload || {}),
          )
          : factory.createNull(),
      ),
    ],
    true,
  );
}

/**
 * Creates the headers object for the fetch request.
 * This function generates a TypeScript object literal expression
 * representing the headers for the fetch request, including
 * authentication and content type.
 * @param factory - The TypeScript NodeFactory.
 * @param securityScheme - Optional security scheme for authentication.
 * @returns A TypeScript object literal expression for request headers.
 */
function createHeadersObject(
  factory: ts.NodeFactory,
  securityScheme?: { name: string },
): ts.ObjectLiteralExpression {
  return factory.createObjectLiteralExpression(
    [
      factory.createPropertyAssignment(
        factory.createStringLiteral(
          securityScheme ? securityScheme.name : "Authorization",
        ),
        factory.createTemplateExpression(
          factory.createTemplateHead(""),
          [
            factory.createTemplateSpan(
              factory.createIdentifier("apiKey"),
              factory.createTemplateTail(""),
            ),
          ],
        ),
      ),
      factory.createPropertyAssignment(
        factory.createStringLiteral("Content-Type"),
        factory.createStringLiteral("application/json"),
      ),
    ],
    true,
  );
}

/**
 * Generates statements for output processing.
 * This function creates TypeScript statements that process and store
 * the outputs of a test step in the context object.
 * @param factory - The TypeScript NodeFactory.
 * @param outputs - The outputs to process, as key-value pairs.
 * @param stepId - The identifier of the current step.
 * @returns An array of TypeScript statements for output processing.
 */
function generateOutputStatements(
  factory: ts.NodeFactory,
  outputs: Record<string, string>,
  stepId: string,
): ts.Statement[] {
  return Object.entries(outputs).map(([key, value]) =>
    factory.createExpressionStatement(
      factory.createBinaryExpression(
        factory.createElementAccessExpression(
          factory.createIdentifier("context"),
          factory.createStringLiteral(`${stepId}.outputs.${key}`),
        ),
        factory.createToken(ts.SyntaxKind.EqualsToken),
        evaluateRuntimeExpression(value),
      ),
    )
  );
}

/**
 * Generates a test step statement.
 * This function creates a TypeScript statement representing a single test step,
 * including path parameter handling, fetch request, success criteria checks,
 * and output processing.
 * @param factory - The TypeScript NodeFactory.
 * @param step - The Arazzo step to generate the test for.
 * @param operationDetails - The details of the API operation being tested.
 * @param usedAssertions - A set to track used assertions for deduplication.
 * @param securityScheme - Optional security scheme for authentication.
 * @returns A TypeScript statement representing the test step.
 */
function generateTestStep(
  factory: ts.NodeFactory,
  step: ArazzoStep,
  operationDetails: OperationObjectWithMetadata,
  usedAssertions: Set<string>,
  securityScheme?: { name: string },
): ts.Statement {
  const { statements: pathParamStatements, updatedPath } =
    generatePathParameterStatements(
      factory,
      step.parameters || [],
      operationDetails.path,
    );

  const fetchRequestStatement = generateFetchRequest(
    factory,
    operationDetails.method,
    updatedPath,
    securityScheme,
    step.requestBody,
  );

  const successCriteriaStatements = step.successCriteria.map((
    criterion: ArazzoSuccessCriterion,
  ) => generateSuccessCriteriaCheck(criterion, usedAssertions));

  const outputStatements = step.outputs
    ? generateOutputStatements(factory, step.outputs, step.stepId)
    : [];

  return factory.createExpressionStatement(
    factory.createAwaitExpression(
      factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("test"),
          factory.createIdentifier("step"),
        ),
        undefined,
        [
          factory.createStringLiteral(step.description),
          createTestStepFunction(factory, [
            ...pathParamStatements,
            fetchRequestStatement,
            createDataDeclaration(factory),
            ...successCriteriaStatements,
            ...outputStatements,
          ]),
        ],
      ),
    ),
  );
}

/**
 * Creates the test step function.
 * This function generates a TypeScript arrow function that encapsulates
 * the logic for a single test step.
 * @param factory - The TypeScript NodeFactory.
 * @param statements - The statements to include in the function body.
 * @returns A TypeScript arrow function representing the test step.
 */
function createTestStepFunction(
  factory: ts.NodeFactory,
  statements: ts.Statement[],
): ts.ArrowFunction {
  return factory.createArrowFunction(
    [factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
    undefined,
    [],
    undefined,
    factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    factory.createBlock(statements, true),
  );
}

/**
 * Creates a declaration for the response data.
 * This function generates a TypeScript variable statement that declares
 * a constant to hold the JSON response data from the API call.
 * @param factory - The TypeScript NodeFactory.
 * @returns A TypeScript variable statement for the response data.
 */
function createDataDeclaration(factory: ts.NodeFactory): ts.VariableStatement {
  return createConstDeclaration(
    factory,
    "data",
    factory.createAwaitExpression(
      factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("response"),
          factory.createIdentifier("json"),
        ),
        undefined,
        [],
      ),
    ),
  );
}

/**
 * Generates a test case statement.
 * This function creates a TypeScript statement that represents an entire test case,
 * including environment setup and all test steps defined in the workflow.
 * @param workflow - The Arazzo workflow defining the test case.
 * @param serverUrl - The server URL for the test environment.
 * @param openApiDoc - The OpenAPI document describing the API.
 * @param usedAssertions - A set to track used assertions for deduplication.
 * @returns A TypeScript statement representing the complete test case.
 */
export function generateTestCase(
  workflow: ArazzoWorkflow,
  serverUrl: string,
  openApiDoc: OpenAPIV3_1.Document,
  usedAssertions: Set<string>,
): ts.Statement {
  const factory = ts.factory;
  const testStatements: ts.Statement[] = [];

  const securityScheme = getSecurityScheme(openApiDoc);

  testStatements.push(...generateTestEnvironmentSetup(factory, serverUrl));

  for (const step of workflow.steps) {
    const operationDetails = findOperationByOperationId(
      openApiDoc,
      step.operationId,
    );
    if (!operationDetails) {
      console.warn(`Operation not found for operationId: ${step.operationId}`);
      continue;
    }

    testStatements.push(
      generateTestStep(
        factory,
        step,
        operationDetails,
        usedAssertions,
        securityScheme,
      ),
      factory.createEmptyStatement(), // Add newline between test steps
    );
  }

  return factory.createExpressionStatement(
    factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("Deno"),
        factory.createIdentifier("test"),
      ),
      undefined,
      [
        factory.createStringLiteral(workflow.description),
        createTestCaseFunction(factory, testStatements),
      ],
    ),
  );
}

/**
 * Creates the test case function.
 * This function generates a TypeScript arrow function that encapsulates
 * the entire test case, including all test steps.
 * @param factory - The TypeScript NodeFactory.
 * @param statements - The statements to include in the function body.
 * @returns A TypeScript arrow function representing the entire test case.
 */
function createTestCaseFunction(
  factory: ts.NodeFactory,
  statements: ts.Statement[],
): ts.ArrowFunction {
  return factory.createArrowFunction(
    [factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
    undefined,
    [
      factory.createParameterDeclaration(
        undefined,
        undefined,
        "test",
        undefined,
        undefined,
        undefined,
      ),
    ],
    undefined,
    factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    factory.createBlock(statements, true),
  );
}
