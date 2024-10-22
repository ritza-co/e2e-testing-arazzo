# Activation
(*activation*)

## Overview

Operations for activating robots

### Available Operations

* [activateRobot](#activaterobot) - Activate the robot

## activateRobot

Activates the robot after it has been assembled. Once activated, the robot will begin functioning with all configured features and capabilities. This operation changes the robot's status to "active" and records the activation time.


### Example Usage

```typescript
import { BuildaBot } from "build-a-bot";

const buildaBot = new BuildaBot({
  apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await buildaBot.activation.activateRobot({
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  });

  // Handle the result
  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { BuildaBotCore } from "build-a-bot/core.js";
import { activationActivateRobot } from "build-a-bot/funcs/activationActivateRobot.js";

// Use `BuildaBotCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const buildaBot = new BuildaBotCore({
  apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await activationActivateRobot(buildaBot, {
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  });

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  // Handle the result
  console.log(result);
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.ActivateRobotRequest](../../models/operations/activaterobotrequest.md)                                                                                             | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[components.RobotActivation](../../models/components/robotactivation.md)\>**

### Errors

| Error Type         | Status Code        | Content Type       |
| ------------------ | ------------------ | ------------------ |
| errors.ErrorT      | 400, 401, 404, 409 | application/json   |
| errors.SDKError    | 4XX, 5XX           | \*/\*              |