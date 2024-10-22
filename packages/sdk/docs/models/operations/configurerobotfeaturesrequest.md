# ConfigureRobotFeaturesRequest

## Example Usage

```typescript
import { ConfigureRobotFeaturesRequest } from "build-a-bot/models/operations";

let value: ConfigureRobotFeaturesRequest = {
  robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  features: {
    features: [
      {
        name: "Voice Recognition",
        description: "Enables voice command recognition.",
      },
    ],
  },
};
```

## Fields

| Field                                                                                                                             | Type                                                                                                                              | Required                                                                                                                          | Description                                                                                                                       | Example                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `robotId`                                                                                                                         | *string*                                                                                                                          | :heavy_check_mark:                                                                                                                | Unique identifier of the robot. This ID is generated upon robot creation and is required for subsequent operations on the robot.<br/> | f47ac10b-58cc-4372-a567-0e02b2c3d479                                                                                              |
| `features`                                                                                                                        | [components.Features](../../models/components/features.md)                                                                        | :heavy_check_mark:                                                                                                                | N/A                                                                                                                               |                                                                                                                                   |