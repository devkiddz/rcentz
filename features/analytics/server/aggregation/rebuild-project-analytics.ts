import { prisma } from '@/lib/prisma';

type AnalyticsMetrics = {
  sessions: number;
  uniqueVisitors: number;

  pageViews: number;
  projectViews: number;
  productViews: number;
  serviceViews: number;

  searches: number;
  clicks: number;

  reactions: number;
  comments: number;
  shares: number;
  downloads: number;

  addToCarts: number;
  removeFromCarts: number;

  checkoutStarted: number;
  purchases: number;

  serviceRequests: number;

  signUps: number;
  logins: number;

  conversions: number;

  totalEvents: number;
};

type DailyAccumulator = {
  metrics: AnalyticsMetrics;
  sessionIds: Set<string>;
};

function createEmptyMetrics(): AnalyticsMetrics {
  return {
    sessions: 0,
    uniqueVisitors: 0,

    pageViews: 0,
    projectViews: 0,
    productViews: 0,
    serviceViews: 0,

    searches: 0,
    clicks: 0,

    reactions: 0,
    comments: 0,
    shares: 0,
    downloads: 0,

    addToCarts: 0,
    removeFromCarts: 0,

    checkoutStarted: 0,
    purchases: 0,

    serviceRequests: 0,

    signUps: 0,
    logins: 0,

    conversions: 0,

    totalEvents: 0
  };
}

function incrementEventMetric(
  metrics: AnalyticsMetrics,
  type: string
) {
  metrics.totalEvents += 1;

  switch (type) {
    case 'PAGE_VIEW':
      metrics.pageViews += 1;
      break;

    case 'PROJECT_VIEW':
      metrics.projectViews += 1;
      break;

    case 'PRODUCT_VIEW':
      metrics.productViews += 1;
      break;

    case 'SERVICE_VIEW':
      metrics.serviceViews += 1;
      break;

    case 'SEARCH':
      metrics.searches += 1;
      break;

    case 'CLICK':
      metrics.clicks += 1;
      break;

    case 'REACTION':
      metrics.reactions += 1;
      break;

    case 'COMMENT':
      metrics.comments += 1;
      break;

    case 'SHARE':
      metrics.shares += 1;
      break;

    case 'DOWNLOAD':
      metrics.downloads += 1;
      break;

    case 'ADD_TO_CART':
      metrics.addToCarts += 1;
      break;

    case 'REMOVE_FROM_CART':
      metrics.removeFromCarts += 1;
      break;

    case 'CHECKOUT_STARTED':
      metrics.checkoutStarted += 1;
      break;

    case 'PURCHASE':
      metrics.purchases += 1;
      break;

    case 'SERVICE_REQUEST':
      metrics.serviceRequests += 1;
      break;

    case 'SIGN_UP':
      metrics.signUps += 1;
      break;

    case 'LOGIN':
      metrics.logins += 1;
      break;

    case 'OTHER':
      break;
  }
}

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

/*
 * Goal metadata works as a subset matcher.
 *
 * Example goal:
 *
 * {
 *   action: "whatsapp_click"
 * }
 *
 * will match an event containing:
 *
 * {
 *   action: "whatsapp_click",
 *   source: "RCENTZ_TRACKER",
 *   origin: "https://example.com"
 * }
 */
function matchesMetadataSubset(
  expected: unknown,
  actual: unknown
): boolean {
  if (
    expected === null ||
    expected === undefined
  ) {
    return true;
  }

  if (Array.isArray(expected)) {
    if (!Array.isArray(actual)) {
      return false;
    }

    if (
      expected.length !==
      actual.length
    ) {
      return false;
    }

    return expected.every(
      (value, index) =>
        matchesMetadataSubset(
          value,
          actual[index]
        )
    );
  }

  if (isRecord(expected)) {
    if (!isRecord(actual)) {
      return false;
    }

    return Object.entries(
      expected
    ).every(
      ([key, value]) =>
        key in actual &&
        matchesMetadataSubset(
          value,
          actual[key]
        )
    );
  }

  return Object.is(
    expected,
    actual
  );
}

function normalizeGoalPath(
  value: string
) {
  const trimmed =
    value.trim();

  if (!trimmed) {
    return '/';
  }

  return trimmed.startsWith('/')
    ? trimmed
    : `/${trimmed}`;
}

