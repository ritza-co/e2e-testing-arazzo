import "jsr:@std/dotenv/load";
import { Status, STATUS_TEXT } from "jsr:@oak/commons/status";
import { Router, v } from "jsr:@oak/acorn";
import type { InferIssue, IssuePathItem } from "jsr:@valibot/valibot@0.42";

const BUILDABOT_API_KEY_AUTH = Deno.env.get("BUILDABOT_API_KEY_AUTH");

if (!BUILDABOT_API_KEY_AUTH) {
  console.error("BUILDABOT_API_KEY_AUTH is required. Create a .env file with this key.");
  Deno.exit(1);
}

const database = {
  robots: new Map<RobotId, Robot>(),
  parts: new Map<RobotId, RobotPart[]>(),
  features: new Map<RobotId, RobotFeature[]>(),
};

const router = new Router({
  preferJson: true,
  onRequest: (requestEvent) => {
    const requestApiKey = requestEvent.request.headers.get("x-api-key");

    if (!requestApiKey) {
      requestEvent.respond(
        unauthorizedResponse("Header x-api-key is required"),
      );
    } else if (requestApiKey !== BUILDABOT_API_KEY_AUTH) {
      requestEvent.respond(unauthorizedResponse("Header x-api-key is invalid"));
    }
  },
  logger: {
    console: { level: "DEBUG" },
  },
});

const NewRobotSchema = v.object({
  name: v.string(),
  model: v.string(),
});

const RobotIdSchema = v.pipe(v.string(), v.uuid());

type RobotId = v.InferOutput<typeof RobotIdSchema>;

enum RobotStatus {
  Designing = "designing",
  Assembled = "assembled",
  Activated = "activated",
}

const RobotStatusVariantSchema = v.variant("status", [
  v.object({
    status: v.literal(RobotStatus.Designing),
  }),
  v.object({
    status: v.literal(RobotStatus.Assembled),
  }),
  v.object({
    status: v.literal(RobotStatus.Activated),
    activationTime: v.pipe(v.string(), v.isoTimestamp()),
    capabilities: v.optional(v.array(v.string())),
  }),
]);

const RobotSchema = v.intersect([
  v.object({
    robotId: RobotIdSchema,
    name: v.string(),
    status: v.string(),
  }),
  RobotStatusVariantSchema,
]);

type Robot = v.InferOutput<typeof RobotSchema>;
type Link = { rel: string; href: string };
type RobotWithLinks = Robot & { links: Link[] };

const RobotResponseSchema = v.intersect([
  RobotSchema,
  v.object({
    links: v.array(
      v.object({
        rel: v.string(),
        href: v.string(),
      }),
    ),
  }),
]);

const RobotListResponseSchema = v.object({
  totalItems: v.pipe(v.number(), v.integer(), v.minValue(0)),
  page: v.pipe(v.number(), v.integer(), v.minValue(1)),
  pageSize: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100)),
  robots: v.array(RobotSchema),
});

const ErrorSchema = v.object({
  status: v.number(),
  error: v.string(),
  message: v.string(),
  details: v.optional(
    v.looseObject({}),
  ),
});

enum RobotPartTypeEnum {
  arm = "arm",
  leg = "leg",
  sensor = "sensor",
  processor = "processor",
  mobility = "mobility",
  power_source = "power_source",
}

const RobotPartInputSchema = v.object({
  type: v.enum(RobotPartTypeEnum, "Invalid part type"),
  name: v.pipe(v.string(), v.minLength(2), v.maxLength(100)),
  quantity: v.pipe(v.number(), v.integer(), v.minValue(1)),
});

const RobotPartsInputSchema = v.object({
  parts: v.array(RobotPartInputSchema),
});

const RobotPartIdSchema = v.pipe(v.string(), v.uuid());

const RobotPartSchema = v.object({
  partId: RobotPartIdSchema,
  type: v.enum(RobotPartTypeEnum, "Invalid part type"),
  name: v.string(),
  quantity: v.pipe(v.number(), v.integer()),
});

const RobotPartsResponseSchema = v.object({
  robotId: RobotIdSchema,
  parts: v.array(RobotPartSchema),
});

