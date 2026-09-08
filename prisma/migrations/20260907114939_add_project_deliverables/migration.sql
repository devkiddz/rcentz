-- CreateEnum
CREATE TYPE "ProjectDeliverableType" AS ENUM ('PAGE', 'FEATURE', 'DOCUMENT', 'DESIGN', 'API', 'ASSET', 'DEPLOYMENT', 'REPORT', 'HANDOVER', 'OTHER');

-- CreateEnum
CREATE TYPE "ProjectDeliverableStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'BLOCKED', 'REVIEW', 'READY', 'DELIVERED', 'ACCEPTED', 'DEFERRED', 'CANCELLED');

-- AlterTable
ALTER TABLE "ProjectFile" ADD COLUMN     "deliverableId" TEXT;

-- CreateTable
CREATE TABLE "ProjectDeliverable" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "milestoneId" TEXT,
    "createdById" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "ProjectDeliverableType" NOT NULL,
    "summary" TEXT,
    "description" TEXT,
    "agreementSummary" TEXT,
    "rationale" TEXT,
    "expectedOutcome" TEXT,
    "status" "ProjectDeliverableStatus" NOT NULL DEFAULT 'PLANNED',
    "visibility" "ProjectUpdateVisibility" NOT NULL DEFAULT 'CLIENT',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "originalDueDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "extensionReason" TEXT,
    "completionNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectDeliverable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProjectDeliverable_projectId_idx" ON "ProjectDeliverable"("projectId");

-- CreateIndex
CREATE INDEX "ProjectDeliverable_milestoneId_idx" ON "ProjectDeliverable"("milestoneId");

-- CreateIndex
CREATE INDEX "ProjectDeliverable_createdById_idx" ON "ProjectDeliverable"("createdById");

-- CreateIndex
CREATE INDEX "ProjectDeliverable_type_idx" ON "ProjectDeliverable"("type");

-- CreateIndex
CREATE INDEX "ProjectDeliverable_status_idx" ON "ProjectDeliverable"("status");

-- CreateIndex
CREATE INDEX "ProjectDeliverable_visibility_idx" ON "ProjectDeliverable"("visibility");

-- CreateIndex
CREATE INDEX "ProjectDeliverable_dueDate_idx" ON "ProjectDeliverable"("dueDate");

-- CreateIndex
CREATE INDEX "ProjectDeliverable_sortOrder_idx" ON "ProjectDeliverable"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDeliverable_projectId_slug_key" ON "ProjectDeliverable"("projectId", "slug");

-- CreateIndex
CREATE INDEX "ProjectFile_deliverableId_idx" ON "ProjectFile"("deliverableId");

-- AddForeignKey
ALTER TABLE "ProjectDeliverable" ADD CONSTRAINT "ProjectDeliverable_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectDeliverable" ADD CONSTRAINT "ProjectDeliverable_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "ProjectMilestone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectDeliverable" ADD CONSTRAINT "ProjectDeliverable_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectFile" ADD CONSTRAINT "ProjectFile_deliverableId_fkey" FOREIGN KEY ("deliverableId") REFERENCES "ProjectDeliverable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
