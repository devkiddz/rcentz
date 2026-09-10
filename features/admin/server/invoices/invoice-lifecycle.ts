'use server';

import { revalidatePath } from 'next/cache';

import { Prisma } from '@/generated/prisma/client';

import { prisma } from '@/lib/prisma';

import { requireAdmin } from '@/features/auth/server/require-admin';

import {
  createInvoiceApprovalRequest,
} from '@/features/billing/server/invoice-approval-engine';

import type {
  InvoiceLifecycleItemInput,
  InvoiceMutationResult,
  UpdateAdminInvoiceInput,
  UpdateInvoiceAssociationsInput,
} from '@/features/admin/types/invoice-lifecycle';

const supportedCurrencies = [
  'NGN',
  'USD',
  'GBP',
  'EUR',
];

const financiallyRevisableStatuses = [
  'ISSUED',
  'PARTIALLY_PAID',
  'OVERDUE',
];

const unacceptedEditableStatuses = [
  'ISSUED',
  'PARTIALLY_PAID',
  'OVERDUE',
];

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

function decimalToNumber(
  value: { toString(): string } | null | undefined
) {
  if (value === null || value === undefined) {
    return 0;
  }

  const number = Number(value.toString());

  return Number.isFinite(number)
    ? number
    : 0;
}

function normalizeText(value: string) {
  return value.trim();
}

function normalizeNullableText(value: string) {
  const normalized = value.trim();

  return normalized.length > 0
    ? normalized
    : null;
}

function normalizeServiceId(value: string | null) {
  if (!value) {
    return null;
  }

  const normalized = value.trim();

  return normalized.length > 0
    ? normalized
    : null;
}

function parseDueDate(value: string | null) {
  if (!value) {
    return {
      success: true as const,
      value: null,
    };
  }

  const parsed = new Date(`${value}T12:00:00.000Z`);

  if (Number.isNaN(parsed.getTime())) {
    return {
      success: false as const,
      error: 'Enter a valid invoice due date.',
    };
  }

  return {
    success: true as const,
    value: parsed,
  };
}

function sameDate(
  first: Date | null,
  second: Date | null
) {
  if (!first && !second) {
    return true;
  }

  if (!first || !second) {
    return false;
  }

  return first.getTime() === second.getTime();
}

function revalidateInvoice(invoiceId: string) {
  revalidatePath('/admin/invoices');
  revalidatePath(`/admin/invoices/${invoiceId}`);
  revalidatePath(`/admin/invoices/${invoiceId}/edit`);

  revalidatePath('/dashboard/billing');
  revalidatePath(
    `/dashboard/billing/invoices/${invoiceId}`
  );
}

function validateItems(
  items: InvoiceLifecycleItemInput[]
):
  | {
      success: true;
      items: Array<{
        id: string | null;
        name: string;
        description: string | null;
        quantity: number;
        unitPrice: number;
        total: number;
        serviceId: string | null;
      }>;
      subtotal: number;
    }
  | {
      success: false;
      error: string;
    } {
  if (items.length === 0) {
    return {
      success: false,
      error: 'Add at least one invoice item.',
    };
  }

  if (items.length > 50) {
    return {
      success: false,
      error: 'An invoice can contain at most 50 items.',
    };
  }

  const resolvedItems: Array<{
    id: string | null;
    name: string;
    description: string | null;
    quantity: number;
    unitPrice: number;
    total: number;
    serviceId: string | null;
  }> = [];

  for (
    let index = 0;
    index < items.length;
    index += 1
  ) {
    const item = items[index];

    const name = normalizeText(item.name);
    const description =
      normalizeNullableText(item.description);

    const quantity = Number(item.quantity);
    const unitPrice = Number(item.unitPrice);

    if (!name) {
      return {
        success: false,
        error: `Line item ${index + 1} requires a title.`,
      };
    }

    if (name.length > 200) {
      return {
        success: false,
        error: `Line item ${index + 1} title must be 200 characters or fewer.`,
      };
    }

    if (
      description &&
      description.length > 1000
    ) {
      return {
        success: false,
        error: `Line item ${index + 1} description must be 1,000 characters or fewer.`,
      };
    }

    if (
      !Number.isFinite(quantity) ||
      quantity <= 0 ||
      quantity > 100000
    ) {
      return {
        success: false,
        error: `Line item ${index + 1} has an invalid quantity.`,
      };
    }

    if (
      !Number.isFinite(unitPrice) ||
      unitPrice < 0 ||
      unitPrice > 100000000000
    ) {
      return {
        success: false,
        error: `Line item ${index + 1} has an invalid unit price.`,
      };
    }

    const normalizedQuantity =
      Math.round(quantity * 100) / 100;

    const normalizedUnitPrice =
      roundMoney(unitPrice);

    const total = roundMoney(
      normalizedQuantity *
        normalizedUnitPrice
    );

    resolvedItems.push({
      id: item.id?.trim() || null,
      name,
      description,
      quantity: normalizedQuantity,
      unitPrice: normalizedUnitPrice,
      total,
      serviceId:
        normalizeServiceId(item.serviceId),
    });
  }

  const subtotal = roundMoney(
    resolvedItems.reduce((sum, item) => {
      return sum + item.total;
    }, 0)
  );

  return {
    success: true,
    items: resolvedItems,
    subtotal,
  };
}

