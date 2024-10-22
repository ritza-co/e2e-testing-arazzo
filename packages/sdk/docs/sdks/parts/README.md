# Parts
(*parts*)

## Overview

Operations for adding parts to robots

### Available Operations

* [getRobotParts](#getrobotparts) - Get robot's parts
* [addRobotParts](#addrobotparts) - Add parts to the robot

## getRobotParts

Retrieves the list of parts associated with the specified robot.


### Example Usage

```typescript
import { BuildaBot } from "build-a-bot";

const buildaBot = new BuildaBot({
  apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await buildaBot.parts.getRobotParts({
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
import { partsGetRobotParts } from "build-a-bot/funcs/partsGetRobotParts.js";

// Use `BuildaBotCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const buildaBot = new BuildaBotCore({
  apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await partsGetRobotParts(buildaBot, {
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
| `request`                                                                                                                                                                      | [operations.GetRobotPartsRequest](../../models/operations/getrobotpartsrequest.md)                                                                                             | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[components.RobotParts](../../models/components/robotparts.md)\>**

### Errors

| Error Type       | Status Code      | Content Type     |
| ---------------- | ---------------- | ---------------- |
| errors.ErrorT    | 401, 404         | application/json |
| errors.SDKError  | 4XX, 5XX         | \*/\*            |

## addRobotParts

Adds parts to the specified robot design. This operation creates new parts or updates existing ones associated with the robot.


### Example Usage

```typescript
import { BuildaBot } from "build-a-bot";

const buildaBot = new BuildaBot({
  apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await buildaBot.parts.addRobotParts({
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    addParts: {
      parts: [
        {
          type: "arm",
          name: "Hydraulic Arm",
          quantity: 2,
        },
        {
          type: "sensor",
          name: "Infrared Sensor",
          quantity: 1,
        },
      ],
    },
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
import { partsAddRobotParts } from "build-a-bot/funcs/partsAddRobotParts.js";

// Use `BuildaBotCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const buildaBot = new BuildaBotCore({
  apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await partsAddRobotParts(buildaBot, {
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    addParts: {
      parts: [
        {
          type: "arm",
          name: "Hydraulic Arm",
          quantity: 2,
        },
        {
          type: "sensor",
          name: "Infrared Sensor",
          quantity: 1,
        },
      ],
    },
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
| `request`                                                                                                                                                                      | [operations.AddRobotPartsRequest](../../models/operations/addrobotpartsrequest.md)                                                                                             | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[components.RobotParts](../../models/components/robotparts.md)\>**

### Errors

| Error Type       | Status Code      | Content Type     |
| ---------------- | ---------------- | ---------------- |
| errors.ErrorT    | 400, 401, 404    | application/json |
| errors.SDKError  | 4XX, 5XX         | \*/\*            |