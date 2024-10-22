# Part

## Example Usage

```typescript
import { Part } from "build-a-bot/models/components";

let value: Part = {
  partId: "b4632fb7-3406-44b6-a201-a78ef3a40c56",
  type: "arm",
  name: "Hydraulic Arm",
  quantity: 2,
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        | Example                                            |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `partId`                                           | *string*                                           | :heavy_check_mark:                                 | Unique identifier of the part.                     |                                                    |
| `type`                                             | [components.Type](../../models/components/type.md) | :heavy_check_mark:                                 | The type of part.                                  | arm                                                |
| `name`                                             | *string*                                           | :heavy_check_mark:                                 | The name of the part.                              | Hydraulic Arm                                      |
| `quantity`                                         | *number*                                           | :heavy_check_mark:                                 | Quantity of the part.                              | 2                                                  |