/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

export type AssembleRobotRequest = {
  /**
   * Unique identifier of the robot. This ID is generated upon robot creation and is required for subsequent operations on the robot.
   *
   * @remarks
   */
  robotId: string;
};

/** @internal */
export const AssembleRobotRequest$inboundSchema: z.ZodType<
  AssembleRobotRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  robotId: z.string(),
});

/** @internal */
export type AssembleRobotRequest$Outbound = {
  robotId: string;
};

/** @internal */
export const AssembleRobotRequest$outboundSchema: z.ZodType<
  AssembleRobotRequest$Outbound,
  z.ZodTypeDef,
  AssembleRobotRequest
> = z.object({
  robotId: z.string(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace AssembleRobotRequest$ {
  /** @deprecated use `AssembleRobotRequest$inboundSchema` instead. */
  export const inboundSchema = AssembleRobotRequest$inboundSchema;
  /** @deprecated use `AssembleRobotRequest$outboundSchema` instead. */
  export const outboundSchema = AssembleRobotRequest$outboundSchema;
  /** @deprecated use `AssembleRobotRequest$Outbound` instead. */
  export type Outbound = AssembleRobotRequest$Outbound;
}