type RobotPart = v.InferOutput<typeof RobotPartSchema>;

const RobotFeatureIdSchema = v.pipe(v.string(), v.uuid());

const RobotFeatureSchema = v.object({
  name: v.string(),
  description: v.string(),
  featureId: RobotFeatureIdSchema,
});

type RobotFeature = v.InferOutput<typeof RobotFeatureSchema>;

const RobotFeatureInputSchema = v.object({
  name: v.string(),
  description: v.string(),
});

const RobotFeaturesInputSchema = v.object({
  features: v.array(RobotFeatureInputSchema),
});

const RobotFeatureResponseSchema = v.object({
  featureId: RobotFeatureIdSchema,
  name: v.string(),
  description: v.string(),
});

const RobotFeaturesResponseSchema = v.object({
  robotId: RobotIdSchema,
  features: v.array(RobotFeatureResponseSchema),
});

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MIN_PAGE_NUMBER = 1;
const MIN_PAGE_SIZE = 1;
const MAX_PAGE_SIZE = 100;

const PagingQuerySchema = v.object({
  page: v.optional(
    v.pipe(
      v.union([v.string(), v.number()]),
      v.transform(Number),
      v.number(),
      v.integer(),
      v.minValue(MIN_PAGE_NUMBER),
    ),
    DEFAULT_PAGE,
  ),
  pageSize: v.optional(
    v.pipe(
      v.union([v.string(), v.number()]),
      v.transform(Number),
      v.number(),
      v.integer(),
      v.minValue(MIN_PAGE_SIZE),
      v.maxValue(MAX_PAGE_SIZE),
    ),
    DEFAULT_PAGE_SIZE,
  ),
});

// deno-lint-ignore no-explicit-any
function invalidHandler(part: string, issues: InferIssue<any>[]): Response {
  const errorResponseBody = v.parse(ErrorSchema, {
    status: Status.BadRequest,
    error: STATUS_TEXT[Status.BadRequest],
    message: `Invalid ${part}`,
    details: {
      errors: issues.map((issue) => ({
        field: issue.path
          ?.reduce(
            (acc: string, path: IssuePathItem) => `${acc}.${path.key}`,
            "",
          )
          .slice(1),
        message: issue.message,
      })),
    },
  });
  return Response.json(errorResponseBody, {
    status: Status.BadRequest,
    statusText: STATUS_TEXT[Status.BadRequest],
  });
}

router.post(
  "/v1/robots",
  async (ctx) => {
    const body = await ctx.body();

    if (!body) {
      return ctx.throw(Status.BadRequest, "Body is required");
    }

    const robot: Robot = {
      robotId: crypto.randomUUID(),
      ...body,
      status: RobotStatus.Designing,
    };

    saveRobot(robot);

    const links = [
      { rel: "self", href: `/v1/robots/${robot.robotId}` },
      { rel: "parts", href: `/v1/robots/${robot.robotId}/parts` },
      { rel: "features", href: `/v1/robots/${robot.robotId}/features` },
      { rel: "assemble", href: `/v1/robots/${robot.robotId}/assemble` },
      { rel: "activate", href: `/v1/robots/${robot.robotId}/activate` },
    ];

    const robotWithLinks: RobotWithLinks = { ...robot, links };

    return ctx.created(robotWithLinks);
  },
  {
    schema: {
      body: NewRobotSchema,
      response: RobotResponseSchema,
      invalidHandler,
    },
  },
);

router.get("/v1/robots/:robotId", async (ctx) => {
  const robotIdRaw = ctx.params.robotId;

  const robotId = await validateRobotId(robotIdRaw);

  if (!robotId) {
    return robotIdInvalidResponse();
  }

  const robot = getRobot(robotId);
  if (!robot) {
    return robotNotFoundResponse(robotId);
  }

  const capabilities =
      database.features.get(robotId)?.map((feature) => feature.name) ||
      [];

  const links = [
    { rel: "self", href: `/v1/robots/${robot.robotId}` },
    { rel: "parts", href: `/v1/robots/${robot.robotId}/parts` },
    { rel: "features", href: `/v1/robots/${robot.robotId}/features` },
    { rel: "assemble", href: `/v1/robots/${robot.robotId}/assemble` },
    { rel: "activate", href: `/v1/robots/${robot.robotId}/activate` },
  ];

  return {
    ...robot,
    capabilities,
    links,
  };
}, {
  schema: {
    response: RobotResponseSchema,
  },
});