async function validateAssociations(
  input: {
    clientId: string;
    projectId: string | null;
    serviceIds: string[];
  }
):
  Promise<
    | {
        success: true;
        client: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          clientProfile: {
            companyName: string | null;
            phone: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
          } | null;
        };
      }
    | {
        success: false;
        error: string;
      }
  > {
  const client = await prisma.user.findFirst({
    where: {
      id: input.clientId,
      role: 'CLIENT',
      status: 'ACTIVE',
    },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,

      clientProfile: {
        select: {
          companyName: true,
          phone: true,
          address: true,
          city: true,
          state: true,
          country: true,
        },
      },
    },
  });

  if (!client) {
    return {
      success: false,
      error: 'Select an active client.',
    };
  }

  if (input.projectId) {
    const project = await prisma.project.findFirst({
      where: {
        id: input.projectId,
        clientId: input.clientId,
      },

      select: {
        id: true,
      },
    });

    if (!project) {
      return {
        success: false,
        error:
          'The selected project does not belong to this client.',
      };
    }
  }

  const uniqueServiceIds = [
    ...new Set(input.serviceIds),
  ];

  if (uniqueServiceIds.length > 0) {
    const services = await prisma.service.findMany({
      where: {
        id: {
          in: uniqueServiceIds,
        },
      },

      select: {
        id: true,
      },
    });

    if (
      services.length !==
      uniqueServiceIds.length
    ) {
      return {
        success: false,
        error:
          'One or more selected services no longer exist.',
      };
    }
  }

  return {
    success: true,
    client,
  };
}

function buildBillingAddress(
  client: {
    clientProfile: {
      address: string | null;
      city: string | null;
      state: string | null;
      country: string | null;
    } | null;
  }
) {
  const profile = client.clientProfile;

  if (!profile) {
    return {};
  }

  const address: Record<string, string> = {};

  if (profile.address) {
    address.address = profile.address;
  }

  if (profile.city) {
    address.city = profile.city;
  }

  if (profile.state) {
    address.state = profile.state;
  }

  if (profile.country) {
    address.country = profile.country;
  }

  return address;
}

async function syncInvoiceItems(
  tx: Prisma.TransactionClient,
  input: {
    invoiceId: string;

    existingItems: Array<{
      id: string;
      type: string;
    }>;

    proposedItems: Array<{
      id: string | null;
      name: string;
      description: string | null;
      quantity: number;
      unitPrice: number;
      total: number;
      serviceId: string | null;
    }>;
  }
) {
  const existingById = new Map(
    input.existingItems.map((item) => {
      return [item.id, item];
    })
  );

  const retainedIds: string[] = [];

  for (const item of input.proposedItems) {
    if (item.id) {
      const existing = existingById.get(item.id);

      if (!existing) {
        throw new Error(
          'An invoice item changed before the update could be saved.'
        );
      }

      retainedIds.push(existing.id);

      await tx.invoiceItem.update({
        where: {
          id: existing.id,
        },

        data: {
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.total,
          serviceId: item.serviceId,
        },
      });

      continue;
    }

    const created = await tx.invoiceItem.create({
      data: {
        invoiceId: input.invoiceId,
        type: 'CUSTOM',
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total,
        serviceId: item.serviceId,
      },

      select: {
        id: true,
      },
    });

    retainedIds.push(created.id);
  }

  await tx.invoiceItem.deleteMany({
    where: {
      invoiceId: input.invoiceId,

      id: {
        notIn: retainedIds,
      },
    },
  });
}