function eventMatchesGoal({
  event,
  goal
}: {
  event: {
    type: string;
    path: string | null;
    metadata: unknown;
  };

  goal: {
    eventType: string;
    path: string | null;
    matchMetadata: unknown;
  };
}) {
  if (
    event.type !==
    goal.eventType
  ) {
    return false;
  }

  if (goal.path) {
    if (!event.path) {
      return false;
    }

    if (
      event.path !==
      normalizeGoalPath(
        goal.path
      )
    ) {
      return false;
    }
  }

  if (
    goal.matchMetadata !==
      null &&
    goal.matchMetadata !==
      undefined
  ) {
    return matchesMetadataSubset(
      goal.matchMetadata,
      event.metadata
    );
  }

  return true;
}

function assertValidTimeZone(
  timeZone: string
) {
  try {
    new Intl.DateTimeFormat(
      'en-US',
      {
        timeZone
      }
    ).format(
      new Date()
    );

    return timeZone;
  } catch {
    throw new Error(
      `Invalid analytics timezone: ${timeZone}`
    );
  }
}

function getDateKeyForTimeZone({
  date,
  timeZone
}: {
  date: Date;
  timeZone: string;
}) {
  const formatter =
    new Intl.DateTimeFormat(
      'en-US',
      {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }
    );

  const parts =
    formatter.formatToParts(
      date
    );

  const values =
    new Map(
      parts.map(part => [
        part.type,
        part.value
      ])
    );

  const year =
    values.get('year');

  const month =
    values.get('month');

  const day =
    values.get('day');

  if (
    !year ||
    !month ||
    !day
  ) {
    throw new Error(
      'Could not determine analytics calendar date.'
    );
  }

  return `${year}-${month}-${day}`;
}

function dateKeyToDatabaseDate(
  dateKey: string
) {
  return new Date(
    `${dateKey}T00:00:00.000Z`
  );
}

