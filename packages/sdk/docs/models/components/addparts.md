# AddParts

## Example Usage

```typescript
import { AddParts } from "build-a-bot/models/components";

let value: AddParts = {
  parts: [
    {
      type: "arm",
      name: "Hydraulic Arm",
      quantity: 2,
    },
  ],
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `parts`                                                        | [components.PartInput](../../models/components/partinput.md)[] | :heavy_check_mark:                                             | N/A                                                            |