/*
  Warnings:

  - You are about to drop the column `orderId` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[providerReference]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoiceId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ServicePlanStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ServicePlanVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "BillingIntervalUnit" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "ClientSubscriptionStatus" AS ENUM ('PENDING', 'TRIALING', 'ACTIVE', 'PAST_DUE', 'PAUSED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'VOID', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "InvoiceSourceType" AS ENUM ('ORDER', 'QUOTE', 'SUBSCRIPTION', 'PROJECT', 'SERVICE_REQUEST', 'MANUAL');

-- CreateEnum
CREATE TYPE "InvoiceItemType" AS ENUM ('PRODUCT', 'SERVICE', 'PLAN', 'PROJECT', 'CUSTOM', 'CREDIT', 'DISCOUNT');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'BANK_TRANSFER', 'USSD', 'MOBILE_MONEY', 'QR', 'CRYPTO', 'CASH', 'WALLET', 'MANUAL', 'OTHER');

-- CreateEnum
CREATE TYPE "CryptoPaymentStatus" AS ENUM ('PENDING', 'WAITING', 'PARTIALLY_RECEIVED', 'RECEIVED', 'CONFIRMING', 'CONFIRMED', 'EXPIRED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CryptoTransactionStatus" AS ENUM ('DETECTED', 'CONFIRMING', 'CONFIRMED', 'FAILED');

-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED', 'CANCELLED');

-- AlterEnum
ALTER TYPE "ConversationType" ADD VALUE 'SUBSCRIPTION';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'SUBSCRIPTION';
ALTER TYPE "NotificationType" ADD VALUE 'INVOICE';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PaymentProvider" ADD VALUE 'CRYPTO_GATEWAY';
ALTER TYPE "PaymentProvider" ADD VALUE 'BANK_TRANSFER';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PaymentStatus" ADD VALUE 'REQUIRES_ACTION';
ALTER TYPE "PaymentStatus" ADD VALUE 'EXPIRED';

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropIndex
DROP INDEX "Payment_orderId_idx";

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "subscriptionId" TEXT;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "orderId",
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "failedAt" TIMESTAMP(3),
ADD COLUMN     "fee" DECIMAL(14,2),
ADD COLUMN     "initiatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "invoiceId" TEXT NOT NULL,
ADD COLUMN     "method" "PaymentMethod" NOT NULL,
ADD COLUMN     "netAmount" DECIMAL(14,2),
ADD COLUMN     "payerId" TEXT,
ADD COLUMN     "providerName" TEXT,
ADD COLUMN     "providerReference" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "subscriptionId" TEXT;

-- AlterTable
ALTER TABLE "QuoteItem" ADD COLUMN     "serviceId" TEXT,
ADD COLUMN     "servicePlanId" TEXT;

-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "subscriptionId" TEXT;

-- CreateTable
CREATE TABLE "ServicePlan" (
    "id" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "clientId" TEXT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT,
    "description" TEXT,
    "status" "ServicePlanStatus" NOT NULL DEFAULT 'DRAFT',
    "visibility" "ServicePlanVisibility" NOT NULL DEFAULT 'PUBLIC',
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePlanService" (
    "planId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,

    CONSTRAINT "ServicePlanService_pkey" PRIMARY KEY ("planId","serviceId")
);

-- CreateTable
CREATE TABLE "ServicePlanPrice" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "label" TEXT,
    "amount" DECIMAL(14,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "intervalUnit" "BillingIntervalUnit" NOT NULL,
    "intervalCount" INTEGER NOT NULL DEFAULT 1,
    "setupFee" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "trialDays" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicePlanPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePlanEntitlement" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "serviceId" TEXT,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "limitValue" DECIMAL(14,2),
    "unit" TEXT,
    "unlimited" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicePlanEntitlement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientSubscription" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "priceId" TEXT,
    "quoteId" TEXT,
    "createdById" TEXT,
    "subscriptionNumber" TEXT NOT NULL,
    "status" "ClientSubscriptionStatus" NOT NULL DEFAULT 'PENDING',
    "priceAmount" DECIMAL(14,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "intervalUnit" "BillingIntervalUnit" NOT NULL,
    "intervalCount" INTEGER NOT NULL DEFAULT 1,
    "setupFee" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "autoRenew" BOOLEAN NOT NULL DEFAULT true,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "nextBillingAt" TIMESTAMP(3),
    "trialEndsAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "pausedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "notes" TEXT,
    "customTerms" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionEntitlement" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "planEntitlementId" TEXT,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "limitValue" DECIMAL(14,2),
    "usedValue" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "unit" TEXT,
    "unlimited" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "usageResetAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionEntitlement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionUsageRecord" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "entitlementId" TEXT NOT NULL,
    "serviceRequestId" TEXT,
    "quantity" DECIMAL(14,2) NOT NULL DEFAULT 1,
    "description" TEXT,
    "metadata" JSONB,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubscriptionUsageRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "clientId" TEXT,
    "createdById" TEXT,
    "invoiceNumber" TEXT NOT NULL,
    "sourceType" "InvoiceSourceType" NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT',
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "subtotal" DECIMAL(14,2) NOT NULL,
    "discount" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "tax" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(14,2) NOT NULL,
    "amountPaid" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "balanceDue" DECIMAL(14,2) NOT NULL,
    "orderId" TEXT,
    "quoteId" TEXT,
    "subscriptionId" TEXT,
    "projectId" TEXT,
    "serviceRequestId" TEXT,
    "customerName" TEXT,
    "customerEmail" TEXT,
    "customerPhone" TEXT,
    "billingAddress" JSONB,
    "notes" TEXT,
    "pdfUrl" TEXT,
    "metadata" JSONB,
    "issuedAt" TIMESTAMP(3),
    "dueAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "voidedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "type" "InvoiceItemType" NOT NULL DEFAULT 'CUSTOM',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" DECIMAL(10,2) NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(14,2) NOT NULL,
    "total" DECIMAL(14,2) NOT NULL,
    "productVariantId" TEXT,
    "serviceId" TEXT,
    "servicePlanId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentRefund" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "status" "RefundStatus" NOT NULL DEFAULT 'PENDING',
    "reference" TEXT,
    "providerReference" TEXT,
    "reason" TEXT,
    "metadata" JSONB,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentRefund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CryptoPayment" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "providerReference" TEXT,
    "assetSymbol" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "walletAddress" TEXT,
    "destinationTag" TEXT,
    "expectedAmount" DECIMAL(36,18) NOT NULL,
    "receivedAmount" DECIMAL(36,18) NOT NULL DEFAULT 0,
    "exchangeRate" DECIMAL(36,18),
    "status" "CryptoPaymentStatus" NOT NULL DEFAULT 'PENDING',
    "requiredConfirmations" INTEGER NOT NULL DEFAULT 1,
    "expiresAt" TIMESTAMP(3),
    "detectedAt" TIMESTAMP(3),
    "confirmedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CryptoPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CryptoTransaction" (
    "id" TEXT NOT NULL,
    "cryptoPaymentId" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "amount" DECIMAL(36,18) NOT NULL,
    "confirmations" INTEGER NOT NULL DEFAULT 0,
    "status" "CryptoTransactionStatus" NOT NULL DEFAULT 'DETECTED',
    "rawData" JSONB,
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CryptoTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServicePlan_slug_key" ON "ServicePlan"("slug");

-- CreateIndex
CREATE INDEX "ServicePlan_createdById_idx" ON "ServicePlan"("createdById");

-- CreateIndex
CREATE INDEX "ServicePlan_clientId_idx" ON "ServicePlan"("clientId");

-- CreateIndex
CREATE INDEX "ServicePlan_status_idx" ON "ServicePlan"("status");

-- CreateIndex
CREATE INDEX "ServicePlan_visibility_idx" ON "ServicePlan"("visibility");

-- CreateIndex
CREATE INDEX "ServicePlan_isCustom_idx" ON "ServicePlan"("isCustom");

-- CreateIndex
CREATE INDEX "ServicePlan_featured_idx" ON "ServicePlan"("featured");

-- CreateIndex
CREATE INDEX "ServicePlanService_serviceId_idx" ON "ServicePlanService"("serviceId");

-- CreateIndex
CREATE INDEX "ServicePlanService_sortOrder_idx" ON "ServicePlanService"("sortOrder");

-- CreateIndex
CREATE INDEX "ServicePlanPrice_planId_idx" ON "ServicePlanPrice"("planId");

-- CreateIndex
CREATE INDEX "ServicePlanPrice_currency_idx" ON "ServicePlanPrice"("currency");

-- CreateIndex
CREATE INDEX "ServicePlanPrice_active_idx" ON "ServicePlanPrice"("active");

-- CreateIndex
CREATE INDEX "ServicePlanPrice_intervalUnit_intervalCount_idx" ON "ServicePlanPrice"("intervalUnit", "intervalCount");

-- CreateIndex
CREATE INDEX "ServicePlanEntitlement_planId_idx" ON "ServicePlanEntitlement"("planId");

-- CreateIndex
CREATE INDEX "ServicePlanEntitlement_serviceId_idx" ON "ServicePlanEntitlement"("serviceId");

-- CreateIndex
CREATE INDEX "ServicePlanEntitlement_sortOrder_idx" ON "ServicePlanEntitlement"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ServicePlanEntitlement_planId_key_key" ON "ServicePlanEntitlement"("planId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "ClientSubscription_quoteId_key" ON "ClientSubscription"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientSubscription_subscriptionNumber_key" ON "ClientSubscription"("subscriptionNumber");

-- CreateIndex
CREATE INDEX "ClientSubscription_clientId_idx" ON "ClientSubscription"("clientId");

-- CreateIndex
CREATE INDEX "ClientSubscription_planId_idx" ON "ClientSubscription"("planId");

-- CreateIndex
CREATE INDEX "ClientSubscription_priceId_idx" ON "ClientSubscription"("priceId");

-- CreateIndex
CREATE INDEX "ClientSubscription_createdById_idx" ON "ClientSubscription"("createdById");

-- CreateIndex
CREATE INDEX "ClientSubscription_status_idx" ON "ClientSubscription"("status");

-- CreateIndex
CREATE INDEX "ClientSubscription_nextBillingAt_idx" ON "ClientSubscription"("nextBillingAt");

-- CreateIndex
CREATE INDEX "ClientSubscription_currentPeriodEnd_idx" ON "ClientSubscription"("currentPeriodEnd");

-- CreateIndex
CREATE INDEX "SubscriptionEntitlement_subscriptionId_idx" ON "SubscriptionEntitlement"("subscriptionId");

-- CreateIndex
CREATE INDEX "SubscriptionEntitlement_planEntitlementId_idx" ON "SubscriptionEntitlement"("planEntitlementId");

-- CreateIndex
CREATE INDEX "SubscriptionEntitlement_usageResetAt_idx" ON "SubscriptionEntitlement"("usageResetAt");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionEntitlement_subscriptionId_key_key" ON "SubscriptionEntitlement"("subscriptionId", "key");

-- CreateIndex
CREATE INDEX "SubscriptionUsageRecord_subscriptionId_idx" ON "SubscriptionUsageRecord"("subscriptionId");

-- CreateIndex
CREATE INDEX "SubscriptionUsageRecord_entitlementId_idx" ON "SubscriptionUsageRecord"("entitlementId");

-- CreateIndex
CREATE INDEX "SubscriptionUsageRecord_serviceRequestId_idx" ON "SubscriptionUsageRecord"("serviceRequestId");

-- CreateIndex
CREATE INDEX "SubscriptionUsageRecord_occurredAt_idx" ON "SubscriptionUsageRecord"("occurredAt");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

-- CreateIndex
CREATE INDEX "Invoice_clientId_idx" ON "Invoice"("clientId");

-- CreateIndex
CREATE INDEX "Invoice_createdById_idx" ON "Invoice"("createdById");

-- CreateIndex
CREATE INDEX "Invoice_sourceType_idx" ON "Invoice"("sourceType");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE INDEX "Invoice_orderId_idx" ON "Invoice"("orderId");

-- CreateIndex
CREATE INDEX "Invoice_quoteId_idx" ON "Invoice"("quoteId");

-- CreateIndex
CREATE INDEX "Invoice_subscriptionId_idx" ON "Invoice"("subscriptionId");

-- CreateIndex
CREATE INDEX "Invoice_projectId_idx" ON "Invoice"("projectId");

-- CreateIndex
CREATE INDEX "Invoice_serviceRequestId_idx" ON "Invoice"("serviceRequestId");

-- CreateIndex
CREATE INDEX "Invoice_issuedAt_idx" ON "Invoice"("issuedAt");

-- CreateIndex
CREATE INDEX "Invoice_dueAt_idx" ON "Invoice"("dueAt");

-- CreateIndex
CREATE INDEX "Invoice_createdAt_idx" ON "Invoice"("createdAt");

-- CreateIndex
CREATE INDEX "InvoiceItem_invoiceId_idx" ON "InvoiceItem"("invoiceId");

-- CreateIndex
CREATE INDEX "InvoiceItem_type_idx" ON "InvoiceItem"("type");

-- CreateIndex
CREATE INDEX "InvoiceItem_productVariantId_idx" ON "InvoiceItem"("productVariantId");

-- CreateIndex
CREATE INDEX "InvoiceItem_serviceId_idx" ON "InvoiceItem"("serviceId");

-- CreateIndex
CREATE INDEX "InvoiceItem_servicePlanId_idx" ON "InvoiceItem"("servicePlanId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentRefund_reference_key" ON "PaymentRefund"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentRefund_providerReference_key" ON "PaymentRefund"("providerReference");

-- CreateIndex
CREATE INDEX "PaymentRefund_paymentId_idx" ON "PaymentRefund"("paymentId");

-- CreateIndex
CREATE INDEX "PaymentRefund_status_idx" ON "PaymentRefund"("status");

-- CreateIndex
CREATE INDEX "PaymentRefund_createdAt_idx" ON "PaymentRefund"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoPayment_paymentId_key" ON "CryptoPayment"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoPayment_providerReference_key" ON "CryptoPayment"("providerReference");

-- CreateIndex
CREATE INDEX "CryptoPayment_assetSymbol_idx" ON "CryptoPayment"("assetSymbol");

-- CreateIndex
CREATE INDEX "CryptoPayment_network_idx" ON "CryptoPayment"("network");

-- CreateIndex
CREATE INDEX "CryptoPayment_status_idx" ON "CryptoPayment"("status");

-- CreateIndex
CREATE INDEX "CryptoPayment_expiresAt_idx" ON "CryptoPayment"("expiresAt");

-- CreateIndex
CREATE INDEX "CryptoTransaction_cryptoPaymentId_idx" ON "CryptoTransaction"("cryptoPaymentId");

-- CreateIndex
CREATE INDEX "CryptoTransaction_status_idx" ON "CryptoTransaction"("status");

-- CreateIndex
CREATE INDEX "CryptoTransaction_detectedAt_idx" ON "CryptoTransaction"("detectedAt");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoTransaction_network_txHash_key" ON "CryptoTransaction"("network", "txHash");

-- CreateIndex
CREATE INDEX "Conversation_subscriptionId_idx" ON "Conversation"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_providerReference_key" ON "Payment"("providerReference");

-- CreateIndex
CREATE INDEX "Payment_invoiceId_idx" ON "Payment"("invoiceId");

-- CreateIndex
CREATE INDEX "Payment_payerId_idx" ON "Payment"("payerId");

-- CreateIndex
CREATE INDEX "Payment_method_idx" ON "Payment"("method");

-- CreateIndex
CREATE INDEX "Payment_createdAt_idx" ON "Payment"("createdAt");

-- CreateIndex
CREATE INDEX "Project_subscriptionId_idx" ON "Project"("subscriptionId");

-- CreateIndex
CREATE INDEX "QuoteItem_serviceId_idx" ON "QuoteItem"("serviceId");

-- CreateIndex
CREATE INDEX "QuoteItem_servicePlanId_idx" ON "QuoteItem"("servicePlanId");

-- CreateIndex
CREATE INDEX "ServiceRequest_subscriptionId_idx" ON "ServiceRequest"("subscriptionId");

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "ClientSubscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteItem" ADD CONSTRAINT "QuoteItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteItem" ADD CONSTRAINT "QuoteItem_servicePlanId_fkey" FOREIGN KEY ("servicePlanId") REFERENCES "ServicePlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePlan" ADD CONSTRAINT "ServicePlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePlan" ADD CONSTRAINT "ServicePlan_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePlanService" ADD CONSTRAINT "ServicePlanService_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ServicePlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePlanService" ADD CONSTRAINT "ServicePlanService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePlanPrice" ADD CONSTRAINT "ServicePlanPrice_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ServicePlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePlanEntitlement" ADD CONSTRAINT "ServicePlanEntitlement_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ServicePlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePlanEntitlement" ADD CONSTRAINT "ServicePlanEntitlement_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientSubscription" ADD CONSTRAINT "ClientSubscription_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientSubscription" ADD CONSTRAINT "ClientSubscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ServicePlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientSubscription" ADD CONSTRAINT "ClientSubscription_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "ServicePlanPrice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientSubscription" ADD CONSTRAINT "ClientSubscription_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientSubscription" ADD CONSTRAINT "ClientSubscription_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionEntitlement" ADD CONSTRAINT "SubscriptionEntitlement_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "ClientSubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionEntitlement" ADD CONSTRAINT "SubscriptionEntitlement_planEntitlementId_fkey" FOREIGN KEY ("planEntitlementId") REFERENCES "ServicePlanEntitlement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionUsageRecord" ADD CONSTRAINT "SubscriptionUsageRecord_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "ClientSubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionUsageRecord" ADD CONSTRAINT "SubscriptionUsageRecord_entitlementId_fkey" FOREIGN KEY ("entitlementId") REFERENCES "SubscriptionEntitlement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionUsageRecord" ADD CONSTRAINT "SubscriptionUsageRecord_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "ServiceRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "ClientSubscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "ClientSubscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "ServiceRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_servicePlanId_fkey" FOREIGN KEY ("servicePlanId") REFERENCES "ServicePlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentRefund" ADD CONSTRAINT "PaymentRefund_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoPayment" ADD CONSTRAINT "CryptoPayment_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoTransaction" ADD CONSTRAINT "CryptoTransaction_cryptoPaymentId_fkey" FOREIGN KEY ("cryptoPaymentId") REFERENCES "CryptoPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "ClientSubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
