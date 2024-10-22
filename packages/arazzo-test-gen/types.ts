export interface ArazzoDocument {
  arazzo: string;
  info: ArazzoInfo;
  sourceDescriptions: Array<ArazzoSourceDescription>;
  workflows: Array<ArazzoWorkflow>;
  components: Record<string, unknown>;
}

export interface ArazzoInfo {
  title: string;
  version: string;
  description: string;
}

export interface ArazzoSourceDescription {
  name: string;
  url: string;
  type: string;
}

export interface ArazzoWorkflow {
  workflowId: string;
  description: string;
  inputs: {
    type: string;
    properties: Record<string, { type: string; description: string }>;
  };
  steps: Array<ArazzoStep>;
}

export interface ArazzoStep {
  stepId: string;
  description: string;
  operationId: string;
  parameters?: Array<{ name: string; in: string; value: string }>;
  requestBody?: { payload: Record<string, unknown> };
  successCriteria: Array<{
    condition: string;
    context?: string;
    type?: string;
  }>;
  outputs?: Record<string, string>;
}
