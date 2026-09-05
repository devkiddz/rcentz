-- CreateEnum
CREATE TYPE "ServiceRequestKind" AS ENUM ('STANDARD', 'CUSTOM_OFFER');

-- CreateEnum
CREATE TYPE "ServiceQuestionType" AS ENUM ('SHORT_TEXT', 'LONG_TEXT', 'NUMBER', 'URL', 'EMAIL', 'PHONE', 'BOOLEAN', 'SINGLE_SELECT', 'MULTI_SELECT', 'DATE');

-- AlterEnum
ALTER TYPE "ServiceRequestStatus" ADD VALUE 'DRAFT';

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "deliveryMaxDays" INTEGER,
ADD COLUMN     "deliveryMinDays" INTEGER,
ADD COLUMN     "deliveryNote" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ServiceCategory" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "kind" "ServiceRequestKind" NOT NULL DEFAULT 'STANDARD',
ADD COLUMN     "onboardingCompletedAt" TIMESTAMP(3),
ADD COLUMN     "preferredDeadlineAt" TIMESTAMP(3),
ADD COLUMN     "preferredStartAt" TIMESTAMP(3),
ADD COLUMN     "submittedAt" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "ServiceTechnology" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "category" TEXT,
    "description" TEXT,
    "purpose" TEXT,
    "rationale" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceTechnology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceFeature" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "expectedOutcome" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceOutcome" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceOutcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceMilestoneTemplate" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "purpose" TEXT,
    "expectedOutcome" TEXT,
    "minDays" INTEGER,
    "maxDays" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceMilestoneTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceFaq" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceFaq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceOnboardingQuestion" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "helpText" TEXT,
    "placeholder" TEXT,
    "type" "ServiceQuestionType" NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceOnboardingQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceOnboardingOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceOnboardingOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceRequestAnswer" (
    "id" TEXT NOT NULL,
    "serviceRequestId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "questionLabel" TEXT NOT NULL,
    "questionType" "ServiceQuestionType" NOT NULL,
    "textValue" TEXT,
    "numberValue" DECIMAL(20,4),
    "booleanValue" BOOLEAN,
    "dateValue" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceRequestAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceRequestAnswerOption" (
    "answerId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,

    CONSTRAINT "ServiceRequestAnswerOption_pkey" PRIMARY KEY ("answerId","optionId")
);

-- CreateIndex
CREATE INDEX "ServiceTechnology_serviceId_sortOrder_idx" ON "ServiceTechnology"("serviceId", "sortOrder");

-- CreateIndex
CREATE INDEX "ServiceTechnology_slug_idx" ON "ServiceTechnology"("slug");

-- CreateIndex
CREATE INDEX "ServiceTechnology_featured_idx" ON "ServiceTechnology"("featured");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceTechnology_serviceId_slug_key" ON "ServiceTechnology"("serviceId", "slug");

-- CreateIndex
CREATE INDEX "ServiceFeature_serviceId_sortOrder_idx" ON "ServiceFeature"("serviceId", "sortOrder");

-- CreateIndex
CREATE INDEX "ServiceFeature_featured_idx" ON "ServiceFeature"("featured");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceFeature_serviceId_slug_key" ON "ServiceFeature"("serviceId", "slug");

-- CreateIndex
CREATE INDEX "ServiceOutcome_serviceId_sortOrder_idx" ON "ServiceOutcome"("serviceId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceOutcome_serviceId_slug_key" ON "ServiceOutcome"("serviceId", "slug");

-- CreateIndex
CREATE INDEX "ServiceMilestoneTemplate_serviceId_sortOrder_idx" ON "ServiceMilestoneTemplate"("serviceId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceMilestoneTemplate_serviceId_slug_key" ON "ServiceMilestoneTemplate"("serviceId", "slug");

-- CreateIndex
CREATE INDEX "ServiceFaq_serviceId_sortOrder_idx" ON "ServiceFaq"("serviceId", "sortOrder");

-- CreateIndex
CREATE INDEX "ServiceFaq_featured_idx" ON "ServiceFaq"("featured");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceFaq_serviceId_slug_key" ON "ServiceFaq"("serviceId", "slug");

-- CreateIndex
CREATE INDEX "ServiceOnboardingQuestion_serviceId_sortOrder_idx" ON "ServiceOnboardingQuestion"("serviceId", "sortOrder");

-- CreateIndex
CREATE INDEX "ServiceOnboardingQuestion_active_idx" ON "ServiceOnboardingQuestion"("active");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceOnboardingQuestion_serviceId_key_key" ON "ServiceOnboardingQuestion"("serviceId", "key");

-- CreateIndex
CREATE INDEX "ServiceOnboardingOption_questionId_sortOrder_idx" ON "ServiceOnboardingOption"("questionId", "sortOrder");

-- CreateIndex
CREATE INDEX "ServiceOnboardingOption_active_idx" ON "ServiceOnboardingOption"("active");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceOnboardingOption_questionId_value_key" ON "ServiceOnboardingOption"("questionId", "value");

-- CreateIndex
CREATE INDEX "ServiceRequestAnswer_serviceRequestId_idx" ON "ServiceRequestAnswer"("serviceRequestId");

-- CreateIndex
CREATE INDEX "ServiceRequestAnswer_questionId_idx" ON "ServiceRequestAnswer"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceRequestAnswer_serviceRequestId_questionId_key" ON "ServiceRequestAnswer"("serviceRequestId", "questionId");

-- CreateIndex
CREATE INDEX "ServiceRequestAnswerOption_optionId_idx" ON "ServiceRequestAnswerOption"("optionId");

-- CreateIndex
CREATE INDEX "Service_sortOrder_idx" ON "Service"("sortOrder");

-- CreateIndex
CREATE INDEX "Service_publishedAt_idx" ON "Service"("publishedAt");

-- CreateIndex
CREATE INDEX "ServiceCategory_sortOrder_idx" ON "ServiceCategory"("sortOrder");

-- CreateIndex
CREATE INDEX "ServiceCategory_featured_idx" ON "ServiceCategory"("featured");

-- CreateIndex
CREATE INDEX "ServiceRequest_kind_idx" ON "ServiceRequest"("kind");

-- CreateIndex
CREATE INDEX "ServiceRequest_submittedAt_idx" ON "ServiceRequest"("submittedAt");

-- AddForeignKey
ALTER TABLE "ServiceTechnology" ADD CONSTRAINT "ServiceTechnology_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceFeature" ADD CONSTRAINT "ServiceFeature_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOutcome" ADD CONSTRAINT "ServiceOutcome_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceMilestoneTemplate" ADD CONSTRAINT "ServiceMilestoneTemplate_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceFaq" ADD CONSTRAINT "ServiceFaq_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOnboardingQuestion" ADD CONSTRAINT "ServiceOnboardingQuestion_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOnboardingOption" ADD CONSTRAINT "ServiceOnboardingOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "ServiceOnboardingQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequestAnswer" ADD CONSTRAINT "ServiceRequestAnswer_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "ServiceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequestAnswer" ADD CONSTRAINT "ServiceRequestAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "ServiceOnboardingQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequestAnswerOption" ADD CONSTRAINT "ServiceRequestAnswerOption_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "ServiceRequestAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequestAnswerOption" ADD CONSTRAINT "ServiceRequestAnswerOption_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "ServiceOnboardingOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
