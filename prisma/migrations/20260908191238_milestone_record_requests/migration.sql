-- CreateEnum
CREATE TYPE "ProjectMilestoneRecordStatus" AS ENUM ('REQUESTED', 'PREPARING', 'READY', 'SENT', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "ProjectMilestoneRecord" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "milestoneId" TEXT NOT NULL,
    "requestedById" TEXT NOT NULL,
    "preparedById" TEXT,
    "status" "ProjectMilestoneRecordStatus" NOT NULL DEFAULT 'REQUESTED',
    "version" INTEGER NOT NULL DEFAULT 1,
    "recipientEmail" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "fileName" TEXT,
    "snapshot" JSONB,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "preparingAt" TIMESTAMP(3),
    "readyAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectMilestoneRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProjectMilestoneRecord_projectId_idx" ON "ProjectMilestoneRecord"("projectId");

-- CreateIndex
CREATE INDEX "ProjectMilestoneRecord_milestoneId_idx" ON "ProjectMilestoneRecord"("milestoneId");

-- CreateIndex
CREATE INDEX "ProjectMilestoneRecord_requestedById_idx" ON "ProjectMilestoneRecord"("requestedById");

-- CreateIndex
CREATE INDEX "ProjectMilestoneRecord_preparedById_idx" ON "ProjectMilestoneRecord"("preparedById");

-- CreateIndex
CREATE INDEX "ProjectMilestoneRecord_status_idx" ON "ProjectMilestoneRecord"("status");

-- CreateIndex
CREATE INDEX "ProjectMilestoneRecord_requestedAt_idx" ON "ProjectMilestoneRecord"("requestedAt");

-- CreateIndex
CREATE INDEX "ProjectMilestoneRecord_sentAt_idx" ON "ProjectMilestoneRecord"("sentAt");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMilestoneRecord_milestoneId_version_key" ON "ProjectMilestoneRecord"("milestoneId", "version");

-- AddForeignKey
ALTER TABLE "ProjectMilestoneRecord" ADD CONSTRAINT "ProjectMilestoneRecord_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMilestoneRecord" ADD CONSTRAINT "ProjectMilestoneRecord_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "ProjectMilestone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMilestoneRecord" ADD CONSTRAINT "ProjectMilestoneRecord_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMilestoneRecord" ADD CONSTRAINT "ProjectMilestoneRecord_preparedById_fkey" FOREIGN KEY ("preparedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
