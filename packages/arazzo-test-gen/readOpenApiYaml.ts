import { parse } from "jsr:@std/yaml";
import type { OpenAPIV3_1 } from "npm:openapi-types";

export async function readOpenApiYaml(
  filePath: string,
): Promise<{ document: OpenAPIV3_1.Document; serverUrl: string }> {
  const content = await Deno.readTextFile(filePath);
  const document = parse(content) as OpenAPIV3_1.Document;

  let serverUrl = "";
  if (document.servers && document.servers.length > 0) {
    serverUrl = document.servers[0].url;
  }

  return { document, serverUrl };
}
