-- CreateEnum
CREATE TYPE "ProjectProcessType" AS ENUM ('PAYMENT', 'CLIENT_APPROVAL', 'CONTENT', 'CREDENTIALS', 'ASSET', 'DECISION', 'EXTERNAL_SERVICE', 'SUBSCRIPTION_RENEWAL', 'INFORMATION', 'OTHER');

-- CreateEnum
CREATE TYPE "ProjectProcessStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'WAIVED', 'CANCELLED');

-- CreateTable
CREATE TABLE "ProjectProcess" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "milestoneId" TEXT,
    "deliverableId" TEXT,
    "invoiceId" TEXT,
    "subscriptionId" TEXT,
    "createdById" TEXT NOT NULL,
    "type" "ProjectProcessType" NOT NULL,
    "status" "ProjectProcessStatus" NOT NULL DEFAULT 'PENDING',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "reason" TEXT,
    "impact" TEXT,
    "blocking" BOOLEAN NOT NULL DEFAULT false,
    "requiresClientAction" BOOLEAN NOT NULL DEFAULT false,
    "visibility" "ProjectUpdateVisibility" NOT NULL DEFAULT 'CLIENT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "dueAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "resolutionNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectProcess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProjectProcess_projectId_idx" ON "ProjectProcess"("projectId");

-- CreateIndex
CREATE INDEX "ProjectProcess_milestoneId_idx" ON "ProjectProcess"("milestoneId");

-- CreateIndex
CREATE INDEX "ProjectProcess_deliverableId_idx" ON "ProjectProcess"("deliverableId");

-- CreateIndex
CREATE INDEX "ProjectProcess_invoiceId_idx" ON "ProjectProcess"("invoiceId");

-- CreateIndex
CREATE INDEX "ProjectProcess_subscriptionId_idx" ON "ProjectProcess"("subscriptionId");

-- CreateIndex
CREATE INDEX "ProjectProcess_createdById_idx" ON "ProjectProcess"("createdById");

-- CreateIndex
CREATE INDEX "ProjectProcess_type_idx" ON "ProjectProcess"("type");

-- CreateIndex
CREATE INDEX "ProjectProcess_status_idx" ON "ProjectProcess"("status");

-- CreateIndex
CREATE INDEX "ProjectProcess_blocking_idx" ON "ProjectProcess"("blocking");

-- CreateIndex
CREATE INDEX "ProjectProcess_requiresClientAction_idx" ON "ProjectProcess"("requiresClientAction");

-- CreateIndex
CREATE INDEX "ProjectProcess_visibility_idx" ON "ProjectProcess"("visibility");

-- CreateIndex
CREATE INDEX "ProjectProcess_dueAt_idx" ON "ProjectProcess"("dueAt");

-- CreateIndex
CREATE INDEX "ProjectProcess_sortOrder_idx" ON "ProjectProcess"("sortOrder");

-- AddForeignKey
ALTER TABLE "ProjectProcess" ADD CONSTRAINT "ProjectProcess_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectProcess" ADD CONSTRAINT "ProjectProcess_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "ProjectMilestone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectProcess" ADD CONSTRAINT "ProjectProcess_deliverableId_fkey" FOREIGN KEY ("deliverableId") REFERENCES "ProjectDeliverable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectProcess" ADD CONSTRAINT "ProjectProcess_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectProcess" ADD CONSTRAINT "ProjectProcess_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "ClientSubscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectProcess" ADD CONSTRAINT "ProjectProcess_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
