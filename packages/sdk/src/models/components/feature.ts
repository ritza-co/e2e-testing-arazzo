/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

export type Feature = {
  /**
   * Unique identifier of the feature.
   */
  featureId: string;
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
export const Feature$inboundSchema: z.ZodType<Feature, z.ZodTypeDef, unknown> =
  z.object({
    featureId: z.string(),
    name: z.string(),
    description: z.string(),
  });

/** @internal */
export type Feature$Outbound = {
  featureId: string;
  name: string;
  description: string;
};

/** @internal */
export const Feature$outboundSchema: z.ZodType<
  Feature$Outbound,
  z.ZodTypeDef,
  Feature
> = z.object({
  featureId: z.string(),
  name: z.string(),
  description: z.string(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Feature$ {
  /** @deprecated use `Feature$inboundSchema` instead. */
  export const inboundSchema = Feature$inboundSchema;
  /** @deprecated use `Feature$outboundSchema` instead. */
  export const outboundSchema = Feature$outboundSchema;
  /** @deprecated use `Feature$Outbound` instead. */
  export type Outbound = Feature$Outbound;
}