router.post(
  "/v1/robots/:robotId/parts",
  async (ctx) => {
    const robotIdRaw = ctx.params.robotId;

    const robotId = await validateRobotId(robotIdRaw);

    if (!robotId) {
      return robotIdInvalidResponse();
    }

    const robot = getRobot(robotId);

    if (!robot) {
      return robotNotFoundResponse(robotId);
    }

    const body = await ctx.body();

    if (!body) {
      return badRequestResponse("Body is required");
    }

    const parts = body.parts;

    const partsWithIds = parts.map((part) => ({
      ...part,
      partId: crypto.randomUUID(),
    }));

    const existingParts = database.parts.get(robotId) || [];

    const allParts = [...existingParts, ...partsWithIds];

    database.parts.set(robotId, allParts);

    return {
      robotId: robotId,
      parts: allParts,
    };
  },
  {
    schema: {
      body: RobotPartsInputSchema,
      response: RobotPartsResponseSchema,
    },
  },
);

router.get(
  "/v1/robots/:robotId/parts",
  async (ctx) => {
    const robotIdRaw = ctx.params.robotId;

    const robotId = await validateRobotId(robotIdRaw);

    if (!robotId) {
      return robotIdInvalidResponse();
    }

    const robot = getRobot(robotId);

    if (!robot) {
      return robotNotFoundResponse(robotId);
    }

    const parts = database.parts.get(robotId) || [];

    return {
      robotId: robotId,
      parts: parts,
    };
  },
  {
    schema: {
      response: RobotPartsResponseSchema,
    },
  },
);

router.post(
  "/v1/robots/:robotId/assemble",
  async (ctx) => {
    const robotIdRaw = ctx.params.robotId;

    const robotId = await validateRobotId(robotIdRaw);

    if (!robotId) {
      return robotIdInvalidResponse();
    }

    const robot = getRobot(robotId);

    if (!robot) {
      return robotNotFoundResponse(robotId);
    }

    if (robot.status !== RobotStatus.Designing) {
      return unprocessableEntityResponse(
        `Robot with id ${robotId} cannot be assembled from status '${robot.status}'`,
      );
    }

    const parts = database.parts.get(robotId) || [];
    if (parts.length === 0) {
      return unprocessableEntityResponse(
        `Robot with id ${robotId} has no parts to assemble`,
      );
    }

    const assembledRobot: Robot = {
      ...robot,
      status: RobotStatus.Assembled,
    };

    saveRobot(assembledRobot);

    const links = [
      { rel: "self", href: `/v1/robots/${assembledRobot.robotId}` },
      { rel: "parts", href: `/v1/robots/${assembledRobot.robotId}/parts` },
      {
        rel: "activate",
        href: `/v1/robots/${assembledRobot.robotId}/activate`,
      },
    ];

    const robotWithLinks: RobotWithLinks = { ...assembledRobot, links };

    return robotWithLinks;
  },
  {
    schema: {
      response: RobotResponseSchema,
    },
  },
);

router.post(
  "/v1/robots/:robotId/activate",
  async (ctx) => {
    const robotIdRaw = ctx.params.robotId;

    const robotId = await validateRobotId(robotIdRaw);

    if (!robotId) {
      return robotIdInvalidResponse();
    }

    const robot = getRobot(robotId);

    if (!robot) {
      return robotNotFoundResponse(robotId);
    }

    if (robot.status !== RobotStatus.Assembled) {
      return unprocessableEntityResponse(
        `Robot with id ${robotId} cannot be activated from status '${robot.status}'`,
      );
    }

    const activationTime = new Date().toISOString();

    const capabilities = database.features.get(robotId)?.map((feature) => feature.name) || [];

    const activatedRobot: Robot = {
      ...robot,
      status: RobotStatus.Activated,
      activationTime,
      capabilities,
    };

    saveRobot(activatedRobot);

    const links = [
      { rel: "self", href: `/v1/robots/${activatedRobot.robotId}` },
      { rel: "parts", href: `/v1/robots/${activatedRobot.robotId}/parts` },
    ];

    const robotWithLinks: RobotWithLinks = { ...activatedRobot, links };

    return robotWithLinks;
  },
  {
    schema: {
      response: RobotResponseSchema,
    },
  },
);

