/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { assemblyAssembleRobot } from "../funcs/assemblyAssembleRobot.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as components from "../models/components/index.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Assembly extends ClientSDK {
  /**
   * Assemble the robot
   *
   * @remarks
   * Validates and assembles the robot. Once assembled, the robot's status changes to "assembled".
   */
  async assembleRobot(
    request: operations.AssembleRobotRequest,
    options?: RequestOptions,
  ): Promise<components.Robot> {
    return unwrapAsync(assemblyAssembleRobot(
      this,
      request,
      options,
    ));
  }
}
