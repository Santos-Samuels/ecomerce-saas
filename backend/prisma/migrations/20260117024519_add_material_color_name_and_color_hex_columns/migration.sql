/*
  Warnings:

  - You are about to drop the column `color` on the `ProductMaterial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductMaterial" DROP COLUMN "color",
ADD COLUMN     "colorHex" TEXT,
ADD COLUMN     "colorName" TEXT;
