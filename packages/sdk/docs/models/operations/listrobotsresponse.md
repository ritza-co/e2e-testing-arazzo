# ListRobotsResponse

## Example Usage

```typescript
import { ListRobotsResponse } from "build-a-bot/models/operations";

let value: ListRobotsResponse = {
  result: {
    totalItems: 100,
    page: 1,
    pageSize: 20,
    robots: [
      {
        robotId: "c790999f-a56b-40aa-8325-597f132a4732",
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
  },
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `result`                                                     | [components.RobotList](../../models/components/robotlist.md) | :heavy_check_mark:                                           | N/A                                                          |