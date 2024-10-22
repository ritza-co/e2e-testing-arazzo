# Link

## Example Usage

```typescript
import { Link } from "build-a-bot/models/components";

let value: Link = {
  rel: "self",
  href: "/v1/robots/f47ac10b-58cc-4372-a567-0e02b2c3d479/parts",
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           | Example                                               |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `rel`                                                 | *string*                                              | :heavy_check_mark:                                    | The relationship of the linked resource.              | self                                                  |
| `href`                                                | *string*                                              | :heavy_check_mark:                                    | The hyperlink reference.                              | /v1/robots/f47ac10b-58cc-4372-a567-0e02b2c3d479/parts |