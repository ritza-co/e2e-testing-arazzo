import type { OpenAPIV3_1 } from "npm:openapi-types";

export function getSecurityScheme(
  openApiDoc: OpenAPIV3_1.Document
): { name: string; prefix: string } | undefined {
  const securitySchemes = openApiDoc.components?.securitySchemes;
  if (!securitySchemes) return undefined;

  for (const [schemeName, scheme] of Object.entries(securitySchemes)) {
    if (
      typeof scheme === "object" &&
      !("$ref" in scheme) &&
      scheme.type === "apiKey" &&
      scheme.in === "header"
    ) {
      return {
        name: scheme.name,
        prefix: schemeName.toLowerCase().includes("bearer") ? "Bearer " : "",
      };
    }
  }

  return undefined;
}
