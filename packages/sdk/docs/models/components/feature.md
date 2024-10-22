# Feature

## Example Usage

```typescript
import { Feature } from "build-a-bot/models/components";

let value: Feature = {
  featureId: "d9052f77-a52d-4383-81df-fec516320b0c",
  name: "Voice Recognition",
  description: "Enables voice command recognition.",
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        | Example                            |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `featureId`                        | *string*                           | :heavy_check_mark:                 | Unique identifier of the feature.  |                                    |
| `name`                             | *string*                           | :heavy_check_mark:                 | Name of the feature.               | Voice Recognition                  |
| `description`                      | *string*                           | :heavy_check_mark:                 | Description of the feature.        | Enables voice command recognition. |