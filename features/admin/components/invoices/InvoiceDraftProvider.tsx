'use client';

import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

import type { InvoiceDraftItem, InvoiceDraftItemType } from '@/features/admin/types/invoice-draft';

type InvoiceDraftContextValue = {
  clientId: string;
  currency: string;
  dueAt: string;
  discount: number;
  tax: number;
  notes: string;
  items: InvoiceDraftItem[];

  subtotal: number;
  total: number;

  setClientId: (value: string) => void;
  setCurrency: (value: string) => void;
  setDueAt: (value: string) => void;
  setDiscount: (value: number) => void;
  setTax: (value: number) => void;
  setNotes: (value: string) => void;

  addItem: () => void;
  removeItem: (itemId: string) => void;
  updateItem: (itemId: string, values: Partial<InvoiceDraftItem>) => void;
};

const InvoiceDraftContext = createContext<InvoiceDraftContextValue | null>(null);

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

function createInitialItem(): InvoiceDraftItem {
  return {
    id: 'item-1',
    type: 'CUSTOM',
    name: '',
    description: '',
    quantity: 1,
    unitPrice: 0
  };
}

export function InvoiceDraftProvider({ children }: { children: ReactNode }) {
  const itemCounter = useRef(1);

  const [clientId, setClientId] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const [dueAt, setDueAt] = useState('');
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [notes, setNotes] = useState('');

  const [items, setItems] = useState<InvoiceDraftItem[]>([createInitialItem()]);

  const subtotal = useMemo(() => {
    let amount = 0;

    for (const item of items) {
      const lineTotal = item.quantity * item.unitPrice;
      amount += lineTotal;
    }

    return roundMoney(amount);
  }, [items]);

  const total = useMemo(() => {
    const amount = subtotal - Math.max(discount, 0) + Math.max(tax, 0);

    return Math.max(roundMoney(amount), 0);
  }, [subtotal, discount, tax]);

  function addItem() {
    itemCounter.current += 1;

    const newItem: InvoiceDraftItem = {
      id: `item-${itemCounter.current}`,
      type: 'CUSTOM',
      name: '',
      description: '',
      quantity: 1,
      unitPrice: 0
    };

    setItems(currentItems => {
      return [...currentItems, newItem];
    });
  }

  function removeItem(itemId: string) {
    setItems(currentItems => {
      if (currentItems.length === 1) {
        return currentItems;
      }

      return currentItems.filter(item => {
        return item.id !== itemId;
      });
    });
  }

  function updateItem(itemId: string, values: Partial<InvoiceDraftItem>) {
    setItems(currentItems => {
      return currentItems.map(item => {
        if (item.id !== itemId) {
          return item;
        }

        return {
          ...item,
          ...values
        };
      });
    });
  }

  const value: InvoiceDraftContextValue = {
    clientId,
    currency,
    dueAt,
    discount,
    tax,
    notes,
    items,

    subtotal,
    total,

    setClientId,
    setCurrency,
    setDueAt,
    setDiscount,
    setTax,
    setNotes,

    addItem,
    removeItem,
    updateItem
  };

  return <InvoiceDraftContext.Provider value={value}>{children}</InvoiceDraftContext.Provider>;
}

export function useInvoiceDraft() {
  const context = useContext(InvoiceDraftContext);

  if (!context) {
    throw new Error('useInvoiceDraft must be used inside InvoiceDraftProvider.');
  }

  return context;
}
