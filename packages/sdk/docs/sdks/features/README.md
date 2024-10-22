# Features
(*features*)

## Overview

Operations for configuring robot features

### Available Operations

* [getRobotFeatures](#getrobotfeatures) - Get robot's features
* [configureRobotFeatures](#configurerobotfeatures) - Configure features of the robot

## getRobotFeatures

Retrieves the list of features configured for the specified robot.


### Example Usage

```typescript
import { BuildaBot } from "build-a-bot";

const buildaBot = new BuildaBot({
  apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await buildaBot.features.getRobotFeatures({
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
import { featuresGetRobotFeatures } from "build-a-bot/funcs/featuresGetRobotFeatures.js";

// Use `BuildaBotCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const buildaBot = new BuildaBotCore({
  apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await featuresGetRobotFeatures(buildaBot, {
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
| `request`                                                                                                                                                                      | [operations.GetRobotFeaturesRequest](../../models/operations/getrobotfeaturesrequest.md)                                                                                       | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[components.RobotFeatures](../../models/components/robotfeatures.md)\>**

### Errors

| Error Type       | Status Code      | Content Type     |
| ---------------- | ---------------- | ---------------- |
| errors.ErrorT    | 401, 404         | application/json |
| errors.SDKError  | 4XX, 5XX         | \*/\*            |

## configureRobotFeatures

Sets up robot functionalities by adding or updating features for the specified robot.


### Example Usage

```typescript
import { BuildaBot } from "build-a-bot";

const buildaBot = new BuildaBot({
  apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await buildaBot.features.configureRobotFeatures({
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    features: {
      features: [
        {
          name: "Voice Recognition",
          description: "Enables voice command recognition.",
        },
        {
          name: "Obstacle Avoidance",
          description: "Navigates around obstacles.",
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
import { featuresConfigureRobotFeatures } from "build-a-bot/funcs/featuresConfigureRobotFeatures.js";

// Use `BuildaBotCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const buildaBot = new BuildaBotCore({
  apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await featuresConfigureRobotFeatures(buildaBot, {
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    features: {
      features: [
        {
          name: "Voice Recognition",
          description: "Enables voice command recognition.",
        },
        {
          name: "Obstacle Avoidance",
          description: "Navigates around obstacles.",
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
| `request`                                                                                                                                                                      | [operations.ConfigureRobotFeaturesRequest](../../models/operations/configurerobotfeaturesrequest.md)                                                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[components.RobotFeatures](../../models/components/robotfeatures.md)\>**

### Errors

| Error Type       | Status Code      | Content Type     |
| ---------------- | ---------------- | ---------------- |
| errors.ErrorT    | 400, 401, 404    | application/json |
| errors.SDKError  | 4XX, 5XX         | \*/\*            |