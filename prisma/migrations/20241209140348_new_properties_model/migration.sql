/*
  Warnings:

  - You are about to drop the `color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `storage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `capacity` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ram` to the `Properties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `color` DROP FOREIGN KEY `Color_propertiesId_fkey`;

-- DropForeignKey
ALTER TABLE `storage` DROP FOREIGN KEY `Storage_propertiesId_fkey`;

-- AlterTable
ALTER TABLE `properties` ADD COLUMN `audio` VARCHAR(191) NULL,
    ADD COLUMN `battery` VARCHAR(191) NULL,
    ADD COLUMN `capacity` VARCHAR(191) NOT NULL,
    ADD COLUMN `chipset` VARCHAR(191) NULL,
    ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `connectivity` VARCHAR(191) NULL,
    ADD COLUMN `dimensions` VARCHAR(191) NULL,
    ADD COLUMN `fastCharging` BOOLEAN NULL,
    ADD COLUMN `features` VARCHAR(191) NULL,
    ADD COLUMN `frontCamera` VARCHAR(191) NULL,
    ADD COLUMN `graphics` VARCHAR(191) NULL,
    ADD COLUMN `model` VARCHAR(191) NOT NULL,
    ADD COLUMN `navigation` VARCHAR(191) NULL,
    ADD COLUMN `network2G` VARCHAR(191) NULL,
    ADD COLUMN `network3G` VARCHAR(191) NULL,
    ADD COLUMN `network4G` VARCHAR(191) NULL,
    ADD COLUMN `network5G` VARCHAR(191) NULL,
    ADD COLUMN `operatingSystem` VARCHAR(191) NULL,
    ADD COLUMN `processor` VARCHAR(191) NULL,
    ADD COLUMN `ram` VARCHAR(191) NOT NULL,
    ADD COLUMN `rearCamera` VARCHAR(191) NULL,
    ADD COLUMN `screenResolution` VARCHAR(191) NULL,
    ADD COLUMN `screenSize` VARCHAR(191) NULL,
    ADD COLUMN `screenType` VARCHAR(191) NULL,
    ADD COLUMN `sensors` VARCHAR(191) NULL,
    ADD COLUMN `simCard` VARCHAR(191) NULL,
    ADD COLUMN `weight` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `color`;

-- DropTable
DROP TABLE `storage`;
