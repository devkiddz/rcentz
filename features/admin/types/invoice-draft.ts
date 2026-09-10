export type InvoiceDraftItemType =
  | 'PRODUCT'
  | 'SERVICE'
  | 'PLAN'
  | 'PROJECT'
  | 'CUSTOM';


export type InvoiceDraftItem = {
  id: string;
  type: InvoiceDraftItemType;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
};


export type CreateInvoiceDraftInput = {
  clientId: string;
  currency: string;
  dueAt: string | null;
  discount: number;
  tax: number;
  notes: string;

  items: Array<{
    type: InvoiceDraftItemType;
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
};


export type CreateInvoiceDraftResult =
  | {
      success: true;
      invoiceId: string;
    }
  | {
      success: false;
      error: string;
    };