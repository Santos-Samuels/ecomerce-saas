-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "instagramHandle" TEXT;

-- CreateTable
CREATE TABLE "StoreFeedback" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 5,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoreFeedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StoreFeedback" ADD CONSTRAINT "StoreFeedback_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
