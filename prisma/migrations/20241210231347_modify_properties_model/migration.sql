/*
  Warnings:

  - You are about to drop the column `fastCharging` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `frontCamera` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `network2G` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `network3G` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `network4G` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `network5G` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `operatingSystem` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `rearCamera` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `screenResolution` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `screenSize` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `screenType` on the `Properties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Properties" DROP COLUMN "fastCharging",
DROP COLUMN "frontCamera",
DROP COLUMN "network2G",
DROP COLUMN "network3G",
DROP COLUMN "network4G",
DROP COLUMN "network5G",
DROP COLUMN "operatingSystem",
DROP COLUMN "rearCamera",
DROP COLUMN "screenResolution",
DROP COLUMN "screenSize",
DROP COLUMN "screenType",
ADD COLUMN     "fastcharging" BOOLEAN,
ADD COLUMN     "frontcamera" TEXT,
ADD COLUMN     "network2g" TEXT,
ADD COLUMN     "network3g" TEXT,
ADD COLUMN     "network4g" TEXT,
ADD COLUMN     "network5g" TEXT,
ADD COLUMN     "operatingsystem" TEXT,
ADD COLUMN     "rearcamera" TEXT,
ADD COLUMN     "screenresolution" TEXT,
ADD COLUMN     "screensize" TEXT,
ADD COLUMN     "screentype" TEXT;
