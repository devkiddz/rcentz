import Link from 'next/link';

import {
  ArrowRight,
  Banknote,
  CalendarClock,
  CircleDollarSign,
  CreditCard,
  ReceiptText,
  RefreshCcw,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  WalletCards
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import type {
  FinanceOverview,
  FinancePayment,
  FinanceReceivable,
  FinanceSubscription
} from '@/features/admin/server/overview/get-finance-overview';

type AdminFinanceOverviewProps = {
  finance: FinanceOverview;
};

const previewFinance = {
  currency: 'NGN',

  summary: {
    grossRevenue: 2850000,
    netRevenue: 2764500,
    feesDeducted: 85500,
    outstandingAmount: 1240000,
    overdueAmount: 450000,
    outstandingInvoices: 3
  },

  paymentSummary: {
    total: 4,
    successful: 2,
    pending: 1,
    failed: 1,
    processing: 0
  },

  subscriptionSummary: {
    total: 4,
    pending: 0,
    trialing: 1,
    active: 2,
    pastDue: 1,
    paused: 0
  },

  payments: [
    {
      id: 'preview-payment-01',
      invoiceId: 'preview-invoice-01',
      invoiceNumber: 'INV-2026-001',
      amount: 850000,
      fee: 12750,
      netAmount: 837250,
      currency: 'NGN',
      method: 'BANK_TRANSFER',
      provider: 'PAYSTACK',
      status: 'SUCCESS',
      paidAt: new Date('2026-09-05T14:30:00'),
      createdAt: new Date('2026-09-05T14:20:00'),

      payer: {
        id: 'preview-client-01',
        name: 'Amara Cole',
        email: 'amara@example.com',
        image: null,
        displayName: 'Atlas Studio'
      }
    },
    {
      id: 'preview-payment-02',
      invoiceId: 'preview-invoice-02',
      invoiceNumber: 'INV-2026-002',
      amount: 1200000,
      fee: 18000,
      netAmount: 1182000,
      currency: 'NGN',
      method: 'CARD',
      provider: 'PAYSTACK',
      status: 'SUCCESS',
      paidAt: new Date('2026-09-04T10:15:00'),
      createdAt: new Date('2026-09-04T10:10:00'),

      payer: {
        id: 'preview-client-02',
        name: 'Daniel Rowe',
        email: 'daniel@example.com',
        image: null,
        displayName: 'Nova Retail'
      }
    },
    {
      id: 'preview-payment-03',
      invoiceId: 'preview-invoice-03',
      invoiceNumber: 'INV-2026-003',
      amount: 450000,
      fee: 0,
      netAmount: null,
      currency: 'NGN',
      method: 'BANK_TRANSFER',
      provider: 'BANK_TRANSFER',
      status: 'PENDING',
      paidAt: null,
      createdAt: new Date('2026-09-03T16:40:00'),

      payer: {
        id: 'preview-client-03',
        name: 'Maya Bennett',
        email: 'maya@example.com',
        image: null,
        displayName: 'Northstar Labs'
      }
    },
    {
      id: 'preview-payment-04',
      invoiceId: 'preview-invoice-04',
      invoiceNumber: 'INV-2026-004',
      amount: 350000,
      fee: 0,
      netAmount: null,
      currency: 'NGN',
      method: 'CARD',
      provider: 'PAYSTACK',
      status: 'FAILED',
      paidAt: null,
      createdAt: new Date('2026-09-02T09:30:00'),

      payer: {
        id: 'preview-client-04',
        name: 'Jordan Ellis',
        email: 'jordan@example.com',
        image: null,
        displayName: 'Vertex Consulting'
      }
    }
  ],

  receivables: [
    {
      id: 'preview-receivable-01',
      invoiceNumber: 'INV-2026-005',
      status: 'PARTIALLY_PAID',
      currency: 'NGN',
      total: 900000,
      amountPaid: 450000,
      balanceDue: 450000,
      dueAt: new Date('2026-09-01T00:00:00'),
      issuedAt: new Date('2026-08-10T00:00:00'),
      createdAt: new Date('2026-08-10T00:00:00'),
      isOverdue: true,

      client: {
        id: 'preview-client-05',
        name: 'Nora James',
        email: 'nora@example.com',
        image: null,
        displayName: 'Orbit Digital'
      }
    },
    {
      id: 'preview-receivable-02',
      invoiceNumber: 'INV-2026-006',
      status: 'ISSUED',
      currency: 'NGN',
      total: 520000,
      amountPaid: 0,
      balanceDue: 520000,
      dueAt: new Date('2026-09-12T00:00:00'),
      issuedAt: new Date('2026-08-28T00:00:00'),
      createdAt: new Date('2026-08-28T00:00:00'),
      isOverdue: false,

      client: {
        id: 'preview-client-06',
        name: 'Marcus Lee',
        email: 'marcus@example.com',
        image: null,
        displayName: 'Horizon Works'
      }
    },
    {
      id: 'preview-receivable-03',
      invoiceNumber: 'INV-2026-007',
      status: 'ISSUED',
      currency: 'NGN',
      total: 270000,
      amountPaid: 0,
      balanceDue: 270000,
      dueAt: new Date('2026-09-16T00:00:00'),
      issuedAt: new Date('2026-09-02T00:00:00'),
      createdAt: new Date('2026-09-02T00:00:00'),
      isOverdue: false,

      client: {
        id: 'preview-client-07',
        name: 'Sofia Reed',
        email: 'sofia@example.com',
        image: null,
        displayName: 'Aster Group'
      }
    }
  ],

  subscriptions: [
    {
      id: 'preview-subscription-01',
      subscriptionNumber: 'SUB-2026-001',
      status: 'ACTIVE',
      amount: 150000,
      currency: 'NGN',
      intervalUnit: 'MONTH',
      intervalCount: 1,
      autoRenew: true,
      cancelAtPeriodEnd: false,
      currentPeriodEnd: new Date('2026-09-30T00:00:00'),
      nextBillingAt: new Date('2026-10-01T00:00:00'),
      trialEndsAt: null,

      plan: {
        id: 'preview-plan-01',
        name: 'Platform Maintenance'
      },

      client: {
        id: 'preview-client-08',
        name: 'Amara Cole',
        email: 'amara@example.com',
        image: null,
        displayName: 'Atlas Studio'
      }
    },
    {
      id: 'preview-subscription-02',
      subscriptionNumber: 'SUB-2026-002',
      status: 'ACTIVE',
      amount: 250000,
      currency: 'NGN',
      intervalUnit: 'MONTH',
      intervalCount: 1,
      autoRenew: true,
      cancelAtPeriodEnd: false,
      currentPeriodEnd: new Date('2026-09-25T00:00:00'),
      nextBillingAt: new Date('2026-09-26T00:00:00'),
      trialEndsAt: null,

      plan: {
        id: 'preview-plan-02',
        name: 'Business Support'
      },

      client: {
        id: 'preview-client-09',
        name: 'Daniel Rowe',
        email: 'daniel@example.com',
        image: null,
        displayName: 'Nova Retail'
      }
    },
    {
      id: 'preview-subscription-03',
      subscriptionNumber: 'SUB-2026-003',
      status: 'TRIALING',
      amount: 100000,
      currency: 'NGN',
      intervalUnit: 'MONTH',
      intervalCount: 1,
      autoRenew: true,
      cancelAtPeriodEnd: false,
      currentPeriodEnd: null,
      nextBillingAt: new Date('2026-09-18T00:00:00'),
      trialEndsAt: new Date('2026-09-17T00:00:00'),

      plan: {
        id: 'preview-plan-03',
        name: 'Starter Care'
      },

      client: {
        id: 'preview-client-10',
        name: 'Maya Bennett',
        email: 'maya@example.com',
        image: null,
        displayName: 'Northstar Labs'
      }
    },
    {
      id: 'preview-subscription-04',
      subscriptionNumber: 'SUB-2026-004',
      status: 'PAST_DUE',
      amount: 175000,
      currency: 'NGN',
      intervalUnit: 'MONTH',
      intervalCount: 1,
      autoRenew: true,
      cancelAtPeriodEnd: false,
      currentPeriodEnd: new Date('2026-08-31T00:00:00'),
      nextBillingAt: new Date('2026-09-01T00:00:00'),
      trialEndsAt: null,

      plan: {
        id: 'preview-plan-04',
        name: 'Managed Platform'
      },

      client: {
        id: 'preview-client-11',
        name: 'Jordan Ellis',
        email: 'jordan@example.com',
        image: null,
        displayName: 'Vertex Consulting'
      }
    }
  ]
} satisfies FinanceOverview;

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(date: Date | null) {
  if (!date) {
    return 'Not set';
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function formatEnum(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(namePart => namePart.charAt(0).toUpperCase())
    .join('');
}

function FinanceMetric({
  label,
  value,
  note,
  icon: Icon,
  valueClassName = 'text-foreground'
}: {
  label: string;
  value: string;
  note: string;
  icon: typeof Banknote;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-medium text-muted">{label}</p>

        <div className="flex size-7 items-center justify-center rounded-lg bg-theme-accent-faint">
          <Icon aria-hidden="true" className="size-3.5 text-theme-accent" />
        </div>
      </div>

      <p className={`mt-3 text-lg font-semibold tracking-[-0.04em] ${valueClassName}`}>{value}</p>

      <p className="mt-1 text-[9px] text-muted">{note}</p>
    </div>
  );
}

function ReceivableRow({ receivable }: { receivable: FinanceReceivable }) {
  const clientName = receivable.client?.displayName ?? 'Unknown client';

  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="flex items-start gap-3">
        <Avatar className="size-8 shrink-0">
          {receivable.client?.image ? <AvatarImage src={receivable.client.image} alt={clientName} /> : null}

          <AvatarFallback className="bg-surface-muted text-[8px] font-semibold">
            {getInitials(clientName)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-foreground">{clientName}</p>

              <p className="mt-0.5 text-[9px] text-muted">{receivable.invoiceNumber}</p>
            </div>

            <p className="shrink-0 text-[11px] font-semibold text-rose-500">
              {formatMoney(receivable.balanceDue, receivable.currency)}
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3 text-[9px]">
            <span className="text-muted">Paid {formatMoney(receivable.amountPaid, receivable.currency)}</span>

            <span className={receivable.isOverdue ? 'font-medium text-rose-500' : 'text-muted'}>
              {receivable.isOverdue ? 'Overdue' : `Due ${formatDate(receivable.dueAt)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentRow({ payment }: { payment: FinancePayment }) {
  const payerName = payment.payer?.displayName ?? 'Unknown payer';

  const statusClassName =
    payment.status === 'SUCCESS'
      ? 'text-theme-accent'
      : payment.status === 'FAILED'
        ? 'text-rose-500'
        : payment.status === 'PROCESSING' || payment.status === 'REQUIRES_ACTION'
          ? 'text-sky-500'
          : 'text-amber-500';

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-muted">
        <CreditCard className="size-3.5 text-muted" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-foreground">{payerName}</p>

            <p className="mt-0.5 text-[9px] text-muted">{payment.invoiceNumber}</p>
          </div>

          <p className="shrink-0 text-[11px] font-semibold text-foreground">
            {formatMoney(payment.amount, payment.currency)}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 text-[9px]">
          <span className="text-muted">{formatEnum(payment.method)}</span>

          <span className={`font-medium ${statusClassName}`}>{formatEnum(payment.status)}</span>
        </div>
      </div>
    </div>
  );
}

function SubscriptionRow({ subscription }: { subscription: FinanceSubscription }) {
  const statusClassName =
    subscription.status === 'ACTIVE'
      ? 'text-theme-accent'
      : subscription.status === 'PAST_DUE'
        ? 'text-rose-500'
        : subscription.status === 'TRIALING'
          ? 'text-sky-500'
          : 'text-amber-500';

  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold text-foreground">
            {subscription.client.displayName}
          </p>

          <p className="mt-0.5 truncate text-[9px] text-muted">{subscription.plan.name}</p>
        </div>

        <span className={`shrink-0 text-[9px] font-semibold ${statusClassName}`}>
          {formatEnum(subscription.status)}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold text-foreground">
            {formatMoney(subscription.amount, subscription.currency)}
          </p>

          <p className="mt-0.5 text-[8px] text-muted">
            every {subscription.intervalCount > 1 ? `${subscription.intervalCount} ` : ''}
            {subscription.intervalUnit.toLowerCase()}
            {subscription.intervalCount > 1 ? 's' : ''}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[8px] text-muted">Next billing</p>

          <p className="mt-0.5 text-[9px] font-medium text-foreground">
            {formatDate(subscription.nextBillingAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AdminFinanceOverview({ finance }: AdminFinanceOverviewProps) {
  const hasRealFinanceData =
    finance.payments.length > 0 ||
    finance.receivables.length > 0 ||
    finance.subscriptions.length > 0 ||
    finance.summary.grossRevenue > 0 ||
    finance.summary.outstandingAmount > 0;

  const visibleFinance = hasRealFinanceData ? finance : previewFinance;

  const isPreview = !hasRealFinanceData;

  return (
    <section className="overflow-hidden rounded-[18px] border border-border bg-background">
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <WalletCards className="size-4 text-theme-accent" />

            <p className="text-sm font-semibold tracking-[-0.025em] text-foreground">Financial operations</p>

            {isPreview ? (
              <span className="rounded-full border border-border bg-surface-raised px-2 py-0.5 text-[8px] font-medium uppercase tracking-[0.08em] text-muted">
                Preview
              </span>
            ) : null}
          </div>

          <p className="mt-1 text-[10px] text-muted">Revenue, receivables, payments and subscriptions</p>
        </div>

        <Link
          href="/admin/finance"
          className="flex items-center gap-1 text-[10px] text-muted transition-colors hover:text-foreground">
          Finance
          <ArrowRight className="size-3" />
        </Link>
      </div>

      <div className="space-y-4 p-4">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <FinanceMetric
            label="Gross received"
            value={formatMoney(visibleFinance.summary.grossRevenue, visibleFinance.currency)}
            note="Successful payments this month"
            icon={TrendingUp}
            valueClassName="text-theme-accent"
          />

          <FinanceMetric
            label="Net received"
            value={formatMoney(visibleFinance.summary.netRevenue, visibleFinance.currency)}
            note="After recorded payment fees"
            icon={Banknote}
            valueClassName="text-theme-accent"
          />

          <FinanceMetric
            label="Deductions"
            value={formatMoney(visibleFinance.summary.feesDeducted, visibleFinance.currency)}
            note="Payment fees this month"
            icon={TrendingDown}
            valueClassName="text-amber-500"
          />

          <FinanceMetric
            label="Outstanding"
            value={formatMoney(visibleFinance.summary.outstandingAmount, visibleFinance.currency)}
            note={`${visibleFinance.summary.outstandingInvoices} unpaid invoices`}
            icon={ReceiptText}
            valueClassName="text-amber-500"
          />

          <FinanceMetric
            label="Overdue"
            value={formatMoney(visibleFinance.summary.overdueAmount, visibleFinance.currency)}
            note="Requires collection attention"
            icon={TriangleAlert}
            valueClassName="text-rose-500"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="flex h-[310px] min-h-0 flex-col rounded-2xl border border-border bg-surface-raised">
            <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="text-[12px] font-semibold text-foreground">Who owes us</p>

                <p className="mt-0.5 text-[9px] text-muted">Outstanding client balances</p>
              </div>

              <CircleDollarSign className="size-4 text-rose-500" />
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="space-y-2">
                {visibleFinance.receivables.map(receivable => (
                  <ReceivableRow key={receivable.id} receivable={receivable} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex h-[310px] min-h-0 flex-col rounded-2xl border border-border bg-surface-raised">
            <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="text-[12px] font-semibold text-foreground">Payments</p>

                <p className="mt-0.5 text-[9px] text-muted">Recent payment activity</p>
              </div>

              <CreditCard className="size-4 text-theme-accent" />
            </div>

            <div className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-2 text-[8px]">
              <span className="text-theme-accent">Success {visibleFinance.paymentSummary.successful}</span>

              <span className="text-amber-500">Pending {visibleFinance.paymentSummary.pending}</span>

              <span className="text-sky-500">Processing {visibleFinance.paymentSummary.processing}</span>

              <span className="text-rose-500">Failed {visibleFinance.paymentSummary.failed}</span>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="space-y-2">
                {visibleFinance.payments.map(payment => (
                  <PaymentRow key={payment.id} payment={payment} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex h-[310px] min-h-0 flex-col rounded-2xl border border-border bg-surface-raised">
            <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="text-[12px] font-semibold text-foreground">Subscriptions</p>

                <p className="mt-0.5 text-[9px] text-muted">Recurring client commitments</p>
              </div>

              <RefreshCcw className="size-4 text-theme-accent" />
            </div>

            <div className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-2 text-[8px]">
              <span className="text-theme-accent">Active {visibleFinance.subscriptionSummary.active}</span>

              <span className="text-sky-500">Trial {visibleFinance.subscriptionSummary.trialing}</span>

              <span className="text-rose-500">Past due {visibleFinance.subscriptionSummary.pastDue}</span>

              <span className="text-muted">Paused {visibleFinance.subscriptionSummary.paused}</span>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="space-y-2">
                {visibleFinance.subscriptions.map(subscription => (
                  <SubscriptionRow key={subscription.id} subscription={subscription} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
