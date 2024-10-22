# PartInput

## Example Usage

```typescript
import { PartInput } from "build-a-bot/models/components";

let value: PartInput = {
  type: "arm",
  name: "Hydraulic Arm",
  quantity: 2,
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          | Example                                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `type`                                                               | [components.PartInputType](../../models/components/partinputtype.md) | :heavy_check_mark:                                                   | The type of part.                                                    | arm                                                                  |
| `name`                                                               | *string*                                                             | :heavy_check_mark:                                                   | The name of the part.                                                | Hydraulic Arm                                                        |
| `quantity`                                                           | *number*                                                             | :heavy_check_mark:                                                   | Quantity of the part.                                                | 2                                                                    |