/*
  Warnings:

  - You are about to drop the column `sent` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PAGO_PENDIENTE', 'ENVIO_PENDIENTE', 'ENVIADO', 'ENTREGADO');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "sent",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PAGO_PENDIENTE';
