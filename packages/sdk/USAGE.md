<!-- Start SDK Example Usage [usage] -->
```typescript
import { BuildaBot } from "build-a-bot";

const buildaBot = new BuildaBot({
  apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await buildaBot.robots.listRobots({
    page: 1,
    pageSize: 20,
  });

  for await (const page of result) {
    // Handle the page
    console.log(page);
  }
}

run();

```
<!-- End SDK Example Usage [usage] -->