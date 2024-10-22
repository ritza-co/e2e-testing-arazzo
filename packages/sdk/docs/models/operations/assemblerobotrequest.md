# AssembleRobotRequest

## Example Usage

```typescript
import { AssembleRobotRequest } from "build-a-bot/models/operations";

let value: AssembleRobotRequest = {
  robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
};
```

## Fields

| Field                                                                                                                             | Type                                                                                                                              | Required                                                                                                                          | Description                                                                                                                       | Example                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `robotId`                                                                                                                         | *string*                                                                                                                          | :heavy_check_mark:                                                                                                                | Unique identifier of the robot. This ID is generated upon robot creation and is required for subsequent operations on the robot.<br/> | f47ac10b-58cc-4372-a567-0e02b2c3d479                                                                                              |