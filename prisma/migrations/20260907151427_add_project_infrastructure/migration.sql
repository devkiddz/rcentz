-- CreateTable
CREATE TABLE "ProjectInfrastructure" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "primaryDomain" TEXT,
    "domainRegistrar" TEXT,
    "dnsProvider" TEXT,
    "hostingProvider" TEXT,
    "hostingRegion" TEXT,
    "databaseProvider" TEXT,
    "storageProvider" TEXT,
    "emailProvider" TEXT,
    "sslProvider" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectInfrastructure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectInfrastructure_projectId_key" ON "ProjectInfrastructure"("projectId");

-- CreateIndex
CREATE INDEX "ProjectInfrastructure_domainRegistrar_idx" ON "ProjectInfrastructure"("domainRegistrar");

-- CreateIndex
CREATE INDEX "ProjectInfrastructure_dnsProvider_idx" ON "ProjectInfrastructure"("dnsProvider");

-- CreateIndex
CREATE INDEX "ProjectInfrastructure_hostingProvider_idx" ON "ProjectInfrastructure"("hostingProvider");

-- CreateIndex
CREATE INDEX "ProjectInfrastructure_databaseProvider_idx" ON "ProjectInfrastructure"("databaseProvider");

-- AddForeignKey
ALTER TABLE "ProjectInfrastructure" ADD CONSTRAINT "ProjectInfrastructure_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
