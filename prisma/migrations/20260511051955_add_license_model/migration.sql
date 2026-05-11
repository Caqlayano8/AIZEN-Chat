-- CreateTable
CREATE TABLE "License" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "plan" TEXT NOT NULL DEFAULT 'starter',
    "maxUsers" INTEGER NOT NULL DEFAULT 3,
    "maxContacts" INTEGER NOT NULL DEFAULT 500,
    "maxChannels" INTEGER NOT NULL DEFAULT 2,
    "features" TEXT NOT NULL DEFAULT '[]',
    "signature" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "issuedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "License_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "License_key_key" ON "License"("key");
