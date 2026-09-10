-- CreateEnum
CREATE TYPE "ClientApprovalEntityType" AS ENUM ('INVOICE', 'PROJECT');

-- CreateEnum
CREATE TYPE "ClientApprovalStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "ClientApproval" (
    "id" TEXT NOT NULL,
    "entityType" "ClientApprovalEntityType" NOT NULL,
    "status" "ClientApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "version" INTEGER NOT NULL DEFAULT 1,
    "clientId" TEXT NOT NULL,
    "requestedById" TEXT NOT NULL,
    "respondedById" TEXT,
    "cancelledById" TEXT,
    "invoiceId" TEXT,
    "projectId" TEXT,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "snapshot" JSONB NOT NULL,
    "response" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientApproval_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClientApproval_clientId_status_idx" ON "ClientApproval"("clientId", "status");

-- CreateIndex
CREATE INDEX "ClientApproval_requestedById_idx" ON "ClientApproval"("requestedById");

-- CreateIndex
CREATE INDEX "ClientApproval_respondedById_idx" ON "ClientApproval"("respondedById");

-- CreateIndex
CREATE INDEX "ClientApproval_cancelledById_idx" ON "ClientApproval"("cancelledById");

-- CreateIndex
CREATE INDEX "ClientApproval_entityType_status_idx" ON "ClientApproval"("entityType", "status");

-- CreateIndex
CREATE INDEX "ClientApproval_requestedAt_idx" ON "ClientApproval"("requestedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ClientApproval_invoiceId_version_key" ON "ClientApproval"("invoiceId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "ClientApproval_projectId_version_key" ON "ClientApproval"("projectId", "version");

-- AddForeignKey
ALTER TABLE "ClientApproval" ADD CONSTRAINT "ClientApproval_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientApproval" ADD CONSTRAINT "ClientApproval_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientApproval" ADD CONSTRAINT "ClientApproval_respondedById_fkey" FOREIGN KEY ("respondedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientApproval" ADD CONSTRAINT "ClientApproval_cancelledById_fkey" FOREIGN KEY ("cancelledById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientApproval" ADD CONSTRAINT "ClientApproval_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientApproval" ADD CONSTRAINT "ClientApproval_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
