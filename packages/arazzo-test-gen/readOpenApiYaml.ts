import { parse } from "jsr:@std/yaml";
import type { OpenAPIV3_1 } from "npm:openapi-types";

/**
 * Reads and parses an OpenAPI YAML file, and extracts the server URL.
 *
 * This function asynchronously reads the contents of a YAML file specified by the filePath,
 * parses it into an OpenAPIV3_1.Document object, and extracts the first server URL if available.
 * It uses the YAML parser from the @std/yaml module to convert the YAML content into a JavaScript object.
 *
 * @param filePath - The path to the OpenAPI YAML file to be read and parsed.
 * @returns A Promise that resolves to an object containing:
 *   - document: The parsed OpenAPIV3_1.Document object
 *   - serverUrl: The first server URL found in the document, or an empty string if none is found
 * @throws Will throw an error if the file cannot be read or if the YAML content is invalid.
 */
export async function readOpenApiYaml(
  filePath: string,
): Promise<{ document: OpenAPIV3_1.Document; serverUrl: string }> {
  // Read the content of the file asynchronously
  const content = await Deno.readTextFile(filePath);

  // Parse the YAML content and cast it to OpenAPIV3_1.Document type
  const document = parse(content) as OpenAPIV3_1.Document;

  // Extract the first server URL from the document, if available
  let serverUrl = "";
  if (document.servers && document.servers.length > 0) {
    serverUrl = document.servers[0].url;
  }

  return { document, serverUrl };
}
