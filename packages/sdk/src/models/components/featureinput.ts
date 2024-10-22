/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

export type FeatureInput = {
  /**
   * Name of the feature.
   */
  name: string;
  /**
   * Description of the feature.
   */
  description: string;
};

/** @internal */
export const FeatureInput$inboundSchema: z.ZodType<
  FeatureInput,
  z.ZodTypeDef,
  unknown
> = z.object({
  name: z.string(),
  description: z.string(),
});

/** @internal */
export type FeatureInput$Outbound = {
  name: string;
  description: string;
};

/** @internal */
export const FeatureInput$outboundSchema: z.ZodType<
  FeatureInput$Outbound,
  z.ZodTypeDef,
  FeatureInput
> = z.object({
  name: z.string(),
  description: z.string(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace FeatureInput$ {
  /** @deprecated use `FeatureInput$inboundSchema` instead. */
  export const inboundSchema = FeatureInput$inboundSchema;
  /** @deprecated use `FeatureInput$outboundSchema` instead. */
  export const outboundSchema = FeatureInput$outboundSchema;
  /** @deprecated use `FeatureInput$Outbound` instead. */
  export type Outbound = FeatureInput$Outbound;
}