function buildRevisionItems(
  currentItems: Array<{
    id: string;
    type: string;
    name: string;
    description: string | null;
    quantity: { toString(): string };
    unitPrice: { toString(): string };
    total: { toString(): string };
    serviceId: string | null;
  }>
) {
  return currentItems.map((item) => {
    return {
      originalId: item.id,
      type: item.type,
      name: item.name,
      description: item.description,
      quantity: decimalToNumber(item.quantity),
      unitPrice: decimalToNumber(item.unitPrice),
      total: decimalToNumber(item.total),
      serviceId: item.serviceId,
    };
  });
}

function buildProposedRevisionItems(
  proposedItems: Array<{
    id: string | null;
    name: string;
    description: string | null;
    quantity: number;
    unitPrice: number;
    total: number;
    serviceId: string | null;
  }>,

  currentItems: Array<{
    id: string;
    type: string;
  }>
) {
  const typeById = new Map(
    currentItems.map((item) => {
      return [item.id, item.type];
    })
  );

  return proposedItems.map((item) => {
    return {
      originalId: item.id,

      type:
        item.id && typeById.has(item.id)
          ? typeById.get(item.id)!
          : 'CUSTOM',

      name: item.name,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.total,
      serviceId: item.serviceId,
    };
  });
}

export async function issueAdminInvoice(
  invoiceId: string
): Promise<InvoiceMutationResult> {
  const admin = await requireAdmin();

  const normalizedInvoiceId =
    invoiceId.trim();

  if (!normalizedInvoiceId) {
    return {
      success: false,
      error: 'Invoice ID is required.',
    };
  }

  const invoice = await prisma.invoice.findUnique({
    where: {
      id: normalizedInvoiceId,
    },

    select: {
      id: true,
      status: true,
      total: true,
      amountPaid: true,

      client: {
        select: {
          id: true,
          status: true,
        },
      },

      _count: {
        select: {
          items: true,
        },
      },
    },
  });

  if (!invoice) {
    return {
      success: false,
      error: 'Invoice not found.',
    };
  }

  if (invoice.status !== 'DRAFT') {
    return {
      success: false,
      error: 'Only a draft invoice can be issued.',
    };
  }

  if (
    !invoice.client ||
    invoice.client.status !== 'ACTIVE'
  ) {
    return {
      success: false,
      error:
        'An active client must be attached before the invoice can be issued.',
    };
  }

  if (invoice._count.items === 0) {
    return {
      success: false,
      error:
        'Add at least one line item before issuing this invoice.',
    };
  }

  const total = decimalToNumber(
    invoice.total
  );

  const amountPaid = decimalToNumber(
    invoice.amountPaid
  );

  if (total <= 0) {
    return {
      success: false,
      error:
        'The invoice must have a positive total before it can be issued.',
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.invoice.update({
        where: {
          id: invoice.id,
        },

        data: {
          status: 'ISSUED',
          issuedAt: new Date(),
          balanceDue: roundMoney(
            total - amountPaid
          ),
        },
      });

      const approval =
        await createInvoiceApprovalRequest(
          tx,
          {
            invoiceId: invoice.id,
            requestedById: admin.id,
          }
        );

      if (!approval.success) {
        throw new Error(approval.error);
      }
    });
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'The invoice could not be issued.',
    };
  }

  revalidateInvoice(invoice.id);

  return {
    success: true,
    message:
      'Invoice issued and sent to the client for verification.',
  };
}

