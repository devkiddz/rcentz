/*
  Warnings:

  - You are about to drop the column `currency` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `priceFrom` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `priceTo` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "currency",
DROP COLUMN "priceFrom",
DROP COLUMN "priceTo";

-- CreateTable
CREATE TABLE "ServicePrice" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "priceFrom" DECIMAL(14,2) NOT NULL,
    "priceTo" DECIMAL(14,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicePrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServicePrice_serviceId_idx" ON "ServicePrice"("serviceId");

-- CreateIndex
CREATE INDEX "ServicePrice_currency_idx" ON "ServicePrice"("currency");

-- CreateIndex
CREATE UNIQUE INDEX "ServicePrice_serviceId_currency_key" ON "ServicePrice"("serviceId", "currency");

-- AddForeignKey
ALTER TABLE "ServicePrice" ADD CONSTRAINT "ServicePrice_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
