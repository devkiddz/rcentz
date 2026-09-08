import type { LucideIcon } from 'lucide-react';

import {
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  FileText,
  ReceiptText,
  WalletCards
} from 'lucide-react';

import type { ClientProject } from '@/features/client/server/projects/get-client-project';

import { ProjectFundingDonut } from './charts/ProjectFundingDonut';

type ClientProjectFinanceSectionProps = {
  project: ClientProject;
};

const activeInvoiceStatuses = new Set(['ISSUED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE']);

function toNumber(
  value:
    | number
    | string
    | {
        toString(): string;
      }
    | null
    | undefined
) {
  if (value === null || value === undefined) {
    return 0;
  }

  return Number(value);
}

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(value);
  } catch {
    return `${currency} ${new Intl.NumberFormat('en-NG').format(value)}`;
  }
}

function formatDate(value: Date | string | null | undefined) {
  if (!value) {
    return 'Not set';
  }

  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value));
}

function humanize(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getInvoiceStatusClass(status: string) {
  switch (status) {
    case 'PAID':
      return 'border-theme-accent/20 bg-theme-accent/5 text-theme-accent';

    case 'OVERDUE':
      return 'border-red-500/20 bg-red-500/5 text-red-500';

    case 'PARTIALLY_PAID':
      return 'border-[var(--chart-warning)]/20 bg-[var(--chart-warning)]/5 text-[var(--chart-warning)]';

    default:
      return 'border-border bg-surface-muted text-foreground';
  }
}

export function ClientProjectFinanceSection({ project }: ClientProjectFinanceSectionProps) {
  const currency = project.currency;

  const projectValue = toNumber(project.budget);

  const invoices = project.invoices;

  const activeInvoices = invoices.filter(invoice => activeInvoiceStatuses.has(invoice.status));

  const billed = activeInvoices.reduce((total, invoice) => total + toNumber(invoice.total), 0);

  const paid = activeInvoices.reduce((total, invoice) => total + toNumber(invoice.amountPaid), 0);

  const outstanding = activeInvoices.reduce((total, invoice) => total + toNumber(invoice.balanceDue), 0);

  const outstandingInvoices = activeInvoices
    .filter(invoice => toNumber(invoice.balanceDue) > 0)
    .sort((a, b) => {
      const aDate = a.dueAt ?? a.issuedAt ?? a.createdAt;

      const bDate = b.dueAt ?? b.issuedAt ?? b.createdAt;

      return new Date(aDate).getTime() - new Date(bDate).getTime();
    });

  const nextInvoice = outstandingInvoices[0] ?? null;

  const remainingAgainstProject = Math.max(0, projectValue - paid);

  const fundingStatus =
    billed === 0
      ? 'Awaiting billing'
      : outstanding <= 0
        ? 'Fully funded'
        : paid > 0
          ? 'Partially funded'
          : 'Payment pending';

  return (
    <section className="overflow-hidden rounded-[22px] border border-border bg-surface">
      <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:px-6 sm:py-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Financing
          </p>

          <h2 className="mt-2 text-[21px] font-semibold tracking-[-0.04em] text-foreground sm:text-[23px]">
            Project funding
          </h2>

          <p className="mt-1.5 max-w-2xl text-[13px] leading-5.5 text-muted-foreground">
            Project value, invoicing, received funding and upcoming payments.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
          <span
            className={[
              'size-2 rounded-full',
              outstanding <= 0 && billed > 0 ? 'bg-theme-accent' : 'bg-[var(--chart-warning)]'
            ].join(' ')}
          />

          <span className="text-[11px] font-medium text-muted-foreground">{fundingStatus}</span>
        </div>
      </div>

      <FinanceSummaryRail>
        <FinanceMetric
          icon={CircleDollarSign}
          label="Project value"
          value={projectValue > 0 ? formatMoney(projectValue, currency) : 'Not set'}
          description="Agreed project value"
        />

        <FinanceMetric
          icon={ReceiptText}
          label="Billed"
          value={formatMoney(billed, currency)}
          description="Invoices issued"
        />

        <FinanceMetric
          icon={CheckCircle2}
          label="Paid"
          value={formatMoney(paid, currency)}
          description="Funding received"
        />

        <FinanceMetric
          icon={WalletCards}
          label="Outstanding"
          value={formatMoney(outstanding, currency)}
          description="Invoice balance"
        />
      </FinanceSummaryRail>

      <div className="grid border-t border-border lg:grid-cols-[minmax(0,1.2fr)_minmax(330px,0.8fr)]">
        <div className="border-b border-border p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div>
            <h3 className="text-[16px] font-semibold tracking-[-0.025em] text-foreground">
              Funding position
            </h3>

            <p className="mt-1.5 text-[12px] leading-5 text-muted-foreground">
              Payments received against currently issued invoices.
            </p>
          </div>

          <div className="mt-7">
            <ProjectFundingDonut paid={paid} outstanding={outstanding} currency={currency} />
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <CalendarClock aria-hidden="true" className="size-[18px] text-theme-accent" />

            <h3 className="text-[16px] font-semibold tracking-[-0.025em] text-foreground">Next payment</h3>
          </div>

          {nextInvoice ? (
            <div className="mt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-muted-foreground">
                {nextInvoice.invoiceNumber}
              </p>

              <p className="mt-2 text-[32px] font-semibold tracking-[-0.06em] text-foreground sm:text-[34px]">
                {formatMoney(toNumber(nextInvoice.balanceDue), nextInvoice.currency)}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <PaymentDetail label="Due" value={formatDate(nextInvoice.dueAt)} />

                <PaymentDetail
                  label="Invoice total"
                  value={formatMoney(toNumber(nextInvoice.total), nextInvoice.currency)}
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span
                  className={[
                    'inline-flex rounded-full border px-3 py-1.5 text-[10px] font-medium',
                    getInvoiceStatusClass(nextInvoice.status)
                  ].join(' ')}>
                  {humanize(nextInvoice.status)}
                </span>

                {nextInvoice.pdfUrl ? (
                  <a
                    href={nextInvoice.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-foreground transition-colors hover:text-theme-accent">
                    View invoice
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-[16px] border border-dashed border-border px-5 py-8 text-center">
              <CheckCircle2 aria-hidden="true" className="mx-auto size-6 text-theme-accent" />

              <p className="mt-3 text-[13px] font-medium text-foreground">No payment due</p>

              <p className="mt-1 text-[11px] text-muted-foreground">
                There is currently no outstanding invoice.
              </p>
            </div>
          )}

          {projectValue > 0 ? (
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Overall project position
              </p>

              <div className="mt-4 grid grid-cols-2 gap-5">
                <ProjectPosition label="Agreed value" value={formatMoney(projectValue, currency)} />

                <ProjectPosition label="Remaining" value={formatMoney(remainingAgainstProject, currency)} />
              </div>

              <p className="mt-4 text-[10px] leading-4.5 text-muted-foreground">
                Remaining project value can include work that has not yet been invoiced.
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <details className="group border-t border-border">
        <summary className="flex min-h-[70px] cursor-pointer list-none items-center gap-4 px-5 transition-colors hover:bg-surface-muted/40 sm:px-6 [&::-webkit-details-marker]:hidden">
          <FileText aria-hidden="true" className="size-[18px] shrink-0 text-muted-foreground" />

          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-foreground">Billing records</p>

            <p className="mt-1 text-[11px] text-muted-foreground">
              {invoices.length} invoice
              {invoices.length === 1 ? '' : 's'} · {formatMoney(billed, currency)} billed
            </p>
          </div>

          <span className="hidden text-[11px] text-muted-foreground sm:block">
            {formatMoney(outstanding, currency)} outstanding
          </span>

          <ChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
          />
        </summary>

        <div className="border-t border-border">
          {invoices.length > 0 ? (
            <div className="divide-y divide-border">
              {invoices.map(invoice => (
                <InvoiceRow key={invoice.id} invoice={invoice} />
              ))}
            </div>
          ) : (
            <div className="px-6 py-10 text-center">
              <p className="text-[13px] font-medium text-foreground">No invoices yet</p>

              <p className="mt-1 text-[11px] text-muted-foreground">Project invoices will appear here.</p>
            </div>
          )}
        </div>
      </details>
    </section>
  );
}

function FinanceSummaryRail({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        flex snap-x snap-mandatory gap-3
        overflow-x-auto px-5 py-4
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden

        sm:px-6

        md:grid
        md:grid-cols-2
        md:gap-3
        md:overflow-visible
        md:py-5

        xl:grid-cols-4
      ">
      {children}
    </div>
  );
}

function FinanceMetric({
  icon: Icon,
  label,
  value,
  description
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <article
      className="
        min-w-[78%]
        snap-start
        rounded-[16px]
        border border-border
        bg-background/45
        px-4 py-4

        sm:min-w-[46%]
        sm:px-5

        md:min-w-0
        md:snap-none

        xl:px-5
        xl:py-5
      ">
      <div className="flex items-center gap-2.5 text-muted-foreground">
        <Icon aria-hidden="true" className="size-4 shrink-0" />

        <span className="text-[11px] font-semibold uppercase tracking-[0.11em]">{label}</span>
      </div>

      <p className="mt-3 text-[25px] font-semibold tracking-[-0.055em] text-foreground sm:text-[27px] xl:text-[26px]">
        {value}
      </p>

      <p className="mt-1.5 text-[11px] leading-4 text-muted-foreground">{description}</p>
    </article>
  );
}

function PaymentDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 px-4 py-3.5">
      <p className="text-[10px] font-medium uppercase tracking-[0.09em] text-muted-foreground">{label}</p>

      <p className="mt-1.5 text-[13px] font-semibold text-foreground">{value}</p>
    </div>
  );
}

function ProjectPosition({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-muted-foreground">{label}</p>

      <p className="mt-1.5 text-[15px] font-semibold tracking-[-0.02em] text-foreground">{value}</p>
    </div>
  );
}

type ProjectInvoice = ClientProject['invoices'][number];

function InvoiceRow({ invoice }: { invoice: ProjectInvoice }) {
  return (
    <div className="px-5 py-5 sm:px-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(180px,1.2fr)_110px_repeat(3,minmax(100px,0.7fr))_110px] lg:items-center">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-foreground">{invoice.invoiceNumber}</p>

          <p className="mt-1 text-[11px] text-muted-foreground">
            Issued {formatDate(invoice.issuedAt ?? invoice.createdAt)}
          </p>
        </div>

        <span
          className={[
            'w-fit rounded-full border px-2.5 py-1 text-[10px] font-medium',
            getInvoiceStatusClass(invoice.status)
          ].join(' ')}>
          {humanize(invoice.status)}
        </span>

        <InvoiceAmount label="Total" value={formatMoney(toNumber(invoice.total), invoice.currency)} />

        <InvoiceAmount label="Paid" value={formatMoney(toNumber(invoice.amountPaid), invoice.currency)} />

        <InvoiceAmount label="Balance" value={formatMoney(toNumber(invoice.balanceDue), invoice.currency)} />

        <div>
          <p className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Due</p>

          <div className="mt-1.5 flex items-center gap-2">
            <p className="text-[12px] font-medium text-foreground">{formatDate(invoice.dueAt)}</p>

            {invoice.pdfUrl ? (
              <a
                href={invoice.pdfUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${invoice.invoiceNumber}`}
                className="text-muted-foreground transition-colors hover:text-theme-accent">
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceAmount({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">{label}</p>

      <p className="mt-1.5 text-[12px] font-semibold text-foreground">{value}</p>
    </div>
  );
}