export async function updateAdminInvoice(
  input: UpdateAdminInvoiceInput
): Promise<InvoiceMutationResult> {
  const admin = await requireAdmin();

  const invoiceId =
    input.invoiceId.trim();

  const clientId =
    input.clientId.trim();

  const currency =
    input.currency.trim().toUpperCase();

  const notes =
    normalizeNullableText(input.notes);

  const revisionTitle =
    normalizeText(input.revisionTitle);

  const revisionExplanation =
    normalizeText(
      input.revisionExplanation
    );

  if (!invoiceId) {
    return {
      success: false,
      error: 'Invoice ID is required.',
    };
  }

  if (!clientId) {
    return {
      success: false,
      error: 'Select a client.',
    };
  }

  if (
    !supportedCurrencies.includes(currency)
  ) {
    return {
      success: false,
      error: 'Select a supported currency.',
    };
  }

  const parsedItems =
    validateItems(input.items);

  if (!parsedItems.success) {
    return parsedItems;
  }

  const discount =
    roundMoney(Number(input.discount));

  const tax =
    roundMoney(Number(input.tax));

  if (
    !Number.isFinite(discount) ||
    discount < 0
  ) {
    return {
      success: false,
      error:
        'Discount must be zero or greater.',
    };
  }

  if (
    !Number.isFinite(tax) ||
    tax < 0
  ) {
    return {
      success: false,
      error:
        'Tax must be zero or greater.',
    };
  }

  if (
    discount > parsedItems.subtotal
  ) {
    return {
      success: false,
      error:
        'Discount cannot exceed the subtotal.',
    };
  }

  const total = roundMoney(
    parsedItems.subtotal -
      discount +
      tax
  );

  if (total <= 0) {
    return {
      success: false,
      error:
        'The invoice total must be greater than zero.',
    };
  }

  const dueDate =
    parseDueDate(input.dueAt);

  if (!dueDate.success) {
    return {
      success: false,
      error: dueDate.error,
    };
  }

  const projectId =
    input.projectId?.trim() || null;

  const serviceIds =
    parsedItems.items
      .map((item) => {
        return item.serviceId;
      })
      .filter(
        (value): value is string => {
          return value !== null;
        }
      );

  const associations =
    await validateAssociations({
      clientId,
      projectId,
      serviceIds,
    });

  if (!associations.success) {
    return associations;
  }

  const invoice =
    await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },

      select: {
        id: true,
        invoiceNumber: true,
        status: true,

        clientId: true,
        projectId: true,

        currency: true,
        subtotal: true,
        discount: true,
        tax: true,
        total: true,
        amountPaid: true,
        balanceDue: true,

        notes: true,
        dueAt: true,

        items: {
          orderBy: {
            createdAt: 'asc',
          },

          select: {
            id: true,
            type: true,
            name: true,
            description: true,
            quantity: true,
            unitPrice: true,
            total: true,
            serviceId: true,
          },
        },

        approvals: {
          where: {
            entityType: 'INVOICE',
          },

          orderBy: {
            version: 'desc',
          },

          select: {
            id: true,
            version: true,
            status: true,
          },
        },

        revisions: {
          where: {
            status: {
              in: [
                'PENDING',
                'REJECTED',
              ],
            },
          },

          orderBy: {
            revisionNumber: 'desc',
          },

          select: {
            id: true,
            status: true,
          },
        },
      },
    });

  if (!invoice) {
    return {
      success: false,
      error: 'Invoice not found.',
    };
  }

  const submittedExistingIds =
    parsedItems.items
      .map((item) => {
        return item.id;
      })
      .filter(
        (value): value is string => {
          return value !== null;
        }
      );

  if (
    new Set(submittedExistingIds).size !==
    submittedExistingIds.length
  ) {
    return {
      success: false,
      error:
        'The same invoice item was submitted more than once.',
    };
  }

  const existingItemIds = new Set(
    invoice.items.map((item) => {
      return item.id;
    })
  );

  for (
    const itemId of
    submittedExistingIds
  ) {
    if (!existingItemIds.has(itemId)) {
      return {
        success: false,
        error:
          'One or more invoice items no longer belong to this invoice.',
      };
    }
  }

  if (
    invoice.status !== 'DRAFT' &&
    clientId !== invoice.clientId
  ) {
    return {
      success: false,
      error:
        'The client cannot be changed after an invoice has been issued.',
    };
  }

  const amountPaid =
    decimalToNumber(invoice.amountPaid);

  if (total < amountPaid) {
    return {
      success: false,
      error:
        'The revised invoice total cannot be lower than the amount already paid.',
    };
  }

  const previousSubtotal =
    decimalToNumber(invoice.subtotal);

  const previousDiscount =
    decimalToNumber(invoice.discount);

  const previousTax =
    decimalToNumber(invoice.tax);

  const previousTotal =
    decimalToNumber(invoice.total);

  const previousBalanceDue =
    decimalToNumber(
      invoice.balanceDue
    );

  const proposedBalanceDue =
    roundMoney(total - amountPaid);

  const inputById = new Map(
    parsedItems.items
      .filter((item) => {
        return item.id !== null;
      })
      .map((item) => {
        return [item.id!, item];
      })
  );

  let itemFinancialChange =
    parsedItems.items.length !==
    invoice.items.length;

  let serviceAssociationChange =
    parsedItems.items.length !==
    invoice.items.length;

  if (!itemFinancialChange) {
    for (
      const current of invoice.items
    ) {
      const proposed =
        inputById.get(current.id);

      if (!proposed) {
        itemFinancialChange = true;
        serviceAssociationChange = true;
        break;
      }

      if (
        proposed.name !== current.name ||
        proposed.description !==
          current.description ||
        proposed.quantity !==
          decimalToNumber(
            current.quantity
          ) ||
        proposed.unitPrice !==
          decimalToNumber(
            current.unitPrice
          ) ||
        proposed.total !==
          decimalToNumber(current.total)
      ) {
        itemFinancialChange = true;
      }

      if (
        proposed.serviceId !==
        current.serviceId
      ) {
        serviceAssociationChange = true;
      }
    }
  }

  const financialChange =
    currency !== invoice.currency ||
    parsedItems.subtotal !==
      previousSubtotal ||
    discount !== previousDiscount ||
    tax !== previousTax ||
    total !== previousTotal ||
    !sameDate(
      dueDate.value,
      invoice.dueAt
    ) ||
    itemFinancialChange;

  const projectChange =
    projectId !== invoice.projectId;

  const notesChange =
    notes !== invoice.notes;

  const metadataChange =
    projectChange ||
    notesChange ||
    serviceAssociationChange;

  if (
    !financialChange &&
    !metadataChange &&
    clientId === invoice.clientId
  ) {
    return {
      success: true,
      message:
        'No invoice changes were detected.',
    };
  }

  if (
    financialChange &&
    currency !== invoice.currency &&
    amountPaid > 0
  ) {
    return {
      success: false,
      error:
        'Invoice currency cannot be changed after a payment has been received.',
    };
  }

  const acceptedApproval =
    invoice.approvals.find(
      (approval) => {
        return (
          approval.status ===
          'ACCEPTED'
        );
      }
    ) ?? null;

  const pendingApproval =
    invoice.approvals.find(
      (approval) => {
        return (
          approval.status ===
          'PENDING'
        );
      }
    ) ?? null;

  const unresolvedRevision =
    invoice.revisions[0] ?? null;

  const client =
    associations.client;

  const customerName =
    client.clientProfile
      ?.companyName ??
    client.name;

  const customerPhone =
    client.clientProfile?.phone ??
    client.phone;

  const billingAddress =
    buildBillingAddress(client);

  /*
   * DRAFT
   * No agreement exists yet.
   * Direct mutation is allowed.
   */
  if (invoice.status === 'DRAFT') {
    try {
      await prisma.$transaction(
        async (tx) => {
          await tx.invoice.update({
            where: {
              id: invoice.id,
            },

            data: {
              clientId,
              projectId,

              currency,
              subtotal:
                parsedItems.subtotal,
              discount,
              tax,
              total,
              balanceDue:
                proposedBalanceDue,

              customerName,
              customerEmail:
                client.email,
              customerPhone,

              billingAddress:
                billingAddress as Prisma.InputJsonValue,

              notes,
              dueAt: dueDate.value,
            },
          });

          await syncInvoiceItems(tx, {
            invoiceId: invoice.id,

            existingItems:
              invoice.items.map(
                (item) => {
                  return {
                    id: item.id,
                    type: item.type,
                  };
                }
              ),

            proposedItems:
              parsedItems.items,
          });
        }
      );
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'The draft invoice could not be updated.',
      };
    }

    revalidateInvoice(invoice.id);

    return {
      success: true,
      message:
        'Draft invoice updated.',
    };
  }

  /*
   * ISSUED BUT NOT YET ACCEPTED
   *
   * This is still the original offer.
   * We do NOT create InvoiceRevision.
   *
   * Instead:
   * - cancel stale pending approval
   * - directly update invoice
   * - create a fresh approval version
   */
  if (!acceptedApproval) {
    if (
      !unacceptedEditableStatuses.includes(
        invoice.status
      )
    ) {
      return {
        success: false,
        error:
          'This invoice can no longer be edited before agreement.',
      };
    }

    if (unresolvedRevision) {
      return {
        success: false,
        error:
          'Resolve the existing invoice revision before editing the original agreement.',
      };
    }

    try {
      await prisma.$transaction(
        async (tx) => {
          if (pendingApproval) {
            await tx.clientApproval.updateMany({
              where: {
                id: pendingApproval.id,
                status: 'PENDING',
              },

              data: {
                status: 'CANCELLED',
                cancelledById:
                  admin.id,
                cancelledAt:
                  new Date(),
              },
            });
          }

          await tx.invoice.update({
            where: {
              id: invoice.id,
            },

            data: {
              projectId,

              currency,
              subtotal:
                parsedItems.subtotal,
              discount,
              tax,
              total,
              balanceDue:
                proposedBalanceDue,

              notes,
              dueAt: dueDate.value,
            },
          });

          await syncInvoiceItems(tx, {
            invoiceId: invoice.id,

            existingItems:
              invoice.items.map(
                (item) => {
                  return {
                    id: item.id,
                    type: item.type,
                  };
                }
              ),

            proposedItems:
              parsedItems.items,
          });

          const approval =
            await createInvoiceApprovalRequest(
              tx,
              {
                invoiceId:
                  invoice.id,
                requestedById:
                  admin.id,
              }
            );

          if (!approval.success) {
            throw new Error(
              approval.error
            );
          }
        }
      );
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'The invoice could not be updated.',
      };
    }

    revalidateInvoice(invoice.id);

    return {
      success: true,
      message:
        'Invoice updated and a new verification request was sent to the client.',
    };
  }

  /*
   * CLIENT HAS ALREADY ACCEPTED ORIGINAL AGREEMENT
   *
   * Metadata may change directly.
   * Financial/client-facing changes require InvoiceRevision.
   */
  if (!financialChange) {
    try {
      await prisma.$transaction(
        async (tx) => {
          await tx.invoice.update({
            where: {
              id: invoice.id,
            },

            data: {
              projectId,
              notes,
            },
          });

          for (
            const proposed of
            parsedItems.items
          ) {
            if (!proposed.id) {
              continue;
            }

            await tx.invoiceItem.update({
              where: {
                id: proposed.id,
              },

              data: {
                serviceId:
                  proposed.serviceId,
              },
            });
          }
        }
      );
    } catch {
      return {
        success: false,
        error:
          'The invoice associations could not be updated.',
      };
    }

    revalidateInvoice(invoice.id);

    return {
      success: true,
      message:
        'Invoice associations updated.',
    };
  }

  if (
    !financiallyRevisableStatuses.includes(
      invoice.status
    )
  ) {
    if (invoice.status === 'PAID') {
      return {
        success: false,
        error:
          'Paid invoice financial values are locked. Use a refund or credit workflow for financial corrections.',
      };
    }

    return {
      success: false,
      error:
        'This invoice can no longer receive financial revisions.',
    };
  }

  if (unresolvedRevision) {
    return {
      success: false,
      error:
        unresolvedRevision.status ===
        'REJECTED'
          ? 'The rejected payment update must be closed before another revision can be proposed.'
          : 'The client already has a payment update awaiting review.',
    };
  }

  if (!revisionTitle) {
    return {
      success: false,
      error:
        'Enter a title for the payment update.',
    };
  }

  if (revisionTitle.length > 200) {
    return {
      success: false,
      error:
        'Payment update title must be 200 characters or fewer.',
    };
  }

  if (!revisionExplanation) {
    return {
      success: false,
      error:
        'Explain why the invoice payment terms are changing.',
    };
  }

  if (
    revisionExplanation.length > 3000
  ) {
    return {
      success: false,
      error:
        'Payment update explanation must be 3,000 characters or fewer.',
    };
  }

  const latestRevision =
    await prisma.invoiceRevision.findFirst({
      where: {
        invoiceId: invoice.id,
      },

      orderBy: {
        revisionNumber: 'desc',
      },

      select: {
        revisionNumber: true,
      },
    });

  const revisionNumber =
    (latestRevision?.revisionNumber ?? 0) +
    1;

  const previousItems =
    buildRevisionItems(
      invoice.items
    );

  const proposedItems =
    buildProposedRevisionItems(
      parsedItems.items,
      invoice.items
    );

  try {
    await prisma.$transaction(
      async (tx) => {
        /*
         * Project, notes and service associations
         * remain classification/context metadata,
         * so they may update immediately.
         */
        await tx.invoice.update({
          where: {
            id: invoice.id,
          },

          data: {
            projectId,
            notes,
          },
        });

        for (
          const proposed of
          parsedItems.items
        ) {
          if (!proposed.id) {
            continue;
          }

          await tx.invoiceItem.update({
            where: {
              id: proposed.id,
            },

            data: {
              serviceId:
                proposed.serviceId,
            },
          });
        }

        const revision =
          await tx.invoiceRevision.create({
            data: {
              invoiceId: invoice.id,
              revisionNumber,

              title:
                revisionTitle,
              explanation:
                revisionExplanation,

              previousCurrency:
                invoice.currency,
              proposedCurrency:
                currency,

              previousSubtotal,
              proposedSubtotal:
                parsedItems.subtotal,

              previousDiscount,
              proposedDiscount:
                discount,

              previousTax,
              proposedTax: tax,

              previousTotal,
              proposedTotal: total,

              amountPaidAtProposal:
                amountPaid,

              previousBalanceDue,
              proposedBalanceDue,

              previousDueAt:
                invoice.dueAt,
              proposedDueAt:
                dueDate.value,

              previousItems:
                previousItems as Prisma.InputJsonValue,

              proposedItems:
                proposedItems as Prisma.InputJsonValue,

              proposedById:
                admin.id,
            },

            select: {
              id: true,
            },
          });

        if (invoice.clientId) {
          await tx.notification.create({
            data: {
              userId:
                invoice.clientId,

              type: 'INVOICE',

              title:
                'Invoice payment update',

              message:
                `${invoice.invoiceNumber} has a payment update that requires your review.`,

              href:
                `/dashboard/billing/invoices/${invoice.id}`,

              entityType:
                'INVOICE_REVISION',

              entityId:
                revision.id,

              metadata: {
                invoiceId:
                  invoice.id,
                revisionId:
                  revision.id,
                revisionNumber,
              },
            },
          });
        }
      }
    );
  } catch {
    return {
      success: false,
      error:
        'The payment update could not be created.',
    };
  }

  revalidateInvoice(invoice.id);

  return {
    success: true,
    message:
      'Payment update sent to the client for approval.',
  };
}

