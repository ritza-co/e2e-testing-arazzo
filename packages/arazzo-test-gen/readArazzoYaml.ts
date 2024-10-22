import { parse } from "jsr:@std/yaml";
import type { ArazzoDocument } from "./types.ts";

export async function readArazzoYaml(
  filePath: string,
): Promise<ArazzoDocument> {
  const content = await Deno.readTextFile(filePath);
  return parse(content) as ArazzoDocument;
}
