# NewRobot

## Example Usage

```typescript
import { NewRobot } from "build-a-bot/models/components";

let value: NewRobot = {
  name: "<value>",
  model: "humanoid",
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `name`                                                               | *string*                                                             | :heavy_check_mark:                                                   | The name of the robot.                                               |
| `model`                                                              | [components.NewRobotModel](../../models/components/newrobotmodel.md) | :heavy_check_mark:                                                   | The base model type of the robot.                                    |