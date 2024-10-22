import * as ts from "npm:typescript";
import { parseSimpleCondition } from "./expressionParser.ts";
import { evaluateRuntimeExpression } from "./utils.ts";

export function generateSuccessCriteriaCheck(criteria: {
  condition: string;
  context?: string;
  type?: string;
}): ts.Statement {
  const factory = ts.factory;

  let check: ts.Expression;
  let assertion = "assertEquals";
  let expected: ts.Expression = factory.createTrue();

  switch (criteria.type) {
    case "jsonpath":
      check = factory.createCallExpression(
        factory.createIdentifier("JSONPath"),
        undefined,
        [
          factory.createObjectLiteralExpression(
            [
              factory.createPropertyAssignment(
                factory.createIdentifier("wrap"),
                factory.createFalse()
              ),
              factory.createPropertyAssignment(
                factory.createIdentifier("path"),
                factory.createStringLiteral(criteria.condition)
              ),
              factory.createPropertyAssignment(
                factory.createIdentifier("json"),
                evaluateRuntimeExpression(criteria.context || "$response.body")
              ),
            ],
            true
          ),
        ]
      );
      break;
    case "regex": {
      expected = factory.createNewExpression(
        factory.createIdentifier("RegExp"),
        undefined,
        [factory.createRegularExpressionLiteral(criteria.condition)]
      );
      check = evaluateRuntimeExpression(criteria.context || "$response.body");
      assertion = "assertMatch";
      break;
    }
    case "simple":
    default:
      return factory.createExpressionStatement(
        parseSimpleCondition(criteria.condition)
      );
  }

  return factory.createExpressionStatement(
    factory.createCallExpression(
      factory.createIdentifier(assertion),
      undefined,
      [check, expected, factory.createStringLiteral(criteria.condition)]
    )
  );
}
