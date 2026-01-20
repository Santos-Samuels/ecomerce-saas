-- CreateTable
CREATE TABLE "StoreLayout" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "heroTitle" TEXT,
    "heroSubtitle" TEXT,
    "heroButtonText" TEXT,
    "heroButtonLink" TEXT,
    "heroBackgroundImage" TEXT,
    "aboutTitle" TEXT,
    "aboutDescription" TEXT,
    "aboutImage" TEXT,
    "showFeedbacks" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoreLayout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoreLayout_storeId_key" ON "StoreLayout"("storeId");

-- AddForeignKey
ALTER TABLE "StoreLayout" ADD CONSTRAINT "StoreLayout_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
