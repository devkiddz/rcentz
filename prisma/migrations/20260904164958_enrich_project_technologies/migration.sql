-- DropIndex
DROP INDEX "ProjectTechnology_projectId_idx";

-- AlterTable
ALTER TABLE "ProjectTechnology" ADD COLUMN     "category" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "purpose" TEXT,
ADD COLUMN     "rationale" TEXT,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "ProjectTechnology_projectId_sortOrder_idx" ON "ProjectTechnology"("projectId", "sortOrder");

-- CreateIndex
CREATE INDEX "ProjectTechnology_slug_idx" ON "ProjectTechnology"("slug");
