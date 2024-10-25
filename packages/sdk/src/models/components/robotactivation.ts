/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { ClosedEnum } from "../../types/enums.js";
import {
  Link,
  Link$inboundSchema,
  Link$Outbound,
  Link$outboundSchema,
} from "./link.js";

/**
 * Current status of the robot.
 */
export const RobotActivationStatus = {
  Active: "active",
} as const;
/**
 * Current status of the robot.
 */
export type RobotActivationStatus = ClosedEnum<typeof RobotActivationStatus>;

export type RobotActivation = {
  /**
   * Unique identifier of the robot.
   */
  robotId: string;
  /**
   * Current status of the robot.
   */
  status: RobotActivationStatus;
  /**
   * The time when the robot was activated.
   */
  activationTime: Date;
  /**
   * List of robot capabilities.
   */
  capabilities: Array<string>;
  /**
   * Hypermedia links to related resources.
   */
  links?: Array<Link> | undefined;
};

/** @internal */
export const RobotActivationStatus$inboundSchema: z.ZodNativeEnum<
  typeof RobotActivationStatus
> = z.nativeEnum(RobotActivationStatus);

/** @internal */
export const RobotActivationStatus$outboundSchema: z.ZodNativeEnum<
  typeof RobotActivationStatus
> = RobotActivationStatus$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace RobotActivationStatus$ {
  /** @deprecated use `RobotActivationStatus$inboundSchema` instead. */
  export const inboundSchema = RobotActivationStatus$inboundSchema;
  /** @deprecated use `RobotActivationStatus$outboundSchema` instead. */
  export const outboundSchema = RobotActivationStatus$outboundSchema;
}

/** @internal */
export const RobotActivation$inboundSchema: z.ZodType<
  RobotActivation,
  z.ZodTypeDef,
  unknown
> = z.object({
  robotId: z.string(),
  status: RobotActivationStatus$inboundSchema,
  activationTime: z.string().datetime({ offset: true }).transform(v =>
    new Date(v)
  ),
  capabilities: z.array(z.string()),
  links: z.array(Link$inboundSchema).optional(),
});

/** @internal */
export type RobotActivation$Outbound = {
  robotId: string;
  status: string;
  activationTime: string;
  capabilities: Array<string>;
  links?: Array<Link$Outbound> | undefined;
};

/** @internal */
export const RobotActivation$outboundSchema: z.ZodType<
  RobotActivation$Outbound,
  z.ZodTypeDef,
  RobotActivation
> = z.object({
  robotId: z.string(),
  status: RobotActivationStatus$outboundSchema,
  activationTime: z.date().transform(v => v.toISOString()),
  capabilities: z.array(z.string()),
  links: z.array(Link$outboundSchema).optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace RobotActivation$ {
  /** @deprecated use `RobotActivation$inboundSchema` instead. */
  export const inboundSchema = RobotActivation$inboundSchema;
  /** @deprecated use `RobotActivation$outboundSchema` instead. */
  export const outboundSchema = RobotActivation$outboundSchema;
  /** @deprecated use `RobotActivation$Outbound` instead. */
  export type Outbound = RobotActivation$Outbound;
}
