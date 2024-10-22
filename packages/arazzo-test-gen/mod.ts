import { generateTests } from "./generator.ts";

/**
 * This is the main entry point for the Arazzo test generator.
 * It allows the script to be run directly with Deno, accepting input and output file paths as arguments.
 * It also exports the generateTests function for use as a module.
 *
 * Usage:
 * deno run -A mod.ts <inputPath> <outputPath>
 *
 * Where:
 * <inputPath> is the path to the input Arazzo YAML file
 * <outputPath> is the path where the generated test file will be written
 */

// Main execution block
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

// Export the generateTests function for use as a module
export { generateTests };
