import 'server-only';

import { prisma } from '@/lib/prisma';

const supportedAnalyticsEventTypes = [
  'PAGE_VIEW',
  'PROJECT_VIEW',
  'PRODUCT_VIEW',
  'SERVICE_VIEW',
  'SEARCH',
  'CLICK',
  'REACTION',
  'COMMENT',
  'SHARE',
  'DOWNLOAD',
  'ADD_TO_CART',
  'REMOVE_FROM_CART',
  'CHECKOUT_STARTED',
  'PURCHASE',
  'SERVICE_REQUEST',
  'SIGN_UP',
  'LOGIN',
  'OTHER'
] as const;

export type SupportedAnalyticsEventType =
  (typeof supportedAnalyticsEventTypes)[number];

type ProjectAnalyticsEventPayload = {
  trackingKey: string;
  sessionKey: string;
  type: SupportedAnalyticsEventType;

  path: string | null;

  entityType: string;
  entityId: string | null;

  metadata: Record<string, unknown>;
};

type ParseResult =
  | {
      ok: true;
      data: ProjectAnalyticsEventPayload;
    }
  | {
      ok: false;
      error: string;
    };

type CollectResult =
  | {
      ok: true;
      projectId: string;
      eventId: string;
    }
  | {
      ok: false;
      status: 403 | 404;
      error: string;
    };

const supportedEventTypeSet = new Set<string>(
  supportedAnalyticsEventTypes
);

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

function readRequiredString(
  value: unknown,
  fieldName: string,
  maxLength: number
) {
  if (
    typeof value !== 'string' ||
    value.trim().length === 0
  ) {
    return {
      ok: false as const,
      error: `${fieldName} is required.`
    };
  }

  const normalizedValue = value.trim();

  if (normalizedValue.length > maxLength) {
    return {
      ok: false as const,
      error: `${fieldName} is too long.`
    };
  }

  return {
    ok: true as const,
    value: normalizedValue
  };
}

function readOptionalString(
  value: unknown,
  fieldName: string,
  maxLength: number
) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return {
      ok: true as const,
      value: null
    };
  }

  if (typeof value !== 'string') {
    return {
      ok: false as const,
      error: `${fieldName} must be a string.`
    };
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return {
      ok: true as const,
      value: null
    };
  }

  if (normalizedValue.length > maxLength) {
    return {
      ok: false as const,
      error: `${fieldName} is too long.`
    };
  }

  return {
    ok: true as const,
    value: normalizedValue
  };
}

function normalizePath(
  value: string | null
) {
  if (!value) {
    return null;
  }

  // If an absolute URL is supplied, only retain its
  // project-relevant route information.
  try {
    if (
      value.startsWith('http://') ||
      value.startsWith('https://')
    ) {
      const url = new URL(value);

      return `${url.pathname}${url.search}`;
    }
  } catch {
    return null;
  }

  return value.startsWith('/')
    ? value
    : `/${value}`;
}

function normalizeOrigin(
  value: string
) {
  try {
    const url = new URL(value);

    if (
      url.protocol !== 'http:' &&
      url.protocol !== 'https:'
    ) {
      return null;
    }

    return url.origin.toLowerCase();
  } catch {
    return null;
  }
}

function originIsAllowed({
  origin,
  allowedOrigins
}: {
  origin: string;
  allowedOrigins: string[];
}) {
  const normalizedOrigin =
    normalizeOrigin(origin);

  if (!normalizedOrigin) {
    return false;
  }

  return allowedOrigins.some(
    allowedOrigin => {
      const normalizedAllowedOrigin =
        normalizeOrigin(allowedOrigin);

      return (
        normalizedAllowedOrigin ===
        normalizedOrigin
      );
    }
  );
}

