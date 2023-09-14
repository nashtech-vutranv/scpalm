-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Organization" (
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT DEFAULT 'N/A',
    "logo" TEXT,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "orgId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "pName" TEXT NOT NULL,
    "pOwner" TEXT NOT NULL,
    "pStatus" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebScanResults" (
    "scanId" TEXT NOT NULL,
    "scanUrl" TEXT NOT NULL,
    "scanDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,
    "vulnTotal" INTEGER NOT NULL,
    "vulnCritical" INTEGER NOT NULL,
    "vulnHigh" INTEGER NOT NULL,
    "vulnMedium" INTEGER NOT NULL,
    "vulnLow" INTEGER NOT NULL,
    "vulnInfo" INTEGER NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "organizationOrgId" VARCHAR(255),

    CONSTRAINT "WebScanResults_pkey" PRIMARY KEY ("scanId")
);

-- CreateTable
CREATE TABLE "ZAPScanResult" (
    "vulnId" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,
    "scanUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "vulnScore" INTEGER NOT NULL DEFAULT 1,
    "solution" TEXT DEFAULT 'N/A',
    "description" TEXT DEFAULT 'N/A',
    "isntance" TEXT DEFAULT 'N/A',
    "reference" TEXT DEFAULT 'N/A',

    CONSTRAINT "ZAPScanResult_pkey" PRIMARY KEY ("vulnId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_orgId_key" ON "Organization"("orgId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WebScanResults_scanId_key" ON "WebScanResults"("scanId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("orgId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebScanResults" ADD CONSTRAINT "WebScanResults_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebScanResults" ADD CONSTRAINT "WebScanResults_organizationOrgId_fkey" FOREIGN KEY ("organizationOrgId") REFERENCES "Organization"("orgId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZAPScanResult" ADD CONSTRAINT "ZAPScanResult_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "WebScanResults"("scanId") ON DELETE RESTRICT ON UPDATE CASCADE;