export async function updateAdminInvoiceAssociations(
  input: UpdateInvoiceAssociationsInput
): Promise<InvoiceMutationResult> {
  await requireAdmin();

  const invoiceId =
    input.invoiceId.trim();

  if (!invoiceId) {
    return {
      success: false,
      error: 'Invoice ID is required.',
    };
  }

  const invoice =
    await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },

      select: {
        id: true,
        clientId: true,

        items: {
          select: {
            id: true,
          },
        },
      },
    });

  if (!invoice) {
    return {
      success: false,
      error: 'Invoice not found.',
    };
  }

  const projectId =
    input.projectId?.trim() || null;

  if (projectId) {
    const project =
      await prisma.project.findUnique({
        where: {
          id: projectId,
        },

        select: {
          id: true,
          clientId: true,
        },
      });

    if (!project) {
      return {
        success: false,
        error:
          'The selected project no longer exists.',
      };
    }

    if (
      invoice.clientId &&
      project.clientId &&
      project.clientId !==
        invoice.clientId
    ) {
      return {
        success: false,
        error:
          'The selected project belongs to another client.',
      };
    }
  }

  const invoiceItemIds = new Set(
    invoice.items.map((item) => {
      return item.id;
    })
  );

  for (
    const association of
    input.itemServices
  ) {
    if (
      !invoiceItemIds.has(
        association.itemId
      )
    ) {
      return {
        success: false,
        error:
          'One or more invoice items no longer belong to this invoice.',
      };
    }
  }

  const serviceIds = [
    ...new Set(
      input.itemServices
        .map((association) => {
          return (
            association.serviceId
              ?.trim() || null
          );
        })
        .filter(
          (value): value is string => {
            return value !== null;
          }
        )
    ),
  ];

  if (serviceIds.length > 0) {
    const services =
      await prisma.service.findMany({
        where: {
          id: {
            in: serviceIds,
          },
        },

        select: {
          id: true,
        },
      });

    if (
      services.length !==
      serviceIds.length
    ) {
      return {
        success: false,
        error:
          'One or more selected services no longer exist.',
      };
    }
  }

  await prisma.$transaction(
    async (tx) => {
      await tx.invoice.update({
        where: {
          id: invoice.id,
        },

        data: {
          projectId,
        },
      });

      for (
        const association of
        input.itemServices
      ) {
        await tx.invoiceItem.update({
          where: {
            id: association.itemId,
          },

          data: {
            serviceId:
              association.serviceId
                ?.trim() ||
              null,
          },
        });
      }
    }
  );

  revalidateInvoice(invoice.id);

  return {
    success: true,
    message:
      'Invoice associations updated.',
  };
}

