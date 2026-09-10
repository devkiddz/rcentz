import 'server-only';

type DecimalLike = number | string | { toString(): string };

export type InvoiceApprovalSnapshotItem = {
  id: string;
  type: string;
  name: string;
  description: string | null;
  quantity: number;
  unitPrice: number;
  total: number;
  serviceId: string | null;
  serviceName: string | null;
};

export type InvoiceApprovalSnapshot = {
  schemaVersion: 1;

  invoiceId: string;
  invoiceNumber: string;
  sourceType: string;

  currency: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  amountPaid: number;
  balanceDue: number;

  dueAt: string | null;

  customer: {
    name: string | null;
    email: string | null;
    phone: string | null;
  };

  project: {
    id: string;
    name: string;
  } | null;

  items: InvoiceApprovalSnapshotItem[];

  notes: string | null;
};

type InvoiceForApprovalSnapshot = {
  id: string;
  invoiceNumber: string;
  sourceType: string;

  currency: string;
  subtotal: DecimalLike;
  discount: DecimalLike;
  tax: DecimalLike;
  total: DecimalLike;
  amountPaid: DecimalLike;
  balanceDue: DecimalLike;

  dueAt: Date | null;

  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;

  notes: string | null;

  project: {
    id: string;
    name: string;
  } | null;

  items: Array<{
    id: string;
    type: string;
    name: string;
    description: string | null;
    quantity: DecimalLike;
    unitPrice: DecimalLike;
    total: DecimalLike;
    serviceId: string | null;

    service: {
      name: string;
    } | null;
  }>;
};

function toNumber(value: DecimalLike) {
  const number = Number(value.toString());

  return Number.isFinite(number)
    ? number
    : 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

function readNullableString(value: unknown) {
  return typeof value === 'string'
    ? value
    : value === null
      ? null
      : undefined;
}

function readNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value)
    ? value
    : undefined;
}

export function buildInvoiceApprovalSnapshot(
  invoice: InvoiceForApprovalSnapshot
): InvoiceApprovalSnapshot {
  return {
    schemaVersion: 1,

    invoiceId: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    sourceType: invoice.sourceType,

    currency: invoice.currency,
    subtotal: toNumber(invoice.subtotal),
    discount: toNumber(invoice.discount),
    tax: toNumber(invoice.tax),
    total: toNumber(invoice.total),
    amountPaid: toNumber(invoice.amountPaid),
    balanceDue: toNumber(invoice.balanceDue),

    dueAt: invoice.dueAt?.toISOString() ?? null,

    customer: {
      name: invoice.customerName,
      email: invoice.customerEmail,
      phone: invoice.customerPhone,
    },

    project: invoice.project
      ? {
          id: invoice.project.id,
          name: invoice.project.name,
        }
      : null,

    items: invoice.items.map((item) => {
      return {
        id: item.id,
        type: item.type,
        name: item.name,
        description: item.description,
        quantity: toNumber(item.quantity),
        unitPrice: toNumber(item.unitPrice),
        total: toNumber(item.total),
        serviceId: item.serviceId,
        serviceName: item.service?.name ?? null,
      };
    }),

    notes: invoice.notes,
  };
}

