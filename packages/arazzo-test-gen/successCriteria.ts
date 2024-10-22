import ts from "npm:typescript";
import { parseCondition } from "./expressionParser.ts";
import type { ArazzoSuccessCriterion } from "./types.ts";

/**
 * Generates a TypeScript statement for checking a success criterion.
 *
 * This function takes an Arazzo success criterion and generates a TypeScript
 * expression statement that represents the condition check. It uses the
 * parseCondition function from the expressionParser to convert the condition
 * into a TypeScript expression.
 *
 * @param criterion - The Arazzo success criterion to generate a check for.
 * @param usedAssertions - A set of assertion names that have been used, to avoid duplicates.
 * @returns A TypeScript statement representing the success criterion check.
 */
export function generateSuccessCriteriaCheck(
  criterion: ArazzoSuccessCriterion,
  usedAssertions: Set<string>,
): ts.Statement {
  const factory = ts.factory;

  // Parse the condition and create an expression statement
  return factory.createExpressionStatement(
    parseCondition(
      criterion.condition,
      usedAssertions,
      criterion.type,
      criterion.context || "$response.body",
    ),
  );
}
