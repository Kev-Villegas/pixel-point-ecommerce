-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "stock" BOOLEAN NOT NULL DEFAULT true,
    "price" DOUBLE PRECISION NOT NULL,
    "orderId" INTEGER,
    "propertiesId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "rearCamera" TEXT,
    "frontCamera" TEXT,
    "battery" TEXT,
    "fastCharging" BOOLEAN,
    "operatingSystem" TEXT,
    "processor" TEXT,
    "graphics" TEXT,
    "simCard" TEXT,
    "chipset" TEXT,
    "connectivity" TEXT,
    "navigation" TEXT,
    "network2G" TEXT,
    "network3G" TEXT,
    "network4G" TEXT,
    "network5G" TEXT,
    "screenType" TEXT,
    "screenSize" TEXT,
    "screenResolution" TEXT,
    "audio" TEXT,
    "sensors" TEXT,
    "features" TEXT,
    "weight" TEXT,
    "dimensions" TEXT,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "Properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
