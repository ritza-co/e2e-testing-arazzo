/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import * as components from "../components/index.js";

export type ConfigureRobotFeaturesRequest = {
  /**
   * Unique identifier of the robot. This ID is generated upon robot creation and is required for subsequent operations on the robot.
   *
   * @remarks
   */
  robotId: string;
  features: components.Features;
};

/** @internal */
export const ConfigureRobotFeaturesRequest$inboundSchema: z.ZodType<
  ConfigureRobotFeaturesRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  robotId: z.string(),
  Features: components.Features$inboundSchema,
}).transform((v) => {
  return remap$(v, {
    "Features": "features",
  });
});

/** @internal */
export type ConfigureRobotFeaturesRequest$Outbound = {
  robotId: string;
  Features: components.Features$Outbound;
};

/** @internal */
export const ConfigureRobotFeaturesRequest$outboundSchema: z.ZodType<
  ConfigureRobotFeaturesRequest$Outbound,
  z.ZodTypeDef,
  ConfigureRobotFeaturesRequest
> = z.object({
  robotId: z.string(),
  features: components.Features$outboundSchema,
}).transform((v) => {
  return remap$(v, {
    features: "Features",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ConfigureRobotFeaturesRequest$ {
  /** @deprecated use `ConfigureRobotFeaturesRequest$inboundSchema` instead. */
  export const inboundSchema = ConfigureRobotFeaturesRequest$inboundSchema;
  /** @deprecated use `ConfigureRobotFeaturesRequest$outboundSchema` instead. */
  export const outboundSchema = ConfigureRobotFeaturesRequest$outboundSchema;
  /** @deprecated use `ConfigureRobotFeaturesRequest$Outbound` instead. */
  export type Outbound = ConfigureRobotFeaturesRequest$Outbound;
}
