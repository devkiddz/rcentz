-- CreateEnum
CREATE TYPE "AnalyticsCollectionStatus" AS ENUM ('PENDING', 'ACTIVE', 'PAUSED', 'ENDED');

-- AlterTable
ALTER TABLE "AnalyticsEvent" ADD COLUMN     "projectId" TEXT;

-- AlterTable
ALTER TABLE "ProjectAnalytics" ADD COLUMN     "addToCarts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "checkoutStarted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "clicks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "conversions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastEventAt" TIMESTAMP(3),
ADD COLUMN     "logins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pageViews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "productViews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "projectViews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "purchases" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "removeFromCarts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "searches" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "serviceRequests" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "serviceViews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sessions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "signUps" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalEvents" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "uniqueVisitors" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "ProjectAnalyticsConfig" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "trackingKey" TEXT NOT NULL,
    "status" "AnalyticsCollectionStatus" NOT NULL DEFAULT 'PENDING',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "allowedOrigins" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "clientVisible" BOOLEAN NOT NULL DEFAULT true,
    "rawEventRetentionDays" INTEGER NOT NULL DEFAULT 90,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "lastIngestedAt" TIMESTAMP(3),
    "lastAggregatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectAnalyticsConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectAnalyticsGoal" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eventType" "AnalyticsEventType" NOT NULL,
    "path" TEXT,
    "matchMetadata" JSONB,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectAnalyticsGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectAnalyticsDaily" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "sessions" INTEGER NOT NULL DEFAULT 0,
    "uniqueVisitors" INTEGER NOT NULL DEFAULT 0,
    "pageViews" INTEGER NOT NULL DEFAULT 0,
    "projectViews" INTEGER NOT NULL DEFAULT 0,
    "productViews" INTEGER NOT NULL DEFAULT 0,
    "serviceViews" INTEGER NOT NULL DEFAULT 0,
    "searches" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "reactions" INTEGER NOT NULL DEFAULT 0,
    "comments" INTEGER NOT NULL DEFAULT 0,
    "shares" INTEGER NOT NULL DEFAULT 0,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "addToCarts" INTEGER NOT NULL DEFAULT 0,
    "removeFromCarts" INTEGER NOT NULL DEFAULT 0,
    "checkoutStarted" INTEGER NOT NULL DEFAULT 0,
    "purchases" INTEGER NOT NULL DEFAULT 0,
    "serviceRequests" INTEGER NOT NULL DEFAULT 0,
    "signUps" INTEGER NOT NULL DEFAULT 0,
    "logins" INTEGER NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "totalEvents" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectAnalyticsDaily_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectAnalyticsConfig_projectId_key" ON "ProjectAnalyticsConfig"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectAnalyticsConfig_trackingKey_key" ON "ProjectAnalyticsConfig"("trackingKey");

-- CreateIndex
CREATE INDEX "ProjectAnalyticsConfig_status_idx" ON "ProjectAnalyticsConfig"("status");

-- CreateIndex
CREATE INDEX "ProjectAnalyticsConfig_lastIngestedAt_idx" ON "ProjectAnalyticsConfig"("lastIngestedAt");

-- CreateIndex
CREATE INDEX "ProjectAnalyticsConfig_lastAggregatedAt_idx" ON "ProjectAnalyticsConfig"("lastAggregatedAt");

-- CreateIndex
CREATE INDEX "ProjectAnalyticsGoal_projectId_idx" ON "ProjectAnalyticsGoal"("projectId");

-- CreateIndex
CREATE INDEX "ProjectAnalyticsGoal_eventType_idx" ON "ProjectAnalyticsGoal"("eventType");

-- CreateIndex
CREATE INDEX "ProjectAnalyticsGoal_active_idx" ON "ProjectAnalyticsGoal"("active");

-- CreateIndex
CREATE INDEX "ProjectAnalyticsGoal_isPrimary_idx" ON "ProjectAnalyticsGoal"("isPrimary");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectAnalyticsGoal_projectId_key_key" ON "ProjectAnalyticsGoal"("projectId", "key");

-- CreateIndex
CREATE INDEX "ProjectAnalyticsDaily_projectId_idx" ON "ProjectAnalyticsDaily"("projectId");

-- CreateIndex
CREATE INDEX "ProjectAnalyticsDaily_date_idx" ON "ProjectAnalyticsDaily"("date");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectAnalyticsDaily_projectId_date_key" ON "ProjectAnalyticsDaily"("projectId", "date");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_projectId_idx" ON "AnalyticsEvent"("projectId");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_projectId_createdAt_idx" ON "AnalyticsEvent"("projectId", "createdAt");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_projectId_type_createdAt_idx" ON "AnalyticsEvent"("projectId", "type", "createdAt");

-- CreateIndex
CREATE INDEX "ProjectAnalytics_lastEventAt_idx" ON "ProjectAnalytics"("lastEventAt");

-- AddForeignKey
ALTER TABLE "AnalyticsEvent" ADD CONSTRAINT "AnalyticsEvent_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectAnalyticsConfig" ADD CONSTRAINT "ProjectAnalyticsConfig_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectAnalyticsGoal" ADD CONSTRAINT "ProjectAnalyticsGoal_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectAnalyticsDaily" ADD CONSTRAINT "ProjectAnalyticsDaily_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
