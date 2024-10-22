# ErrorT

Unauthorized access

## Example Usage

```typescript
import { ErrorT } from "build-a-bot/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               | Example                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `status`                                                                  | *number*                                                                  | :heavy_check_mark:                                                        | HTTP status code.                                                         | 400                                                                       |
| `error`                                                                   | *string*                                                                  | :heavy_check_mark:                                                        | Short error message.                                                      | Bad Request                                                               |
| `message`                                                                 | *string*                                                                  | :heavy_check_mark:                                                        | Detailed error message.                                                   | The request payload is invalid.                                           |
| `details`                                                                 | Record<string, *any*>                                                     | :heavy_minus_sign:                                                        | Additional error details.                                                 | {<br/>"field": "model",<br/>"issue": "Must be one of: android, humanoid, rover"<br/>} |