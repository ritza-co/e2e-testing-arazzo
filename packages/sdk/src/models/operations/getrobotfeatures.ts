/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

export type GetRobotFeaturesRequest = {
  /**
   * Unique identifier of the robot. This ID is generated upon robot creation and is required for subsequent operations on the robot.
   *
   * @remarks
   */
  robotId: string;
};

/** @internal */
export const GetRobotFeaturesRequest$inboundSchema: z.ZodType<
  GetRobotFeaturesRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  robotId: z.string(),
});

/** @internal */
export type GetRobotFeaturesRequest$Outbound = {
  robotId: string;
};

/** @internal */
export const GetRobotFeaturesRequest$outboundSchema: z.ZodType<
  GetRobotFeaturesRequest$Outbound,
  z.ZodTypeDef,
  GetRobotFeaturesRequest
> = z.object({
  robotId: z.string(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace GetRobotFeaturesRequest$ {
  /** @deprecated use `GetRobotFeaturesRequest$inboundSchema` instead. */
  export const inboundSchema = GetRobotFeaturesRequest$inboundSchema;
  /** @deprecated use `GetRobotFeaturesRequest$outboundSchema` instead. */
  export const outboundSchema = GetRobotFeaturesRequest$outboundSchema;
  /** @deprecated use `GetRobotFeaturesRequest$Outbound` instead. */
  export type Outbound = GetRobotFeaturesRequest$Outbound;
}
