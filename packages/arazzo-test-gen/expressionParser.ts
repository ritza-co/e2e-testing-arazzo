import * as ts from "npm:typescript";
import { evaluateRuntimeExpression } from "./utils.ts";

function createAssertExpression(
  factory: ts.NodeFactory,
  assertType: string,
  left: ts.Expression,
  right: ts.Expression,
  message: string = "Condition failed"
): ts.Expression {
  return factory.createCallExpression(
    factory.createIdentifier(assertType),
    undefined,
    [left, right, factory.createStringLiteral(message)]
  );
}

export function parseSimpleCondition(condition: string): ts.Expression {
  const factory = ts.factory;
  const operators: Record<
    "==" | "!=" | "<" | "<=" | ">" | ">=" | "&&" | "||",
    | ts.SyntaxKind.EqualsEqualsEqualsToken
    | ts.SyntaxKind.ExclamationEqualsEqualsToken
    | ts.SyntaxKind.LessThanToken
    | ts.SyntaxKind.LessThanEqualsToken
    | ts.SyntaxKind.GreaterThanToken
    | ts.SyntaxKind.GreaterThanEqualsToken
    | ts.SyntaxKind.AmpersandAmpersandToken
    | ts.SyntaxKind.BarBarToken
  > = {
    "==": ts.SyntaxKind.EqualsEqualsEqualsToken,
    "!=": ts.SyntaxKind.ExclamationEqualsEqualsToken,
    "<": ts.SyntaxKind.LessThanToken,
    "<=": ts.SyntaxKind.LessThanEqualsToken,
    ">": ts.SyntaxKind.GreaterThanToken,
    ">=": ts.SyntaxKind.GreaterThanEqualsToken,
    "&&": ts.SyntaxKind.AmpersandAmpersandToken,
    "||": ts.SyntaxKind.BarBarToken,
  };

  const tokens =
    condition.match(
      /(\$\w+(?:\.\w+|#\/\w+)*|\d+|'[^']*'|==|!=|<=|>=|<|>|&&|\|\||\(|\)|\[|\]|\.|!|\w+)/g
    ) || [];

  function parseLiteral(token: string): ts.Expression {
    if (token === "true") return factory.createTrue();
    if (token === "false") return factory.createFalse();
    if (token === "null") return factory.createNull();
    if (/^\d+$/.test(token)) return factory.createNumericLiteral(token);
    if (/^'.*'$/.test(token) || /^".*"$/.test(token)) {
      return factory.createStringLiteral(token.slice(1, -1));
    }
    if (token.startsWith("$")) return evaluateRuntimeExpression(token);
    return factory.createStringLiteral(token);
  }

  function parseExpression(tokens: string[], precedence = 0): ts.Expression {
    let left = parseUnary();

    while (tokens.length > 0) {
      const op = tokens[0];
      const newPrecedence = getPrecedence(op);
      if (newPrecedence <= precedence) break;

      tokens.shift();
      const right = parseExpression(tokens, newPrecedence);

      // Use assert functions for simple comparisons
      if (op === "==" || op === "!=") {
        const assertType = op === "==" ? "assertEquals" : "assertNotEquals";
        left = createAssertExpression(factory, assertType, left, right, condition);
      } else if (op === "<" || op === "<=" || op === ">" || op === ">=") {
        const assertType = {
          "<": "assertLessThan",
          "<=": "assertLessThanOrEqual",
          ">": "assertGreaterThan",
          ">=": "assertGreaterThanOrEqual",
        }[op];
        left = createAssertExpression(factory, assertType, left, right, condition);
      } else {
        left = factory.createBinaryExpression(
          left,
          factory.createToken(operators[op as keyof typeof operators]),
          right
        );
      }
    }

    return left;
  }

  function parseUnary(): ts.Expression {
    if (tokens[0] === "!") {
      tokens.shift();
      return factory.createPrefixUnaryExpression(
        ts.SyntaxKind.ExclamationToken,
        parseUnary()
      );
    }
    return parsePrimary();
  }

  function parsePrimary(): ts.Expression {
    if (tokens[0] === "(") {
      tokens.shift();
      const expr = parseExpression(tokens);
      if (tokens.shift() !== ")") {
        throw new Error("Expected closing parenthesis");
      }
      return expr;
    }
    const token = tokens.shift();
    if (!token) throw new Error("Unexpected end of input");
    if (token === "[") {
      const index = tokens.shift();
      if (tokens.shift() !== "]") throw new Error("Expected closing bracket");
      return factory.createElementAccessExpression(
        parsePrimary(),
        parseLiteral(index!)
      );
    }
    if (tokens[0] === ".") {
      tokens.shift();
      const prop = tokens.shift();
      return factory.createPropertyAccessExpression(parseLiteral(token), prop!);
    }
    return parseLiteral(token);
  }

  function getPrecedence(op: string): number {
    switch (op) {
      case "||":
        return 1;
      case "&&":
        return 2;
      case "==":
      case "!=":
        return 3;
      case "<":
      case "<=":
      case ">":
      case ">=":
        return 4;
      default:
        return 0;
    }
  }

  return parseExpression(tokens);
}
