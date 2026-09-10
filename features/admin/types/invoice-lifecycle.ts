export type InvoiceLifecycleItemInput = {
  id: string | null;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  serviceId: string | null;
};

export type UpdateAdminInvoiceInput = {
  invoiceId: string;
  clientId: string;
  projectId: string | null;

  currency: string;
  dueAt: string | null;
  discount: number;
  tax: number;
  notes: string;

  revisionTitle: string;
  revisionExplanation: string;

  items: InvoiceLifecycleItemInput[];
};

export type UpdateInvoiceAssociationsInput = {
  invoiceId: string;
  projectId: string | null;

  itemServices: Array<{
    itemId: string;
    serviceId: string | null;
  }>;
};

export type InvoiceMutationResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: string;
    };