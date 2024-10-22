/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import {
  FeatureInput,
  FeatureInput$inboundSchema,
  FeatureInput$Outbound,
  FeatureInput$outboundSchema,
} from "./featureinput.js";

export type Features = {
  features: Array<FeatureInput>;
};

/** @internal */
export const Features$inboundSchema: z.ZodType<
  Features,
  z.ZodTypeDef,
  unknown
> = z.object({
  features: z.array(FeatureInput$inboundSchema),
});

/** @internal */
export type Features$Outbound = {
  features: Array<FeatureInput$Outbound>;
};

/** @internal */
export const Features$outboundSchema: z.ZodType<
  Features$Outbound,
  z.ZodTypeDef,
  Features
> = z.object({
  features: z.array(FeatureInput$outboundSchema),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Features$ {
  /** @deprecated use `Features$inboundSchema` instead. */
  export const inboundSchema = Features$inboundSchema;
  /** @deprecated use `Features$outboundSchema` instead. */
  export const outboundSchema = Features$outboundSchema;
  /** @deprecated use `Features$Outbound` instead. */
  export type Outbound = Features$Outbound;
}