# ListRobotsRequest

## Example Usage

```typescript
import { ListRobotsRequest } from "build-a-bot/models/operations";

let value: ListRobotsRequest = {
  page: 1,
  pageSize: 20,
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             | Example                                 |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `page`                                  | *number*                                | :heavy_minus_sign:                      | Page number of the results to retrieve. | 1                                       |
| `pageSize`                              | *number*                                | :heavy_minus_sign:                      | Number of items per page.               | 20                                      |