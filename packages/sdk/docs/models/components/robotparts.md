# RobotParts

## Example Usage

```typescript
import { RobotParts } from "build-a-bot/models/components";

let value: RobotParts = {
  robotId: "04a49624-999a-4a6e-b56e-cb1ebf2d291d",
  parts: [
    {
      partId: "961b7bdf-d05b-4280-a30c-35eb02993e98",
      type: "arm",
      name: "Hydraulic Arm",
      quantity: 2,
    },
  ],
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `robotId`                                            | *string*                                             | :heavy_check_mark:                                   | Unique identifier of the robot.                      |
| `parts`                                              | [components.Part](../../models/components/part.md)[] | :heavy_check_mark:                                   | N/A                                                  |