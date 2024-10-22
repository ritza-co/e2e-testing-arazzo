# RobotList

## Example Usage

```typescript
import { RobotList } from "build-a-bot/models/components";

let value: RobotList = {
  totalItems: 100,
  page: 1,
  pageSize: 20,
  robots: [
    {
      robotId: "a235d1d1-f7f9-4b04-8141-561b94819e5a",
      name: "T-800",
      model: "android",
      status: "designing",
      links: [
        {
          rel: "self",
          href: "/v1/robots/f47ac10b-58cc-4372-a567-0e02b2c3d479/parts",
        },
      ],
    },
  ],
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            | Example                                                |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `totalItems`                                           | *number*                                               | :heavy_check_mark:                                     | Total number of robots.                                | 100                                                    |
| `page`                                                 | *number*                                               | :heavy_check_mark:                                     | Current page number.                                   | 1                                                      |
| `pageSize`                                             | *number*                                               | :heavy_check_mark:                                     | Number of robots per page.                             | 20                                                     |
| `robots`                                               | [components.Robot](../../models/components/robot.md)[] | :heavy_check_mark:                                     | N/A                                                    |                                                        |