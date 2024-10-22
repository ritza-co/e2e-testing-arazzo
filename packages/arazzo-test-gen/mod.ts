import { generateTests } from "./generator.ts";

// Main execution
if (import.meta.main) {
  const args = Deno.args;
  if (args.length !== 2) {
    console.error(
      "Usage: deno run -A mod.ts <inputPath> <outputPath>",
    );
    Deno.exit(1);
  }
  const inputPath = args[0];
  const outputPath = args[1];

  await generateTests(inputPath, outputPath);
}

export { generateTests };
