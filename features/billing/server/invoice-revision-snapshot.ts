import 'server-only';

export type InvoiceRevisionSnapshotItemType =
  | 'PRODUCT'
  | 'SERVICE'
  | 'PLAN'
  | 'PROJECT'
  | 'CUSTOM'
  | 'CREDIT'
  | 'DISCOUNT';

export type InvoiceRevisionSnapshotItem = {
  originalId: string | null;
  type: InvoiceRevisionSnapshotItemType;
  name: string;
  description: string | null;
  quantity: number;
  unitPrice: number;
  total: number;
  serviceId: string | null;
};

const invoiceItemTypes: InvoiceRevisionSnapshotItemType[] = [
  'PRODUCT',
  'SERVICE',
  'PLAN',
  'PROJECT',
  'CUSTOM',
  'CREDIT',
  'DISCOUNT',
];

function isInvoiceItemType(
  value: unknown
): value is InvoiceRevisionSnapshotItemType {
  return (
    typeof value === 'string' &&
    invoiceItemTypes.includes(
      value as InvoiceRevisionSnapshotItemType
    )
  );
}

export function parseInvoiceRevisionItems(
  value: unknown
): InvoiceRevisionSnapshotItem[] | null {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  const items: InvoiceRevisionSnapshotItem[] = [];

  for (const rawItem of value) {
    if (!rawItem || typeof rawItem !== 'object') {
      return null;
    }

    const item = rawItem as Record<string, unknown>;

    const originalId =
      typeof item.originalId === 'string' &&
      item.originalId.trim().length > 0
        ? item.originalId.trim()
        : null;

    const name =
      typeof item.name === 'string'
        ? item.name.trim()
        : '';

    const description =
      typeof item.description === 'string'
        ? item.description.trim()
        : '';

    const serviceId =
      typeof item.serviceId === 'string' &&
      item.serviceId.trim().length > 0
        ? item.serviceId.trim()
        : null;

    const quantity = Number(item.quantity);
    const unitPrice = Number(item.unitPrice);
    const total = Number(item.total);

    if (!isInvoiceItemType(item.type)) {
      return null;
    }

    if (!name) {
      return null;
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      return null;
    }

    if (!Number.isFinite(unitPrice) || unitPrice < 0) {
      return null;
    }

    if (!Number.isFinite(total) || total < 0) {
      return null;
    }

    items.push({
      originalId,
      type: item.type,
      name,
      description: description || null,
      quantity,
      unitPrice,
      total,
      serviceId,
    });
  }

  return items;
}