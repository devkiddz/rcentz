import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

const supportedEventTypes = new Set([
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
]);

type ProjectAnalyticsEventBody = {
  projectId?: string;
  sessionKey?: string;
  type?: string;
  path?: string;
  metadata?: Record<string, unknown>;
};

function createCorsHeaders(origin: string | null) {
  return {
    'Access-Control-Allow-Origin': origin ?? '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin'
  };
}

export async function OPTIONS(
  request: NextRequest
) {
  return new NextResponse(null, {
    status: 204,
    headers: createCorsHeaders(
      request.headers.get('origin')
    )
  });
}

export async function POST(
  request: NextRequest
) {
  const origin =
    request.headers.get('origin');

  const corsHeaders =
    createCorsHeaders(origin);

  let body: ProjectAnalyticsEventBody;

  try {
    body =
      (await request.json()) as ProjectAnalyticsEventBody;
  } catch {
    return NextResponse.json(
      {
        error: 'Invalid request body.'
      },
      {
        status: 400,
        headers: corsHeaders
      }
    );
  }

  const projectId =
    body.projectId?.trim();

  const sessionKey =
    body.sessionKey?.trim();

  const eventType =
    body.type?.trim();

  if (
    !projectId ||
    !sessionKey ||
    !eventType
  ) {
    return NextResponse.json(
      {
        error:
          'projectId, sessionKey and type are required.'
      },
      {
        status: 400,
        headers: corsHeaders
      }
    );
  }

  if (
    !supportedEventTypes.has(
      eventType
    )
  ) {
    return NextResponse.json(
      {
        error:
          'Unsupported analytics event type.'
      },
      {
        status: 400,
        headers: corsHeaders
      }
    );
  }

  const project =
    await prisma.project.findUnique({
      where: {
        id: projectId
      },

      select: {
        id: true,

        infrastructure: {
          select: {
            primaryDomain: true
          }
        }
      }
    });

  if (!project) {
    return NextResponse.json(
      {
        error: 'Project not found.'
      },
      {
        status: 404,
        headers: corsHeaders
      }
    );
  }

  const analyticsSession =
    await prisma.analyticsSession.upsert({
      where: {
        sessionKey
      },

      update: {
        lastSeenAt: new Date()
      },

      create: {
        sessionKey,
        lastSeenAt: new Date()
      },

      select: {
        id: true
      }
    });

  await prisma.analyticsEvent.create({
    data: {
      sessionId:
        analyticsSession.id,

      type:
        eventType as
          | 'PAGE_VIEW'
          | 'PROJECT_VIEW'
          | 'PRODUCT_VIEW'
          | 'SERVICE_VIEW'
          | 'SEARCH'
          | 'CLICK'
          | 'REACTION'
          | 'COMMENT'
          | 'SHARE'
          | 'DOWNLOAD'
          | 'ADD_TO_CART'
          | 'REMOVE_FROM_CART'
          | 'CHECKOUT_STARTED'
          | 'PURCHASE'
          | 'SERVICE_REQUEST'
          | 'SIGN_UP'
          | 'LOGIN'
          | 'OTHER',

      path:
        body.path?.trim() ||
        null,

      entityType: 'PROJECT',
      entityId: project.id,

      metadata: {
        ...body.metadata,

        source: 'RCENTZ_TRACKER',

        origin:
          origin ?? null,

        projectDomain:
          project.infrastructure
            ?.primaryDomain ?? null
      }
    }
  });

  return NextResponse.json(
    {
      accepted: true
    },
    {
      status: 202,
      headers: corsHeaders
    }
  );
}