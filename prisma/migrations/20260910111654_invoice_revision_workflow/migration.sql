-- CreateEnum
CREATE TYPE "InvoiceRevisionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "InvoiceRevision" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "revisionNumber" INTEGER NOT NULL,
    "status" "InvoiceRevisionStatus" NOT NULL DEFAULT 'PENDING',
    "title" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "previousCurrency" TEXT NOT NULL,
    "proposedCurrency" TEXT NOT NULL,
    "previousSubtotal" DECIMAL(14,2) NOT NULL,
    "proposedSubtotal" DECIMAL(14,2) NOT NULL,
    "previousDiscount" DECIMAL(14,2) NOT NULL,
    "proposedDiscount" DECIMAL(14,2) NOT NULL,
    "previousTax" DECIMAL(14,2) NOT NULL,
    "proposedTax" DECIMAL(14,2) NOT NULL,
    "previousTotal" DECIMAL(14,2) NOT NULL,
    "proposedTotal" DECIMAL(14,2) NOT NULL,
    "amountPaidAtProposal" DECIMAL(14,2) NOT NULL,
    "previousBalanceDue" DECIMAL(14,2) NOT NULL,
    "proposedBalanceDue" DECIMAL(14,2) NOT NULL,
    "previousDueAt" TIMESTAMP(3),
    "proposedDueAt" TIMESTAMP(3),
    "previousItems" JSONB NOT NULL,
    "proposedItems" JSONB NOT NULL,
    "proposedById" TEXT NOT NULL,
    "acceptedById" TEXT,
    "rejectedById" TEXT,
    "cancelledById" TEXT,
    "clientResponse" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),

    CONSTRAINT "InvoiceRevision_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InvoiceRevision_invoiceId_status_idx" ON "InvoiceRevision"("invoiceId", "status");

-- CreateIndex
CREATE INDEX "InvoiceRevision_proposedById_idx" ON "InvoiceRevision"("proposedById");

-- CreateIndex
CREATE INDEX "InvoiceRevision_acceptedById_idx" ON "InvoiceRevision"("acceptedById");

-- CreateIndex
CREATE INDEX "InvoiceRevision_rejectedById_idx" ON "InvoiceRevision"("rejectedById");

-- CreateIndex
CREATE INDEX "InvoiceRevision_cancelledById_idx" ON "InvoiceRevision"("cancelledById");

-- CreateIndex
CREATE INDEX "InvoiceRevision_createdAt_idx" ON "InvoiceRevision"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceRevision_invoiceId_revisionNumber_key" ON "InvoiceRevision"("invoiceId", "revisionNumber");

-- AddForeignKey
ALTER TABLE "InvoiceRevision" ADD CONSTRAINT "InvoiceRevision_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceRevision" ADD CONSTRAINT "InvoiceRevision_proposedById_fkey" FOREIGN KEY ("proposedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceRevision" ADD CONSTRAINT "InvoiceRevision_acceptedById_fkey" FOREIGN KEY ("acceptedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceRevision" ADD CONSTRAINT "InvoiceRevision_rejectedById_fkey" FOREIGN KEY ("rejectedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceRevision" ADD CONSTRAINT "InvoiceRevision_cancelledById_fkey" FOREIGN KEY ("cancelledById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