export function parseInvoiceApprovalSnapshot(
  value: unknown
): InvoiceApprovalSnapshot | null {
  if (!isRecord(value)) {
    return null;
  }

  if (value.schemaVersion !== 1) {
    return null;
  }

  if (
    typeof value.invoiceId !== 'string' ||
    typeof value.invoiceNumber !== 'string' ||
    typeof value.sourceType !== 'string' ||
    typeof value.currency !== 'string'
  ) {
    return null;
  }

  const subtotal = readNumber(value.subtotal);
  const discount = readNumber(value.discount);
  const tax = readNumber(value.tax);
  const total = readNumber(value.total);
  const amountPaid = readNumber(value.amountPaid);
  const balanceDue = readNumber(value.balanceDue);

  if (
    subtotal === undefined ||
    discount === undefined ||
    tax === undefined ||
    total === undefined ||
    amountPaid === undefined ||
    balanceDue === undefined
  ) {
    return null;
  }

  const dueAt = readNullableString(value.dueAt);
  const notes = readNullableString(value.notes);

  if (dueAt === undefined || notes === undefined) {
    return null;
  }

  if (!isRecord(value.customer)) {
    return null;
  }

  const customerName = readNullableString(value.customer.name);
  const customerEmail = readNullableString(value.customer.email);
  const customerPhone = readNullableString(value.customer.phone);

  if (
    customerName === undefined ||
    customerEmail === undefined ||
    customerPhone === undefined
  ) {
    return null;
  }

  let project: InvoiceApprovalSnapshot['project'] = null;

  if (value.project !== null) {
    if (
      !isRecord(value.project) ||
      typeof value.project.id !== 'string' ||
      typeof value.project.name !== 'string'
    ) {
      return null;
    }

    project = {
      id: value.project.id,
      name: value.project.name,
    };
  }

  if (!Array.isArray(value.items)) {
    return null;
  }

  const items: InvoiceApprovalSnapshotItem[] = [];

  for (const item of value.items) {
    if (!isRecord(item)) {
      return null;
    }

    const description = readNullableString(item.description);
    const quantity = readNumber(item.quantity);
    const unitPrice = readNumber(item.unitPrice);
    const itemTotal = readNumber(item.total);
    const serviceId = readNullableString(item.serviceId);
    const serviceName = readNullableString(item.serviceName);

    if (
      typeof item.id !== 'string' ||
      typeof item.type !== 'string' ||
      typeof item.name !== 'string' ||
      description === undefined ||
      quantity === undefined ||
      unitPrice === undefined ||
      itemTotal === undefined ||
      serviceId === undefined ||
      serviceName === undefined
    ) {
      return null;
    }

    items.push({
      id: item.id,
      type: item.type,
      name: item.name,
      description,
      quantity,
      unitPrice,
      total: itemTotal,
      serviceId,
      serviceName,
    });
  }

  return {
    schemaVersion: 1,

    invoiceId: value.invoiceId,
    invoiceNumber: value.invoiceNumber,
    sourceType: value.sourceType,

    currency: value.currency,
    subtotal,
    discount,
    tax,
    total,
    amountPaid,
    balanceDue,

    dueAt,

    customer: {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
    },

    project,
    items,
    notes,
  };
}

export function invoiceMatchesApprovalSnapshot(
  invoice: InvoiceForApprovalSnapshot,
  snapshotValue: unknown
) {
  const snapshot = parseInvoiceApprovalSnapshot(snapshotValue);

  if (!snapshot) {
    return false;
  }

  const current = buildInvoiceApprovalSnapshot(invoice);

  if (
    current.invoiceId !== snapshot.invoiceId ||
    current.currency !== snapshot.currency ||
    current.subtotal !== snapshot.subtotal ||
    current.discount !== snapshot.discount ||
    current.tax !== snapshot.tax ||
    current.total !== snapshot.total ||
    current.amountPaid !== snapshot.amountPaid ||
    current.balanceDue !== snapshot.balanceDue ||
    current.dueAt !== snapshot.dueAt ||
    current.items.length !== snapshot.items.length
  ) {
    return false;
  }

  for (let index = 0; index < current.items.length; index += 1) {
    const currentItem = current.items[index];
    const snapshotItem = snapshot.items[index];

    if (
      currentItem.id !== snapshotItem.id ||
      currentItem.type !== snapshotItem.type ||
      currentItem.name !== snapshotItem.name ||
      currentItem.description !== snapshotItem.description ||
      currentItem.quantity !== snapshotItem.quantity ||
      currentItem.unitPrice !== snapshotItem.unitPrice ||
      currentItem.total !== snapshotItem.total
    ) {
      return false;
    }
  }

  return true;
}