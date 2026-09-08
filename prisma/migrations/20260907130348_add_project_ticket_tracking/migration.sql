-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('SUPPORT', 'ISSUE', 'BUG', 'REPORT', 'CHANGE_REQUEST', 'QUESTION');

-- AlterTable
ALTER TABLE "SupportTicket" ADD COLUMN     "projectId" TEXT,
ADD COLUMN     "type" "TicketType" NOT NULL DEFAULT 'SUPPORT',
ADD COLUMN     "visibility" "ProjectUpdateVisibility" NOT NULL DEFAULT 'CLIENT';

-- CreateIndex
CREATE INDEX "SupportTicket_projectId_idx" ON "SupportTicket"("projectId");

-- CreateIndex
CREATE INDEX "SupportTicket_type_idx" ON "SupportTicket"("type");

-- CreateIndex
CREATE INDEX "SupportTicket_visibility_idx" ON "SupportTicket"("visibility");

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
