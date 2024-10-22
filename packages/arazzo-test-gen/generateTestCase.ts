import * as ts from "npm:typescript";
import type { OpenAPIV3_1 } from "npm:openapi-types";
import type { ArazzoWorkflow } from "./types.ts";
import { findOperationByOperationId, evaluateRuntimeExpression } from "./utils.ts";
import { getSecurityScheme } from "./security.ts";
import { generateSuccessCriteriaCheck } from "./successCriteria.ts";

export function generateTestCase(
  workflow: ArazzoWorkflow,
  serverUrl: string,
  openApiDoc: OpenAPIV3_1.Document
): ts.Statement {
  const factory = ts.factory;
  const testStatements: ts.Statement[] = [];

  const securityScheme = getSecurityScheme(openApiDoc);

  // Add statements to set up the test environment
  testStatements.push(
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier("serverUrl"),
            undefined,
            undefined,
            factory.createStringLiteral(serverUrl)
          ),
        ],
        ts.NodeFlags.Const
      )
    ),
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier("apiKey"),
            undefined,
            undefined,
            factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createPropertyAccessExpression(
                  factory.createIdentifier("Deno"),
                  factory.createIdentifier("env")
                ),
                factory.createIdentifier("get")
              ),
              undefined,
              [factory.createStringLiteral("BUILDABOT_API_KEY_AUTH")]
            )
          ),
        ],
        ts.NodeFlags.Const
      )
    ),
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier("context"),
            undefined,
            factory.createTypeReferenceNode(
              factory.createIdentifier("Record"),
              [
                factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
              ]
            ),
            factory.createObjectLiteralExpression([], false)
          ),
        ],
        ts.NodeFlags.Const
      )
    )
  );

  for (const step of workflow.steps) {
    const operationDetails = findOperationByOperationId(
      openApiDoc,
      step.operationId
    );
    if (!operationDetails) {
      console.warn(`Operation not found for operationId: ${step.operationId}`);
      continue;
    }

    const method = operationDetails.method;
    let path = operationDetails.path;

    testStatements.push(
      factory.createExpressionStatement(
        factory.createAwaitExpression(
          factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier("test"),
              factory.createIdentifier("step")
            ),
            undefined,
            [
              factory.createStringLiteral(step.description),
              factory.createArrowFunction(
                [factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
                undefined,
                [],
                undefined,
                factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                factory.createBlock(
                  [
                    // Check step parameters for any runtime expressions and assign them to variables
                    ...(step.parameters
                      ? step.parameters
                          .filter((value) => value["in"] === "path")
                          .map((param) => {
                            // Find the parameter in the path and replace it with the runtime expression as a template literal

                            const pathParts = path.split("/");
                            const paramIndex = pathParts.indexOf(
                              `{${param.name}}`
                            );

                            if (paramIndex !== -1) {
                              pathParts[paramIndex] = "${" + param.name + "}";
                            }

                            path = pathParts.join("/");

                            return factory.createVariableStatement(
                              undefined,
                              factory.createVariableDeclarationList(
                                [
                                  factory.createVariableDeclaration(
                                    factory.createIdentifier(param.name),
                                    undefined,
                                    undefined,
                                    evaluateRuntimeExpression(param.value)
                                  ),
                                ],
                                ts.NodeFlags.Const
                              )
                            );
                          })
                      : []),

                    factory.createVariableStatement(
                      undefined,
                      factory.createVariableDeclarationList(
                        [
                          factory.createVariableDeclaration(
                            factory.createIdentifier("response"),
                            undefined,
                            undefined,
                            factory.createAwaitExpression(
                              factory.createCallExpression(
                                factory.createIdentifier("fetch"),
                                undefined,
                                [
                                  factory.createTemplateExpression(
                                    factory.createTemplateHead(""),
                                    [
                                      factory.createTemplateSpan(
                                        factory.createIdentifier("serverUrl"),
                                        factory.createTemplateTail(path, path)
                                      ),
                                    ]
                                  ),
                                  factory.createObjectLiteralExpression(
                                    [
                                      factory.createPropertyAssignment(
                                        factory.createIdentifier("method"),
                                        factory.createStringLiteral(
                                          method.toUpperCase()
                                        )
                                      ),
                                      factory.createPropertyAssignment(
                                        factory.createIdentifier("headers"),
                                        factory.createObjectLiteralExpression(
                                          [
                                            factory.createPropertyAssignment(
                                              factory.createStringLiteral(
                                                securityScheme
                                                  ? securityScheme.name
                                                  : "Authorization"
                                              ),
                                              factory.createTemplateExpression(
                                                factory.createTemplateHead(
                                                  securityScheme
                                                    ? securityScheme.prefix
                                                    : ""
                                                ),
                                                [
                                                  factory.createTemplateSpan(
                                                    factory.createIdentifier(
                                                      "apiKey"
                                                    ),
                                                    factory.createTemplateTail(
                                                      ""
                                                    )
                                                  ),
                                                ]
                                              )
                                            ),
                                            factory.createPropertyAssignment(
                                              factory.createStringLiteral(
                                                "Content-Type"
                                              ),
                                              factory.createStringLiteral(
                                                "application/json"
                                              )
                                            ),
                                          ],
                                          true
                                        )
                                      ),
                                      factory.createPropertyAssignment(
                                        factory.createIdentifier("body"),
                                        step.requestBody
                                          ? factory.createStringLiteral(
                                              JSON.stringify(
                                                step.requestBody?.payload || {}
                                              )
                                            )
                                          : factory.createNull()
                                      ),
                                    ],
                                    true
                                  ),
                                ]
                              )
                            )
                          ),
                        ],
                        ts.NodeFlags.Const
                      )
                    ),
                    factory.createVariableStatement(
                      undefined,
                      factory.createVariableDeclarationList(
                        [
                          factory.createVariableDeclaration(
                            factory.createIdentifier("data"),
                            undefined,
                            undefined,
                            factory.createAwaitExpression(
                              factory.createCallExpression(
                                factory.createPropertyAccessExpression(
                                  factory.createIdentifier("response"),
                                  factory.createIdentifier("json")
                                ),
                                undefined,
                                []
                              )
                            )
                          ),
                        ],
                        ts.NodeFlags.Const
                      )
                    ),
                    ...step.successCriteria.map(generateSuccessCriteriaCheck),
                    ...(step.outputs
                      ? Object.entries(step.outputs).map(([key, value]) =>
                          factory.createExpressionStatement(
                            factory.createBinaryExpression(
                              factory.createElementAccessExpression(
                                factory.createIdentifier("context"),
                                factory.createStringLiteral(
                                  `${step.stepId}.outputs.${key}`
                                )
                              ),
                              factory.createToken(ts.SyntaxKind.EqualsToken),
                              evaluateRuntimeExpression(value)
                            )
                          )
                        )
                      : []),
                  ],
                  true
                )
              ),
            ]
          )
        )
      ),
      factory.createEmptyStatement() // Add newline between test steps
    );
  }

  return factory.createExpressionStatement(
    factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("Deno"),
        factory.createIdentifier("test")
      ),
      undefined,
      [
        factory.createStringLiteral(workflow.description),
        factory.createArrowFunction(
          [factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
          undefined,
          [
            factory.createParameterDeclaration(
              undefined,
              undefined,
              "test",
              undefined,
              undefined,
              undefined
            ),
          ],
          undefined,
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(testStatements, true)
        ),
      ]
    )
  );
}
