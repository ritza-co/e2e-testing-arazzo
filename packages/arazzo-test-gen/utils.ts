import * as ts from "npm:typescript";
import type { OpenAPIV3_1 } from "npm:openapi-types";
import { parsePointer } from "npm:@redocly/openapi-core/lib/ref-utils.js";
import { parse as parseRuntimeExpression } from "./runtimeExpression.js";

export function findOperationByOperationId(
  openApiDoc: OpenAPIV3_1.Document,
  operationId: string
):
  | { path: string; method: string; operation: OpenAPIV3_1.OperationObject }
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

export function evaluateRuntimeExpression(expression: string): ts.Expression {
  const factory = ts.factory;

  if (!expression) {
    return factory.createIdentifier("undefined");
  }

  const parsed = parseRuntimeExpression(expression);

  console.log("parsed", parsed);

  const root = typeof parsed === "string" ? parsed : parsed[0];

  let result: ts.Expression;

  switch (root) {
    case "$steps.": {
      const parts: string[] = [root, ...parsed[1]].join("").split(".")
      const stepId = parts[1];
      const element = parts[2];
      const key = parts.slice(3).join(".");
      result = factory.createElementAccessExpression(
        factory.createIdentifier("context"),
        factory.createStringLiteral(`${stepId}.${element}.${key}`)
      );
      break;
    }
    case "$statusCode": {
      result = factory.createPropertyAccessExpression(
        factory.createIdentifier("response"),
        factory.createIdentifier("status")
      );
      break;
    }
    case "$request.":
    case "$response.": {
      const data = factory.createIdentifier("data");
      // use parseRef to handle everything after $response.body
      const pointer = parsePointer(expression.slice(15));
      result =
        pointer.length > 0
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
