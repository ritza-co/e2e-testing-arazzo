# Robot

## Example Usage

```typescript
import { Robot } from "build-a-bot/models/components";

let value: Robot = {
  robotId: "b4290d0a-4bf3-4999-a3f7-db4d6e9ebb8f",
  name: "T-800",
  model: "android",
  status: "designing",
  links: [
    {
      rel: "self",
      href: "/v1/robots/f47ac10b-58cc-4372-a567-0e02b2c3d479/parts",
    },
  ],
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            | Example                                                |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `robotId`                                              | *string*                                               | :heavy_check_mark:                                     | Unique identifier of the robot.                        |                                                        |
| `name`                                                 | *string*                                               | :heavy_check_mark:                                     | The name of the robot.                                 | T-800                                                  |
| `model`                                                | [components.Model](../../models/components/model.md)   | :heavy_check_mark:                                     | The base model type of the robot.                      | android                                                |
| `status`                                               | [components.Status](../../models/components/status.md) | :heavy_check_mark:                                     | Current status of the robot.                           | designing                                              |
| `links`                                                | [components.Link](../../models/components/link.md)[]   | :heavy_check_mark:                                     | Hypermedia links to related resources.                 |                                                        |