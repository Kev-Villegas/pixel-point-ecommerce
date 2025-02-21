/*
  Warnings:

  - You are about to drop the column `simCard` on the `Properties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Properties" DROP COLUMN "simCard",
ADD COLUMN     "simcard" TEXT;
