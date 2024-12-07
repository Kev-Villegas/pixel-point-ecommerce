/*
  Warnings:

  - You are about to drop the column `brandId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `brand` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `brand` DROP FOREIGN KEY `Brand_propertiesId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_brandId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `brandId`,
    ADD COLUMN `brand` VARCHAR(191) NOT NULL,
    ADD COLUMN `propertiesId` INTEGER NULL;

-- DropTable
DROP TABLE `brand`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_propertiesId_fkey` FOREIGN KEY (`propertiesId`) REFERENCES `Properties`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