export async function cancelAdminInvoiceRevision(
  revisionId: string
): Promise<InvoiceMutationResult> {
  const admin = await requireAdmin();

  const normalizedRevisionId =
    revisionId.trim();

  if (!normalizedRevisionId) {
    return {
      success: false,
      error: 'Revision ID is required.',
    };
  }

  const revision =
    await prisma.invoiceRevision.findUnique({
      where: {
        id: normalizedRevisionId,
      },

      select: {
        id: true,
        status: true,

        invoice: {
          select: {
            id: true,
            invoiceNumber: true,
            clientId: true,
          },
        },
      },
    });

  if (!revision) {
    return {
      success: false,
      error:
        'Invoice payment update not found.',
    };
  }

  if (
    revision.status !== 'PENDING' &&
    revision.status !== 'REJECTED'
  ) {
    return {
      success: false,
      error:
        'Only a pending or rejected payment update can be closed.',
    };
  }

  const result =
    await prisma.invoiceRevision.updateMany({
      where: {
        id: revision.id,

        status: {
          in: [
            'PENDING',
            'REJECTED',
          ],
        },
      },

      data: {
        status: 'CANCELLED',
        cancelledById: admin.id,
        cancelledAt: new Date(),
      },
    });

  if (result.count !== 1) {
    return {
      success: false,
      error:
        'The payment update changed before it could be closed.',
    };
  }

  if (revision.invoice.clientId) {
    await prisma.notification.create({
      data: {
        userId:
          revision.invoice.clientId,

        type: 'INVOICE',

        title:
          'Invoice payment update closed',

        message:
          `${revision.invoice.invoiceNumber} will continue using its currently accepted billing terms.`,

        href:
          `/dashboard/billing/invoices/${revision.invoice.id}`,

        entityType:
          'INVOICE_REVISION',

        entityId:
          revision.id,
      },
    });
  }

  revalidateInvoice(
    revision.invoice.id
  );

  return {
    success: true,
    message:
      'Payment update closed. The accepted invoice remains authoritative.',
  };
}