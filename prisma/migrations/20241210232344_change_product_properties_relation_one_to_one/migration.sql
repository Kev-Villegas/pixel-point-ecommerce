/*
  Warnings:

  - You are about to drop the column `propertiesId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Properties` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_propertiesId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "propertiesId";

-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "productId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Properties_productId_key" ON "Properties"("productId");

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
