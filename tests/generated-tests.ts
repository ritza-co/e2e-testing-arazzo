import { assertEquals, assertMatch } from "@std/assert";
import { JSONPath } from "npm:jsonpath-plus@8.0.0";
import "jsr:@std/dotenv/load";

Deno.test("Create, assemble, and activate a new robot", async (test) => {
  const serverUrl = "http://localhost:8080";
  const apiKey = Deno.env.get("BUILDABOT_API_KEY_AUTH");
  const context: Record<string, unknown> = {};
  await test.step("Create a new robot design session", async () => {
    const response = await fetch(`${serverUrl}/v1/robots`, {
      method: "POST",
      headers: {
        "X-API-Key": `${apiKey}`,
        "Content-Type": "application/json",
      },
      body: '{"model":"humanoid","name":"MyFirstRobot"}',
    });
    const data = await response.json();
    assertEquals(response.status, 201, "$statusCode == 201");
    assertMatch(
      data.robotId,
      new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      ),
      "/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i",
    );
    assertEquals(data.model, "humanoid", '$response.body#/model == "humanoid"');
    assertEquals(
      data.name,
      "MyFirstRobot",
      '$response.body#/name == "MyFirstRobot"',
    );
    assertEquals(
      data.status,
      "designing",
      '$response.body#/status == "designing"',
    );
    assertEquals(
      JSONPath({
        wrap: false,
        path: "$.length == 5",
        json: data.links,
      }),
      true,
      "$.length == 5",
    );
    context["createRobot.outputs.robotId"] = data.robotId;
  });

  await test.step("Add parts to the robot", async () => {
    const robotId = context["createRobot.outputs.robotId"];
    const response = await fetch(`${serverUrl}/v1/robots/${robotId}/parts`, {
      method: "POST",
      headers: {
        "X-API-Key": `${apiKey}`,
        "Content-Type": "application/json",
      },
      body:
        '{"parts":[{"type":"arm","name":"Hydraulic Arm","quantity":2},{"type":"sensor","name":"Infrared Sensor","quantity":1}]}',
    });
    const data = await response.json();
    assertEquals(response.status, 200, "$statusCode == 200");
    assertEquals(
      data.robotId,
      context["createRobot.outputs.robotId"],
      "$response.body#/robotId == $steps.createRobot.outputs.robotId",
    );
  });

  await test.step("Assemble the robot", async () => {
    const robotId = context["createRobot.outputs.robotId"];
    const response = await fetch(`${serverUrl}/v1/robots/${robotId}/assemble`, {
      method: "POST",
      headers: {
        "X-API-Key": `${apiKey}`,
        "Content-Type": "application/json",
      },
      body: null,
    });
    const data = await response.json();
    assertEquals(response.status, 200, "$statusCode == 200");
    assertEquals(
      data.robotId,
      context["createRobot.outputs.robotId"],
      "$response.body#/robotId == $steps.createRobot.outputs.robotId",
    );
    assertEquals(
      data.status,
      "assembled",
      '$response.body#/status == "assembled"',
    );
  });

  await test.step("Configure robot features", async () => {
    const robotId = context["createRobot.outputs.robotId"];
    const response = await fetch(`${serverUrl}/v1/robots/${robotId}/features`, {
      method: "POST",
      headers: {
        "X-API-Key": `${apiKey}`,
        "Content-Type": "application/json",
      },
      body:
        '{"features":[{"name":"Voice Recognition","description":"Enables voice command recognition."},{"name":"Obstacle Avoidance","description":"Navigates around obstacles."}]}',
    });
    const data = await response.json();
    assertEquals(response.status, 200, "$statusCode == 200");
    assertEquals(
      data.robotId,
      context["createRobot.outputs.robotId"],
      "$response.body#/robotId == $steps.createRobot.outputs.robotId",
    );
  });

  await test.step("Activate the robot", async () => {
    const robotId = context["createRobot.outputs.robotId"];
    const response = await fetch(`${serverUrl}/v1/robots/${robotId}/activate`, {
      method: "POST",
      headers: {
        "X-API-Key": `${apiKey}`,
        "Content-Type": "application/json",
      },
      body: null,
    });
    const data = await response.json();
    assertEquals(response.status, 200, "$statusCode == 200");
    assertEquals(
      data.robotId,
      context["createRobot.outputs.robotId"],
      "$response.body#/robotId == $steps.createRobot.outputs.robotId",
    );
    assertEquals(
      data.status,
      "activated",
      '$response.body#/status == "activated"',
    );
    context["activateRobot.outputs.activationTime"] = data.activationTime;
    context["activateRobot.outputs.capabilities"] = data.capabilities;
  });

  await test.step("Get the robot details", async () => {
    const robotId = context["createRobot.outputs.robotId"];
    const response = await fetch(`${serverUrl}/v1/robots/${robotId}`, {
      method: "GET",
      headers: {
        "X-API-Key": `${apiKey}`,
        "Content-Type": "application/json",
      },
      body: null,
    });
    const data = await response.json();
    assertEquals(response.status, 200, "$statusCode == 200");
    assertEquals(
      data.robotId,
      context["createRobot.outputs.robotId"],
      "$response.body#/robotId == $steps.createRobot.outputs.robotId",
    );
    assertEquals(
      data.status,
      "activated",
      '$response.body#/status == "activated"',
    );
    assertEquals(
      data.activationTime,
      context["activateRobot.outputs.activationTime"],
      "$response.body#/activationTime == $steps.activateRobot.outputs.activationTime",
    );
    assertEquals(
      data.capabilities,
      context["activateRobot.outputs.capabilities"],
      "$response.body#/capabilities == $steps.activateRobot.outputs.capabilities",
    );
    context["getRobot.outputs.robot"] = data;
  });
});
