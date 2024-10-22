import type { OpenAPIV3_1 } from "npm:openapi-types";

/**
 * Represents an OpenAPI operation with additional metadata.
 */
export interface OperationObjectWithMetadata {
  operation: OpenAPIV3_1.OperationObject;
  path: string;
  method: string;
}

/**
 * Represents the structure of an Arazzo document.
 */
export interface ArazzoDocument {
  arazzo: string;
  info: ArazzoInfo;
  sourceDescriptions: Array<ArazzoSourceDescription>;
  workflows: Array<ArazzoWorkflow>;
  components: Record<string, unknown>;
}

/**
 * Contains information about the Arazzo document.
 */
export interface ArazzoInfo {
  title: string;
  version: string;
  description: string;
}

/**
 * Describes a source used in the Arazzo document.
 */
export interface ArazzoSourceDescription {
  name: string;
  url: string;
  type: string;
}

/**
 * Represents a workflow in the Arazzo document.
 */
export interface ArazzoWorkflow {
  workflowId: string;
  description: string;
  inputs: {
    type: string;
    properties: Record<string, { type: string; description: string }>;
  };
  steps: Array<ArazzoStep>;
}

/**
 * Represents a parameter in an Arazzo step.
 */
export interface ArazzoParameter {
  name: string;
  in: string;
  value: string;
}

/**
 * Represents the request body in an Arazzo step.
 */
export interface ArazzoRequestBody {
  payload: Record<string, unknown>;
}

/**
 * Represents a success criterion for an Arazzo step.
 */
export interface ArazzoSuccessCriterion {
  condition: string;
  context?: string;
  type?: "regex" | "jsonpath" | "simple";
}

/**
 * Represents a step in an Arazzo workflow.
 */
export interface ArazzoStep {
  stepId: string;
  description: string;
  operationId: string;
  parameters?: Array<ArazzoParameter>;
  requestBody?: ArazzoRequestBody;
  successCriteria: Array<ArazzoSuccessCriterion>;
  outputs?: Record<string, string>;
}
