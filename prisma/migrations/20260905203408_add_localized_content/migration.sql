-- CreateTable
CREATE TABLE "LocalizedContent" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "sourceLocale" TEXT NOT NULL DEFAULT 'en',
    "value" TEXT NOT NULL,
    "sourceHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocalizedContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LocalizedContent_entityType_entityId_locale_idx" ON "LocalizedContent"("entityType", "entityId", "locale");

-- CreateIndex
CREATE INDEX "LocalizedContent_entityType_entityId_idx" ON "LocalizedContent"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "LocalizedContent_locale_idx" ON "LocalizedContent"("locale");

-- CreateIndex
CREATE INDEX "LocalizedContent_sourceHash_idx" ON "LocalizedContent"("sourceHash");

-- CreateIndex
CREATE INDEX "LocalizedContent_updatedAt_idx" ON "LocalizedContent"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "LocalizedContent_entityType_entityId_fieldName_locale_key" ON "LocalizedContent"("entityType", "entityId", "fieldName", "locale");
