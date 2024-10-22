# End-to-End API Testing with Arazzo and Deno

This project demonstrates how to use the [Arazzo](https://spec.openapis.org/arazzo/latest.html) specification to generate end-to-end API tests with Deno.

## Project Structure

The project consists of three main packages:

- **arazzo-test-gen**: Test generation engine that converts `arazzo.yaml` configurations into executable test cases
- **sdk**: Generated API client SDK for interacting with the robot-building API
- **server**: Test server implementation for running the tests

## Prerequisites

- [Deno](https://deno.land/) runtime
- Node.js (for npm dependencies)

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
deno install
```

## Available Commands

```bash
# Run the test generator in watch mode
deno task dev

# Start the test server
deno task server

# Run the test suite
deno task test
```

## Generate Runtime Expression Parser

The runtime expression parser is used to evaluate expressions in the test cases. We need to convert ANBF expressions into a parser that can be used in Deno. The Peggy parser generator uses Node modules that are not compatible with Deno. To work around this, we generate the parser using Node.js.

To generate the parser, run the following commands:

```bash
cd packages/arazzo-test-gen
npm install
npm run gen
```
