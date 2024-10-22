# AddRobotPartsRequest

## Example Usage

```typescript
import { AddRobotPartsRequest } from "build-a-bot/models/operations";

let value: AddRobotPartsRequest = {
  robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  addParts: {
    parts: [
      {
        type: "arm",
        name: "Hydraulic Arm",
        quantity: 2,
      },
    ],
  },
};
```

## Fields

| Field                                                                                                                             | Type                                                                                                                              | Required                                                                                                                          | Description                                                                                                                       | Example                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `robotId`                                                                                                                         | *string*                                                                                                                          | :heavy_check_mark:                                                                                                                | Unique identifier of the robot. This ID is generated upon robot creation and is required for subsequent operations on the robot.<br/> | f47ac10b-58cc-4372-a567-0e02b2c3d479                                                                                              |
| `addParts`                                                                                                                        | [components.AddParts](../../models/components/addparts.md)                                                                        | :heavy_check_mark:                                                                                                                | N/A                                                                                                                               |                                                                                                                                   |