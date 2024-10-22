import ts from "npm:typescript";
import { assertEquals } from "jsr:@std/assert";
import { parseCondition } from "./expressionParser.ts";

Deno.test("parseCondition handles JSONPath expressions correctly", () => {
  const testCases = [
    "$.length == 5",
    "$.length != 5",
    "$[?(@['director'] == 'Sam Mendes' && @['releasedate'] == \"2024-09-01\")][0].id == 2456",
  ];

  for (const condition of testCases) {
    const result = parseCondition(condition, new Set([]), "jsonpath");

    // Verify that the result is a call expression
    assertEquals(result.kind, ts.SyntaxKind.CallExpression);

    const callExpr = result as ts.CallExpression;

    // Verify that the called function is an assert function
    const functionName = (callExpr.expression as ts.Identifier).text;
    assertEquals(
      functionName.startsWith("assert"),
      true,
      `Function ${functionName} should start with 'assert'`,
    );

    // Verify that the first argument is a JSONPath call
    const firstArg = callExpr.arguments[0] as ts.CallExpression;
    assertEquals(firstArg.expression.kind, ts.SyntaxKind.Identifier);
    assertEquals((firstArg.expression as ts.Identifier).text, "JSONPath");

    // Verify that the condition is passed as the last argument
    const lastArg = callExpr
      .arguments[callExpr.arguments.length - 1] as ts.StringLiteral;
    assertEquals(lastArg.text, condition);
  }
});
