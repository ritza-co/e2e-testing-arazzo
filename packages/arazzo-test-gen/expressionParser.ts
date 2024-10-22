import { factory } from "npm:typescript";
import type { Expression } from "npm:typescript";
import { evaluateRuntimeExpression } from "./utils.ts";

type ComparisonOperator = "==" | "!=" | "<" | "<=" | ">" | ">=";

/**
 * This module provides functions for parsing and evaluating different types of expressions and conditions
 * used in Arazzo test generation. It supports regex, JSONPath, and simple comparison conditions.
 */

/**
 * Parses a condition string and returns a TypeScript Expression.
 * This function serves as the main entry point for condition parsing.
 *
 * @param condition - The condition string to parse.
 * @param usedAssertions - A set to track which assertion functions are used.
 * @param type - The type of condition: "regex", "jsonpath", or "simple".
 * @param context - The context for evaluating the condition, defaults to "$response.body".
 * @returns A TypeScript Expression representing the parsed condition.
 */
export function parseCondition(
  condition: string,
  usedAssertions: Set<string>,
  type?: "regex" | "jsonpath" | "simple",
  context: string = "$response.body",
): Expression {
  if (type === "regex") {
    return parseRegexCondition(condition, usedAssertions, context);
  }

  const { left, operator, right } = parseComparisonCondition(condition);

  const leftExpr = type === "jsonpath"
    ? parseJsonPathExpression(left, context)
    : parseSimpleExpression(left);

  const rightExpr = type === "jsonpath"
    ? parseLiteral(right)
    : parseSimpleExpression(right);

  const assertFunctionName = getAssertFunctionName(operator);
  usedAssertions.add(assertFunctionName);

  return factory.createCallExpression(
    factory.createIdentifier(assertFunctionName),
    undefined,
    [leftExpr, rightExpr, factory.createStringLiteral(condition)],
  );
}

/**
 * Parses a regex condition and returns a TypeScript Expression.
 *
 * @param condition - The regex condition string.
 * @param usedAssertions - A set to track which assertion functions are used.
 * @param context - The context for evaluating the condition.
 * @returns A TypeScript Expression representing the regex condition.
 */
function parseRegexCondition(
  condition: string,
  usedAssertions: Set<string>,
  context: string,
): Expression {
  usedAssertions.add("assertMatch");
  return factory.createCallExpression(
    factory.createIdentifier("assertMatch"),
    undefined,
    [
      evaluateRuntimeExpression(context),
      factory.createNewExpression(
        factory.createIdentifier("RegExp"),
        undefined,
        [factory.createRegularExpressionLiteral(condition)],
      ),
      factory.createStringLiteral(condition),
    ],
  );
}

/**
 * Parses a comparison condition and returns its parts.
 *
 * @param condition - The comparison condition string.
 * @returns An object containing the left side, operator, and right side of the comparison.
 * @throws Error if the condition format is invalid.
 */
function parseComparisonCondition(condition: string): {
  left: string;
  operator: ComparisonOperator;
  right: string;
} {
  const operatorMatch = condition.match(/(.*)(==|!=|<|<=|>|>=)(.*)$/);

  if (!operatorMatch) {
    throw new Error(`Invalid condition format: ${condition}`);
  }

  const [, left, operator, right] = operatorMatch;
  return {
    left: left.trim(),
    operator: operator as ComparisonOperator,
    right: right.trim(),
  };
}

/**
 * Parses a JSONPath expression and returns a TypeScript Expression.
 *
 * @param path - The JSONPath expression.
 * @param context - The context for evaluating the JSONPath.
 * @returns A TypeScript Expression representing the JSONPath evaluation.
 */
function parseJsonPathExpression(path: string, context: string): Expression {
  return factory.createCallExpression(
    factory.createIdentifier("JSONPath"),
    undefined,
    [
      factory.createObjectLiteralExpression(
        [
          factory.createPropertyAssignment(
            factory.createIdentifier("wrap"),
            factory.createFalse(),
          ),
          factory.createPropertyAssignment(
            factory.createIdentifier("path"),
            factory.createStringLiteral(path),
          ),
          factory.createPropertyAssignment(
            factory.createIdentifier("json"),
            evaluateRuntimeExpression(context),
          ),
        ],
        true,
      ),
    ],
  );
}

/**
 * Parses a simple expression and returns a TypeScript Expression.
 *
 * @param expr - The simple expression string.
 * @returns A TypeScript Expression representing the parsed simple expression.
 */
function parseSimpleExpression(expr: string): Expression {
  return expr.startsWith("$")
    ? evaluateRuntimeExpression(expr)
    : parseLiteral(expr);
}

/**
 * Parses a literal value and returns a TypeScript Expression.
 *
 * @param token - The literal value string.
 * @returns A TypeScript Expression representing the parsed literal.
 */
function parseLiteral(token: string): Expression {
  if (token === "true") return factory.createTrue();
  if (token === "false") return factory.createFalse();
  if (token === "null") return factory.createNull();
  if (/^\d+$/.test(token)) return factory.createNumericLiteral(token);
  if (/^'.*'$/.test(token) || /^".*"$/.test(token)) {
    return factory.createStringLiteral(token.slice(1, -1));
  }
  return factory.createStringLiteral(token);
}

/**
 * Returns the appropriate assert function name for a given operator.
 *
 * @param operator - The comparison operator.
 * @returns The name of the corresponding assert function.
 * @throws Error if the operator is unsupported.
 */
function getAssertFunctionName(operator: ComparisonOperator): string {
  const assertFunctions: Record<ComparisonOperator, string> = {
    "==": "assertEquals",
    "!=": "assertNotEquals",
    "<": "assertLess",
    "<=": "assertLessOrEqual",
    ">": "assertGreater",
    ">=": "assertGreaterOrEqual",
  };

  const assertFunction = assertFunctions[operator];
  if (!assertFunction) {
    throw new Error(`Unsupported operator: ${operator}`);
  }

  return assertFunction;
}
