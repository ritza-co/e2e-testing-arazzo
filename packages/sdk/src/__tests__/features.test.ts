/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { expect, test } from "vitest";
import { BuildaBot } from "../index.js";

test("Features Get Robot Features Robot Features Example", async () => {
  const buildaBot = new BuildaBot({
    apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
  });
  const result = await buildaBot.features.getRobotFeatures({
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  });
  expect(result).toBeDefined();
  expect(result).toBeDefined();
  expect(result).toEqual({
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    features: [
      {
        featureId: "c56a4180-65aa-42ec-a945-5fd21dec0538",
        name: "Voice Recognition",
        description: "Enables voice command recognition.",
      },
      {
        featureId: "c56a4180-65aa-42ec-a945-5fd21dec0539",
        name: "Obstacle Avoidance",
        description: "Navigates around obstacles.",
      },
    ],
  });
});

test("Features Get Robot Features", async () => {
  const buildaBot = new BuildaBot({
    apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
  });
  const result = await buildaBot.features.getRobotFeatures({
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  });
  expect(result).toBeDefined();
  expect(result).toBeDefined();
  expect(result).toEqual({
    robotId: "4d156658-1200-48f6-95d8-3c59f623f879",
    features: [
      {
        featureId: "5e76bc01-a481-4384-b8b8-df2023d825f0",
        name: "Voice Recognition",
        description: "Enables voice command recognition.",
      },
      {
        featureId: "ab2e6e7a-08ff-4c42-92bd-8f983d93dcde",
        name: "Voice Recognition",
        description: "Enables voice command recognition.",
      },
      {
        featureId: "8c2c3028-81d5-4d06-9ce6-c48b665e6a34",
        name: "Voice Recognition",
        description: "Enables voice command recognition.",
      },
    ],
  });
});

test("Features Get Robot Features Unauthorized Example", async () => {
  const buildaBot = new BuildaBot({
    apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
  });
  const result = await buildaBot.features.getRobotFeatures({
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  });
  expect(result).toBeDefined();
});

test("Features Configure Robot Features Features Example", async () => {
  const buildaBot = new BuildaBot({
    apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
  });
  const result = await buildaBot.features.configureRobotFeatures({
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    features: {
      features: [
        {
          name: "Voice Recognition",
          description: "Enables voice command recognition.",
        },
        {
          name: "Obstacle Avoidance",
          description: "Navigates around obstacles.",
        },
      ],
    },
  });
  expect(result).toBeDefined();
  expect(result).toBeDefined();
  expect(result).toEqual({
    robotId: "83344e46-0b79-4f04-bf7d-60661b333932",
    features: [
      {
        featureId: "f94c6b0d-85cb-4f31-9547-acaacc620ce9",
        name: "Voice Recognition",
        description: "Enables voice command recognition.",
      },
      {
        featureId: "6e1ea1b7-fa61-470a-b0d8-956bd1a46138",
        name: "Voice Recognition",
        description: "Enables voice command recognition.",
      },
    ],
  });
});

test("Features Configure Robot Features", async () => {
  const buildaBot = new BuildaBot({
    apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
  });
  const result = await buildaBot.features.configureRobotFeatures({
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    features: {
      features: [
        {
          name: "Voice Recognition",
          description: "Enables voice command recognition.",
        },
        {
          name: "Obstacle Avoidance",
          description: "Navigates around obstacles.",
        },
      ],
    },
  });
  expect(result).toBeDefined();
  expect(result).toBeDefined();
  expect(result).toEqual({
    robotId: "4902594d-79fa-44ce-90b7-e721409ae526",
    features: [
      {
        featureId: "ec2a58b8-6862-4d12-b023-e33b5bf66ca9",
        name: "Voice Recognition",
        description: "Enables voice command recognition.",
      },
    ],
  });
});

test("Features Configure Robot Features Features Configured Example", async () => {
  const buildaBot = new BuildaBot({
    apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
  });
  const result = await buildaBot.features.configureRobotFeatures({
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    features: {
      features: [
        {
          name: "Voice Recognition",
          description: "Enables voice command recognition.",
        },
        {
          name: "Voice Recognition",
          description: "Enables voice command recognition.",
        },
      ],
    },
  });
  expect(result).toBeDefined();
  expect(result).toBeDefined();
  expect(result).toEqual({
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    features: [
      {
        featureId: "c56a4180-65aa-42ec-a945-5fd21dec0538",
        name: "Voice Recognition",
        description: "Enables voice command recognition.",
      },
      {
        featureId: "c56a4180-65aa-42ec-a945-5fd21dec0539",
        name: "Obstacle Avoidance",
        description: "Navigates around obstacles.",
      },
    ],
  });
});

test("Features Configure Robot Features Bad Request Example", async () => {
  const buildaBot = new BuildaBot({
    apiKeyAuth: process.env["BUILDABOT_API_KEY_AUTH"] ?? "",
  });
  const result = await buildaBot.features.configureRobotFeatures({
    robotId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    features: {
      features: [
        {
          name: "Voice Recognition",
          description: "Enables voice command recognition.",
        },
      ],
    },
  });
  expect(result).toBeDefined();
});
