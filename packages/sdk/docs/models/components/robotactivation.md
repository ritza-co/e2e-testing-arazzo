# RobotActivation

## Example Usage

```typescript
import { RobotActivation } from "build-a-bot/models/components";

let value: RobotActivation = {
  robotId: "11a368db-4204-447a-9b46-2c0bcc459453",
  status: "active",
  activationTime: new Date("2023-10-15T12:00:00Z"),
  capabilities: [
    "Voice Recognition",
    "Obstacle Avoidance",
  ],
  links: [
    {
      rel: "self",
      href: "/v1/robots/f47ac10b-58cc-4372-a567-0e02b2c3d479/parts",
    },
  ],
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   | Example                                                                                       |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `robotId`                                                                                     | *string*                                                                                      | :heavy_check_mark:                                                                            | Unique identifier of the robot.                                                               |                                                                                               |
| `status`                                                                                      | [components.RobotActivationStatus](../../models/components/robotactivationstatus.md)          | :heavy_check_mark:                                                                            | Current status of the robot.                                                                  | active                                                                                        |
| `activationTime`                                                                              | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | The time when the robot was activated.                                                        | 2023-10-15T12:00:00Z                                                                          |
| `capabilities`                                                                                | *string*[]                                                                                    | :heavy_check_mark:                                                                            | List of robot capabilities.                                                                   | [<br/>"Voice Recognition",<br/>"Obstacle Avoidance"<br/>]                                     |
| `links`                                                                                       | [components.Link](../../models/components/link.md)[]                                          | :heavy_minus_sign:                                                                            | Hypermedia links to related resources.                                                        |                                                                                               |