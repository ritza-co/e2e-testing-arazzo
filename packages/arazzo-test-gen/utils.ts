import ts from "npm:typescript";
import type { OpenAPIV3_1 } from "npm:openapi-types";
import { parsePointer } from "npm:@redocly/openapi-core/lib/ref-utils.js";

// @ts-types="./runtime-expression/runtimeExpression.d.ts"
import { parse as parseRuntimeExpression } from "./runtime-expression/runtimeExpression.js";

import type { OperationObjectWithMetadata } from "./types.ts";

/**
 * Finds an operation in an OpenAPI document by its operationId.
 *
 * This function searches through all paths and methods in the OpenAPI document
 * to find an operation that matches the given operationId.
 *
 * @param openApiDoc - The OpenAPI document to search.
 * @param operationId - The operationId to find.
 * @returns An OperationObjectWithMetadata if found, or undefined if not found.
 */
export function findOperationByOperationId(
  openApiDoc: OpenAPIV3_1.Document,
  operationId: string,
):
  | OperationObjectWithMetadata
  | undefined {
  for (const [path, pathItem] of Object.entries(openApiDoc?.paths || {})) {
    for (const [method, operation] of Object.entries(pathItem || {})) {
      if (
        typeof operation === "object" &&
        "operationId" in operation &&
        operation.operationId === operationId
      ) {
        return {
          path,
          method,
          operation: operation as OpenAPIV3_1.OperationObject,
        };
      }
    }
  }
  return undefined;
}

/**
 * Evaluates a runtime expression and returns a TypeScript expression.
 *
 * This function parses and evaluates various types of runtime expressions,
 * such as $steps, $statusCode, $request, and $response, and converts them
 * into appropriate TypeScript expressions.
 *
 * @param expression - The runtime expression to evaluate.
 * @returns A TypeScript expression representing the evaluated runtime expression.
 */
export function evaluateRuntimeExpression(expression: string): ts.Expression {
  const factory = ts.factory;

  if (!expression) {
    return factory.createIdentifier("undefined");
  }

  const parsed = parseRuntimeExpression(expression);

  const root = typeof parsed === "string" ? parsed : parsed[0];

  let result: ts.Expression;

  switch (root) {
    case "$steps.": {
      // Handle $steps expressions
      const parts: string[] = [root, ...parsed[1]].join("").split(".");
      const stepId = parts[1];
      const element = parts[2];
      const key = parts.slice(3).join(".");
      result = factory.createElementAccessExpression(
        factory.createIdentifier("context"),
        factory.createStringLiteral(`${stepId}.${element}.${key}`),
      );
      break;
    }
    case "$statusCode": {
      // Handle $statusCode expressions
      result = factory.createPropertyAccessExpression(
        factory.createIdentifier("response"),
        factory.createIdentifier("status"),
      );
      break;
    }
    case "$request.":
    case "$response.": {
      // Handle $request and $response expressions
      const data = factory.createIdentifier("data");
      // use parseRef to handle everything after $response.body
      const pointer = parsePointer(expression.slice(15));
      result = pointer.length > 0
        ? factory.createPropertyAccessExpression(data, pointer.join("."))
        : data;
      break;
    }
    default: {
      console.log("Unknown runtime expression", expression);
      return factory.createIdentifier("undefined");
    }
  }

  return result;
}