export async function rebuildProjectAnalytics(
  projectId: string
) {
  const [
    analyticsConfig,
    goals,
    events
  ] =
    await Promise.all([
      prisma.projectAnalyticsConfig.findUnique({
        where: {
          projectId
        },

        select: {
          id: true,
          projectId: true,
          timezone: true,
          status: true
        }
      }),

      prisma.projectAnalyticsGoal.findMany({
        where: {
          projectId,
          active: true
        },

        select: {
          id: true,
          key: true,
          eventType: true,
          path: true,
          matchMetadata: true,
          isPrimary: true
        }
      }),

      prisma.analyticsEvent.findMany({
        where: {
          projectId
        },

        orderBy: [
          {
            createdAt: 'asc'
          },
          {
            id: 'asc'
          }
        ],

        select: {
          id: true,
          sessionId: true,
          type: true,
          path: true,
          metadata: true,
          createdAt: true
        }
      })
    ]);

  if (!analyticsConfig) {
    throw new Error(
      `Analytics configuration does not exist for project ${projectId}.`
    );
  }

  const timeZone =
    assertValidTimeZone(
      analyticsConfig.timezone
    );

  const lifetime =
    createEmptyMetrics();

  const lifetimeSessionIds =
    new Set<string>();

  const daily =
    new Map<
      string,
      DailyAccumulator
    >();

  for (const event of events) {
    incrementEventMetric(
      lifetime,
      event.type
    );

    if (event.sessionId) {
      lifetimeSessionIds.add(
        event.sessionId
      );
    }

    const dateKey =
      getDateKeyForTimeZone({
        date:
          event.createdAt,
        timeZone
      });

    let day =
      daily.get(
        dateKey
      );

    if (!day) {
      day = {
        metrics:
          createEmptyMetrics(),

        sessionIds:
          new Set<string>()
      };

      daily.set(
        dateKey,
        day
      );
    }

    incrementEventMetric(
      day.metrics,
      event.type
    );

    if (event.sessionId) {
      day.sessionIds.add(
        event.sessionId
      );
    }

    /*
     * One raw event counts as one conversion,
     * even if multiple goals happen to match it.
     */
    const isConversion =
      goals.some(goal =>
        eventMatchesGoal({
          event,
          goal
        })
      );

    if (isConversion) {
      lifetime.conversions += 1;
      day.metrics.conversions += 1;
    }
  }

  lifetime.sessions =
    lifetimeSessionIds.size;

  /*
   * We intentionally DO NOT fake unique visitors.
   *
   * Right now we have reliable session identity,
   * but not yet a persistent anonymous visitor identity.
   *
   * A later tracker slice will add visitorKey.
   */
  lifetime.uniqueVisitors = 0;

  for (
    const day of
    daily.values()
  ) {
    day.metrics.sessions =
      day.sessionIds.size;

    day.metrics.uniqueVisitors =
      0;
  }

  const lastEvent =
    events.at(-1);

  const aggregatedAt =
    new Date();

  const dailyRows =
    Array.from(
      daily.entries()
    ).map(
      ([
        dateKey,
        accumulator
      ]) => ({
        projectId,
        date:
          dateKeyToDatabaseDate(
            dateKey
          ),

        ...accumulator.metrics
      })
    );

  await prisma.$transaction(
    async transaction => {
      /*
       * Daily values are rebuilt from raw truth.
       *
       * This makes the engine completely idempotent:
       * rerunning it cannot double-count.
       */
      await transaction.projectAnalyticsDaily.deleteMany({
        where: {
          projectId
        }
      });

      if (
        dailyRows.length >
        0
      ) {
        await transaction.projectAnalyticsDaily.createMany({
          data:
            dailyRows
        });
      }

      await transaction.projectAnalytics.upsert({
        where: {
          projectId
        },

        create: {
          projectId,

          sessions:
            lifetime.sessions,

          uniqueVisitors:
            lifetime.uniqueVisitors,

          pageViews:
            lifetime.pageViews,

          projectViews:
            lifetime.projectViews,

          productViews:
            lifetime.productViews,

          serviceViews:
            lifetime.serviceViews,

          searches:
            lifetime.searches,

          clicks:
            lifetime.clicks,

          reactions:
            lifetime.reactions,

          comments:
            lifetime.comments,

          shares:
            lifetime.shares,

          downloads:
            lifetime.downloads,

          addToCarts:
            lifetime.addToCarts,

          removeFromCarts:
            lifetime.removeFromCarts,

          checkoutStarted:
            lifetime.checkoutStarted,

          purchases:
            lifetime.purchases,

          serviceRequests:
            lifetime.serviceRequests,

          signUps:
            lifetime.signUps,

          logins:
            lifetime.logins,

          conversions:
            lifetime.conversions,

          totalEvents:
            lifetime.totalEvents,

          lastEventAt:
            lastEvent
              ?.createdAt ??
            null
        },

        update: {
          sessions:
            lifetime.sessions,

          uniqueVisitors:
            lifetime.uniqueVisitors,

          pageViews:
            lifetime.pageViews,

          projectViews:
            lifetime.projectViews,

          productViews:
            lifetime.productViews,

          serviceViews:
            lifetime.serviceViews,

          searches:
            lifetime.searches,

          clicks:
            lifetime.clicks,

          reactions:
            lifetime.reactions,

          comments:
            lifetime.comments,

          shares:
            lifetime.shares,

          downloads:
            lifetime.downloads,

          addToCarts:
            lifetime.addToCarts,

          removeFromCarts:
            lifetime.removeFromCarts,

          checkoutStarted:
            lifetime.checkoutStarted,

          purchases:
            lifetime.purchases,

          serviceRequests:
            lifetime.serviceRequests,

          signUps:
            lifetime.signUps,

          logins:
            lifetime.logins,

          conversions:
            lifetime.conversions,

          totalEvents:
            lifetime.totalEvents,

          lastEventAt:
            lastEvent
              ?.createdAt ??
            null
        }
      });

      await transaction.projectAnalyticsConfig.update({
        where: {
          id:
            analyticsConfig.id
        },

        data: {
          lastAggregatedAt:
            aggregatedAt
        }
      });
    }
  );

  return {
    projectId,

    status:
      analyticsConfig.status,

    timezone:
      timeZone,

    rawEvents:
      events.length,

    days:
      dailyRows.length,

    activeGoals:
      goals.length,

    metrics:
      lifetime,

    lastEventAt:
      lastEvent
        ?.createdAt ??
      null,

    aggregatedAt
  };
}