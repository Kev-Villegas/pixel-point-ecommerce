import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "iPhone 14 Pro",
      description: "El último smartphone de Apple con Dynamic Island.",
      brand: "Apple",
      stock: true,
      price: 999.99,
      images: {
        create: [{ url: "https://example.com/images/iphone-14-pro.jpg" }],
      },
      properties: {
        create: {
          model: "14 Pro",
          capacity: "256GB",
          ram: "6GB",
          color: "Negro Espacial",
          rearCamera: "48 MP",
          frontCamera: "12 MP",
          battery: "3200 mAh",
          fastCharging: true,
          operatingSystem: "iOS 17",
          screenSize: "6.1 pulgadas",
        },
      },
    },
    {
      name: "Samsung Galaxy S23 Ultra",
      description: "Potente smartphone con S Pen integrado.",
      brand: "Samsung",
      stock: true,
      price: 1199.99,
      images: {
        create: [{ url: "https://example.com/images/galaxy-s23-ultra.jpg" }],
      },
      properties: {
        create: {
          model: "S23 Ultra",
          capacity: "512GB",
          ram: "12GB",
          color: "Phantom Black",
          rearCamera: "200 MP",
          frontCamera: "12 MP",
          battery: "5000 mAh",
          fastCharging: true,
          operatingSystem: "Android 13",
          screenSize: "6.8 pulgadas",
        },
      },
    },
    {
      name: "Google Pixel 8",
      description:
        "El smartphone de Google con la mejor experiencia de Android.",
      brand: "Google",
      stock: true,
      price: 799.99,
      images: {
        create: [{ url: "https://example.com/images/pixel-8.jpg" }],
      },
      properties: {
        create: {
          model: "Pixel 8",
          capacity: "128GB",
          ram: "8GB",
          color: "Obsidian",
          rearCamera: "50 MP",
          frontCamera: "12 MP",
          battery: "4700 mAh",
          fastCharging: true,
          operatingSystem: "Android 14",
          screenSize: "6.2 pulgadas",
        },
      },
    },
    // Agrega 7 productos más aquí con marcas reales como Xiaomi, OnePlus, Huawei, Motorola, etc.
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Productos agregados exitosamente.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