router.post(
  "/v1/robots/:robotId/features",
  async (ctx) => {
    const robotIdRaw = ctx.params.robotId;

    const robotId = await validateRobotId(robotIdRaw);

    if (!robotId) {
      return robotIdInvalidResponse();
    }

    const robot = getRobot(robotId);

    if (!robot) {
      return robotNotFoundResponse(robotId);
    }

    const body = await ctx.body();

    if (!body) {
      return badRequestResponse("Body is required");
    }

    const { features } = v.parse(RobotFeaturesInputSchema, body);

    const featuresWithIds = features.map((feature) => ({
      ...feature,
      featureId: crypto.randomUUID(),
    }));

    const existingFeatures = database.features.get(robotId) || [];
    const allFeatures = [...existingFeatures, ...featuresWithIds];

    database.features.set(robotId, allFeatures);

    return {
      robotId: robotId,
      features: allFeatures,
    };
  },
  {
    schema: {
      body: RobotFeaturesInputSchema,
      response: RobotFeaturesResponseSchema,
      invalidHandler,
    },
  },
);

router.get(
  "/v1/robots/:robotId/features",
  async (ctx) => {
    const robotIdRaw = ctx.params.robotId;

    const robotId = await validateRobotId(robotIdRaw);

    if (!robotId) {
      return robotIdInvalidResponse();
    }

    const robot = getRobot(robotId);

    if (!robot) {
      return robotNotFoundResponse(robotId);
    }

    const features = database.features.get(robotId) || [];

    return {
      robotId: robotId,
      features: features,
    };
  },
  {
    schema: {
      response: RobotFeaturesResponseSchema,
    },
  },
);

router.get("/v1/robots", async (ctx) => {
  const { page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE } =
    await ctx.queryParams() || {};

  const allRobots = Array.from(database.robots.values());
  const totalItems = allRobots.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRobots = allRobots.slice(startIndex, endIndex);

  return {
    totalItems,
    page,
    pageSize,
    robots: paginatedRobots,
  };
}, {
  schema: {
    querystring: PagingQuerySchema,
    response: RobotListResponseSchema,
    invalidHandler,
  },
});

router.listen({
  port: 8080,
  hostname: "localhost",
});

function saveRobot(robot: Robot) {
  database.robots.set(robot.robotId, robot);
}

function getRobot(robotId: string): Robot | undefined {
  return database.robots.get(robotId);
}

async function validateRobotId(
  robotIdRaw: string,
): Promise<RobotId | undefined> {
  try {
    const robotId = await v.parseAsync(RobotIdSchema, robotIdRaw);
    return robotId;
  } catch {
    return undefined;
  }
}

function generateErrorResponse(
  status: Status,
  message: string,
  details?: Record<string, unknown>,
): Response {
  return Response.json(
    v.parse(ErrorSchema, {
      status,
      error: STATUS_TEXT[status],
      message,
      details,
    }),
    { status, statusText: STATUS_TEXT[status] },
  );
}

function robotIdInvalidResponse(): Response {
  return generateErrorResponse(
    Status.BadRequest,
    "Invalid robotId: must be a valid UUID",
    {
      errors: [{ field: "robotId", message: "Invalid UUID" }],
    },
  );
}

function robotNotFoundResponse(robotId: RobotId): Response {
  return generateErrorResponse(
    Status.NotFound,
    `Robot with id ${robotId} not found`,
  );
}

function badRequestResponse(
  message: string,
  details?: Record<string, unknown>,
): Response {
  return generateErrorResponse(Status.BadRequest, message, details);
}

function unprocessableEntityResponse(message: string): Response {
  return generateErrorResponse(Status.UnprocessableEntity, message);
}

function unauthorizedResponse(message: string): Response {
  return generateErrorResponse(Status.Unauthorized, message);
}
