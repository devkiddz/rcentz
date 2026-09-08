import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

const clientVisible = ['CLIENT', 'PUBLIC'] as const;

export const getClientOverview = cache(
  async (userId: string) => {
    const projects = await prisma.project.findMany({
      where: {
        clientId: userId
      },

      orderBy: {
        updatedAt: 'desc'
      },

      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        purpose: true,
        vision: true,
        expectedOutcome: true,

        type: true,
        status: true,
        progress: true,
        budget: true,
        currency: true,

        startedAt: true,
        expectedEndAt: true,
        completedAt: true,
        createdAt: true,
        updatedAt: true,

        portfolio: {
          select: {
            tagline: true,
            summary: true,
            liveUrl: true,
            repositoryUrl: true
          }
        },

        technologies: {
          orderBy: [
            {
              featured: 'desc'
            },
            {
              sortOrder: 'asc'
            }
          ],

          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
            category: true,
            description: true,
            purpose: true,
            rationale: true,
            featured: true,
            sortOrder: true
          }
        },

        deliverables: {
          where: {
            visibility: {
              in: [...clientVisible]
            }
          },

          orderBy: [
            {
              sortOrder: 'asc'
            },
            {
              dueDate: 'asc'
            }
          ],

          select: {
            id: true,
            milestoneId: true,

            title: true,
            slug: true,
            type: true,

            summary: true,
            description: true,
            agreementSummary: true,
            rationale: true,
            expectedOutcome: true,

            status: true,
            progress: true,

            originalDueDate: true,
            dueDate: true,
            deliveredAt: true,
            acceptedAt: true,

            extensionReason: true,
            completionNotes: true,

            _count: {
              select: {
                files: true,
                processes: true
              }
            }
          }
        },

        milestones: {
          where: {
            visibility: {
              in: [...clientVisible]
            }
          },

          orderBy: [
            {
              sortOrder: 'asc'
            },
            {
              dueDate: 'asc'
            }
          ],

          select: {
            id: true,
            title: true,
            slug: true,

            description: true,
            purpose: true,
            expectedOutcome: true,

            status: true,
            priority: true,
            progress: true,

            startedAt: true,
            dueDate: true,
            completedAt: true,

            completionNotes: true,

            _count: {
              select: {
                deliverables: true,
                features: true,
                files: true,
                processes: true
              }
            }
          }
        },

        processes: {
          where: {
            visibility: {
              in: [...clientVisible]
            },

            status: {
              in: ['PENDING', 'IN_PROGRESS']
            }
          },

          orderBy: [
            {
              blocking: 'desc'
            },
            {
              requiresClientAction: 'desc'
            },
            {
              dueAt: 'asc'
            },
            {
              sortOrder: 'asc'
            }
          ],

          select: {
            id: true,

            type: true,
            status: true,

            title: true,
            description: true,
            reason: true,
            impact: true,

            blocking: true,
            requiresClientAction: true,

            dueAt: true,
            resolvedAt: true,

            milestone: {
              select: {
                id: true,
                title: true
              }
            },

            deliverable: {
              select: {
                id: true,
                title: true
              }
            },

            invoice: {
              select: {
                id: true,
                invoiceNumber: true,
                status: true,
                currency: true,
                total: true,
                amountPaid: true,
                balanceDue: true,
                dueAt: true
              }
            },

            subscription: {
              select: {
                id: true,
                subscriptionNumber: true,
                status: true,
                priceAmount: true,
                currency: true,
                intervalUnit: true,
                intervalCount: true,
                nextBillingAt: true,
                currentPeriodEnd: true
              }
            }
          }
        },

        invoices: {
          orderBy: [
            {
              dueAt: 'asc'
            },
            {
              createdAt: 'desc'
            }
          ],

          select: {
            id: true,
            invoiceNumber: true,
            sourceType: true,
            status: true,

            currency: true,
            subtotal: true,
            discount: true,
            tax: true,
            total: true,
            amountPaid: true,
            balanceDue: true,

            issuedAt: true,
            dueAt: true,
            paidAt: true,

            notes: true,

            items: {
              orderBy: {
                createdAt: 'asc'
              },

              select: {
                id: true,
                type: true,
                name: true,
                description: true,
                quantity: true,
                unitPrice: true,
                total: true
              }
            },

            payments: {
              where: {
                status: 'SUCCESS'
              },

              orderBy: {
                paidAt: 'desc'
              },

              select: {
                id: true,
                amount: true,
                currency: true,
                method: true,
                provider: true,
                paidAt: true
              }
            }
          }
        },

        subscription: {
          select: {
            id: true,
            subscriptionNumber: true,
            status: true,

            priceAmount: true,
            currency: true,
            intervalUnit: true,
            intervalCount: true,
            setupFee: true,

            autoRenew: true,
            cancelAtPeriodEnd: true,

            currentPeriodStart: true,
            currentPeriodEnd: true,
            nextBillingAt: true,
            trialEndsAt: true,
            startedAt: true,
            pausedAt: true,
            cancelledAt: true,
            endedAt: true,

            plan: {
              select: {
                id: true,
                name: true,
                slug: true,
                shortDescription: true
              }
            },

            entitlements: {
              orderBy: {
                createdAt: 'asc'
              },

              select: {
                id: true,
                key: true,
                name: true,
                description: true,
                limitValue: true,
                usedValue: true,
                unit: true,
                unlimited: true,
                usageResetAt: true
              }
            }
          }
        },

        supportTickets: {
          where: {
            visibility: {
              in: [...clientVisible]
            }
          },

          orderBy: [
            {
              createdAt: 'desc'
            }
          ],

          select: {
            id: true,
            ticketNumber: true,

            type: true,
            subject: true,
            description: true,

            status: true,
            priority: true,

            createdAt: true,
            updatedAt: true,
            resolvedAt: true,
            closedAt: true
          }
        },

        updates: {
          where: {
            visibility: {
              in: [...clientVisible]
            }
          },

          orderBy: {
            createdAt: 'desc'
          },

          take: 5,

          select: {
            id: true,
            title: true,
            description: true,
            type: true,
            progress: true,
            createdAt: true,

            milestone: {
              select: {
                id: true,
                title: true
              }
            },

            feature: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },

        activities: {
          where: {
            visibility: {
              in: [...clientVisible]
            }
          },

          orderBy: {
            createdAt: 'desc'
          },

          take: 8,

          select: {
            id: true,
            type: true,
            title: true,
            description: true,
            createdAt: true
          }
        },

        _count: {
          select: {
            deliverables: true,
            milestones: true,
            features: true,
            tasks: true,
            updates: true,
            files: true,
            supportTickets: true
          }
        }
      }
    });

    const currentProject =
      projects[0] ?? null;

    if (!currentProject) {
      return {
        projects,
        projectCount: 0,
        currentProject: null,
        financialSummary: null,
        attentionCount: 0,
        openTicketCount: 0
      };
    }

    const financialSummary =
      currentProject.invoices.reduce(
        (summary, invoice) => {
          summary.total += Number(invoice.total);
          summary.paid += Number(invoice.amountPaid);
          summary.outstanding += Number(
            invoice.balanceDue
          );

          return summary;
        },
        {
          total: 0,
          paid: 0,
          outstanding: 0,
          currency: currentProject.currency
        }
      );

    const attentionCount =
      currentProject.processes.filter(
        process =>
          process.blocking ||
          process.requiresClientAction
      ).length;

    const openTicketCount =
      currentProject.supportTickets.filter(
        ticket =>
          ticket.status !== 'RESOLVED' &&
          ticket.status !== 'CLOSED' &&
          ticket.status !== 'CANCELLED'
      ).length;

    return {
      projects,
      projectCount: projects.length,
      currentProject,
      financialSummary,
      attentionCount,
      openTicketCount
    };
  }
);

export type ClientOverviewData =
  Awaited<ReturnType<typeof getClientOverview>>;

export type ClientOverviewProject =
  NonNullable<ClientOverviewData['currentProject']>;