export function parseProjectAnalyticsEventPayload(
  input: unknown
): ParseResult {
  if (!isRecord(input)) {
    return {
      ok: false,
      error: 'Invalid request body.'
    };
  }

  const trackingKeyResult =
    readRequiredString(
      input.trackingKey,
      'trackingKey',
      128
    );

  if (!trackingKeyResult.ok) {
    return trackingKeyResult;
  }

  const sessionKeyResult =
    readRequiredString(
      input.sessionKey,
      'sessionKey',
      160
    );

  if (!sessionKeyResult.ok) {
    return sessionKeyResult;
  }

  const eventTypeResult =
    readRequiredString(
      input.type,
      'type',
      64
    );

  if (!eventTypeResult.ok) {
    return eventTypeResult;
  }

  const eventType =
    eventTypeResult.value.toUpperCase();

  if (
    !supportedEventTypeSet.has(
      eventType
    )
  ) {
    return {
      ok: false,
      error:
        'Unsupported analytics event type.'
    };
  }

  const pathResult =
    readOptionalString(
      input.path,
      'path',
      2048
    );

  if (!pathResult.ok) {
    return pathResult;
  }

  const entityTypeResult =
    readOptionalString(
      input.entityType,
      'entityType',
      80
    );

  if (!entityTypeResult.ok) {
    return entityTypeResult;
  }

  const entityIdResult =
    readOptionalString(
      input.entityId,
      'entityId',
      200
    );

  if (!entityIdResult.ok) {
    return entityIdResult;
  }

  if (
    input.metadata !== undefined &&
    input.metadata !== null &&
    !isRecord(input.metadata)
  ) {
    return {
      ok: false,
      error:
        'metadata must be a JSON object.'
    };
  }

  const metadata =
    isRecord(input.metadata)
      ? input.metadata
      : {};

  const serializedMetadata =
    JSON.stringify(metadata);

  if (
    serializedMetadata.length >
    16_000
  ) {
    return {
      ok: false,
      error:
        'metadata payload is too large.'
    };
  }

  return {
    ok: true,

    data: {
      trackingKey:
        trackingKeyResult.value,

      sessionKey:
        sessionKeyResult.value,

      type:
        eventType as SupportedAnalyticsEventType,

      path:
        normalizePath(
          pathResult.value
        ),

      entityType:
        (
          entityTypeResult.value ??
          'PROJECT'
        ).toUpperCase(),

      entityId:
        entityIdResult.value,

      metadata
    }
  };
}

export async function collectProjectAnalyticsEvent({
  payload,
  origin
}: {
  payload: ProjectAnalyticsEventPayload;
  origin: string;
}): Promise<CollectResult> {
  const analyticsConfig =
    await prisma.projectAnalyticsConfig.findUnique({
      where: {
        trackingKey:
          payload.trackingKey
      },

      select: {
        id: true,
        projectId: true,
        status: true,
        allowedOrigins: true,
        startedAt: true,

        project: {
          select: {
            infrastructure: {
              select: {
                primaryDomain: true
              }
            }
          }
        }
      }
    });

  if (!analyticsConfig) {
    return {
      ok: false,
      status: 404,
      error:
        'Analytics tracking configuration was not found.'
    };
  }

  if (
    analyticsConfig.status !==
    'ACTIVE'
  ) {
    return {
      ok: false,
      status: 403,
      error:
        'Analytics collection is not active for this project.'
    };
  }

  if (
    !originIsAllowed({
      origin,
      allowedOrigins:
        analyticsConfig.allowedOrigins
    })
  ) {
    return {
      ok: false,
      status: 403,
      error:
        'This origin is not allowed to submit analytics for this project.'
    };
  }

  const now = new Date();

  /*
   * AnalyticsSession.sessionKey is globally unique.
   *
   * A browser-generated session identifier therefore needs
   * project namespacing so separate Rcentz projects can never
   * accidentally resolve to the same AnalyticsSession.
   */
  const namespacedSessionKey =
    `${analyticsConfig.projectId}:${payload.sessionKey}`;

  const defaultEntityId =
    payload.entityType === 'PROJECT'
      ? analyticsConfig.projectId
      : null;

  const event =
    await prisma.$transaction(
      async transaction => {
        const analyticsSession =
          await transaction.analyticsSession.upsert({
            where: {
              sessionKey:
                namespacedSessionKey
            },

            update: {
              lastSeenAt: now
            },

            create: {
              sessionKey:
                namespacedSessionKey,

              lastSeenAt: now
            },

            select: {
              id: true
            }
          });

        const createdEvent =
          await transaction.analyticsEvent.create({
            data: {
              projectId:
                analyticsConfig.projectId,

              sessionId:
                analyticsSession.id,

              type: payload.type,

              path: payload.path,

              entityType:
                payload.entityType,

              entityId:
                payload.entityId ??
                defaultEntityId,

              metadata: {
                ...payload.metadata,

                source:
                  'RCENTZ_TRACKER',

                origin,

                projectDomain:
                  analyticsConfig.project
                    .infrastructure
                    ?.primaryDomain ??
                  null,

                trackingVersion: 1
              }
            },

            select: {
              id: true
            }
          });

        await transaction.projectAnalyticsConfig.update({
          where: {
            id:
              analyticsConfig.id
          },

          data: {
            lastIngestedAt: now,

            ...(analyticsConfig.startedAt
              ? {}
              : {
                  startedAt: now
                })
          }
        });

        return createdEvent;
      }
    );

  return {
    ok: true,
    projectId:
      analyticsConfig.projectId,
    eventId: event.id
  };
}