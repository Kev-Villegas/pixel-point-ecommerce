/*
  Warnings:

  - You are about to drop the column `brand` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `propertiesId` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[colorName]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[total]` on the table `Storage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_propertiesId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `brand`,
    DROP COLUMN `propertiesId`,
    ADD COLUMN `brandId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brandname` VARCHAR(191) NOT NULL,
    `propertiesId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Color_colorName_key` ON `Color`(`colorName`);

-- CreateIndex
CREATE UNIQUE INDEX `Storage_total_key` ON `Storage`(`total`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Brand` ADD CONSTRAINT `Brand_propertiesId_fkey` FOREIGN KEY (`propertiesId`) REFERENCES `Properties`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
