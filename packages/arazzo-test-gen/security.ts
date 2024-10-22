import type { OpenAPIV3_1 } from "npm:openapi-types";

/**
 * Extracts the API key security scheme from an OpenAPI document.
 *
 * This function searches through the security schemes defined in the OpenAPI document
 * and returns the first API key scheme that uses a header for authentication.
 *
 * @param openApiDoc - The OpenAPI document to search for security schemes.
 * @returns An object containing the name of the API key header if found, or undefined if not found.
 */
export function getSecurityScheme(
  openApiDoc: OpenAPIV3_1.Document,
): { name: string } | undefined {
  const securitySchemes = openApiDoc.components?.securitySchemes;
  if (!securitySchemes) return undefined;

  for (const [_schemeName, scheme] of Object.entries(securitySchemes)) {
    // Check if the scheme is an API key in the header
    if (
      typeof scheme === "object" &&
      !("$ref" in scheme) &&
      scheme.type === "apiKey" &&
      scheme.in === "header"
    ) {
      return {
        name: scheme.name,
      };
    }
  }

  // Return undefined if no suitable API key scheme is found
  return undefined;
}
