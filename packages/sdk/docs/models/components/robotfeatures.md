# RobotFeatures

## Example Usage

```typescript
import { RobotFeatures } from "build-a-bot/models/components";

let value: RobotFeatures = {
  robotId: "dad4c2fa-3fb4-4380-9365-749d182b6922",
  features: [
    {
      featureId: "5fcbe189-f431-40ea-9c49-17fe5f3ffcad",
      name: "Voice Recognition",
      description: "Enables voice command recognition.",
    },
  ],
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `robotId`                                                  | *string*                                                   | :heavy_check_mark:                                         | Unique identifier of the robot.                            |
| `features`                                                 | [components.Feature](../../models/components/feature.md)[] | :heavy_check_mark:                                         | N/A                                                        |