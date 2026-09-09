import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

const clientVisible = [
  'CLIENT',
  'PUBLIC'
] as const;

const activeProjectStatuses = [
  'PLANNING',
  'DISCOVERY',
  'DESIGN',
  'DEVELOPMENT',
  'TESTING',
  'REVIEW',
  'DEPLOYMENT',
  'MAINTENANCE'
] as const;

function decimalToNumber(
  value:
    | {
        toString(): string;
      }
    | null
    | undefined
) {
  if (
    value === null ||
    value === undefined
  ) {
    return 0;
  }

  const number =
    Number(
      value.toString()
    );

  return Number.isFinite(number)
    ? number
    : 0;
}

export const getClientDashboardIdentity =
  cache(
    async (
      userId: string
    ) => {
      const projects =
        await prisma.project.findMany({
          where: {
            clientId:
              userId
          },

          select: {
            status: true,
            currency: true,

            analyticsConfig: {
              select: {
                status: true,
                clientVisible:
                  true
              }
            },

            processes: {
              where: {
                visibility: {
                  in: [
                    ...clientVisible
                  ]
                },

                status: {
                  in: [
                    'PENDING',
                    'IN_PROGRESS'
                  ]
                },

                requiresClientAction:
                  true
              },

              select: {
                id: true
              }
            },

            supportTickets: {
              where: {
                visibility: {
                  in: [
                    ...clientVisible
                  ]
                },

                status: {
                  in: [
                    'OPEN',
                    'IN_PROGRESS',
                    'WAITING_FOR_CLIENT',
                    'WAITING_FOR_STAFF'
                  ]
                }
              },

              select: {
                id: true
              }
            },

            invoices: {
              where: {
                status: {
                  notIn: [
                    'DRAFT',
                    'VOID',
                    'CANCELLED'
                  ]
                }
              },

              select: {
                currency:
                  true,

                balanceDue:
                  true
              }
            }
          }
        });

      const activeProjects =
        projects.filter(
          project =>
            (
              activeProjectStatuses as readonly string[]
            ).includes(
              String(
                project.status
              )
            )
        ).length;

      const actionRequired =
        projects.reduce(
          (
            total,
            project
          ) =>
            total +
            project.processes
              .length,
          0
        );

      const openSupport =
        projects.reduce(
          (
            total,
            project
          ) =>
            total +
            project
              .supportTickets
              .length,
          0
        );

      const allInvoices =
        projects.flatMap(
          project =>
            project.invoices
        );

      const currency =
        allInvoices[0]
          ?.currency ??
        projects[0]
          ?.currency ??
        'NGN';

      const outstanding =
        allInvoices
          .filter(
            invoice =>
              invoice.currency ===
              currency
          )
          .reduce(
            (
              total,
              invoice
            ) =>
              total +
              decimalToNumber(
                invoice.balanceDue
              ),
            0
          );

      const managedSites =
        projects.filter(
          project =>
            project
              .analyticsConfig
              ?.clientVisible ===
              true &&
            project
              .analyticsConfig
              ?.status ===
              'ACTIVE'
        ).length;

      return {
        activeProjects,
        actionRequired,
        openSupport,
        outstanding,
        managedSites,
        currency
      };
    }
  );

export type ClientDashboardIdentity =
  Awaited<
    ReturnType<
      typeof getClientDashboardIdentity
    >
  >;