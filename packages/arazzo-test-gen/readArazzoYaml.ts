import { parse } from "jsr:@std/yaml";
import type { ArazzoDocument } from "./types.ts";

/**
 * Reads and parses an Arazzo YAML file.
 *
 * This function asynchronously reads the contents of a YAML file specified by the filePath,
 * and then parses it into an ArazzoDocument object. It uses the YAML parser from the
 * @std/yaml module to convert the YAML content into a JavaScript object.
 *
 * @param filePath - The path to the Arazzo YAML file to be read and parsed.
 * @returns A Promise that resolves to an ArazzoDocument object representing the parsed YAML content.
 * @throws Will throw an error if the file cannot be read or if the YAML content is invalid.
 */
export async function readArazzoYaml(
  filePath: string,
): Promise<ArazzoDocument> {
  // Read the content of the file asynchronously
  const content = await Deno.readTextFile(filePath);

  // Parse the YAML content and cast it to ArazzoDocument type
  return parse(content) as ArazzoDocument;
}
