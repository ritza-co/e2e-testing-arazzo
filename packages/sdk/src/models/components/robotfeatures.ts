/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import {
  Feature,
  Feature$inboundSchema,
  Feature$Outbound,
  Feature$outboundSchema,
} from "./feature.js";

export type RobotFeatures = {
  /**
   * Unique identifier of the robot.
   */
  robotId: string;
  features: Array<Feature>;
};

/** @internal */
export const RobotFeatures$inboundSchema: z.ZodType<
  RobotFeatures,
  z.ZodTypeDef,
  unknown
> = z.object({
  robotId: z.string(),
  features: z.array(Feature$inboundSchema),
});

/** @internal */
export type RobotFeatures$Outbound = {
  robotId: string;
  features: Array<Feature$Outbound>;
};

/** @internal */
export const RobotFeatures$outboundSchema: z.ZodType<
  RobotFeatures$Outbound,
  z.ZodTypeDef,
  RobotFeatures
> = z.object({
  robotId: z.string(),
  features: z.array(Feature$outboundSchema),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace RobotFeatures$ {
  /** @deprecated use `RobotFeatures$inboundSchema` instead. */
  export const inboundSchema = RobotFeatures$inboundSchema;
  /** @deprecated use `RobotFeatures$outboundSchema` instead. */
  export const outboundSchema = RobotFeatures$outboundSchema;
  /** @deprecated use `RobotFeatures$Outbound` instead. */
  export type Outbound = RobotFeatures$Outbound;
}
