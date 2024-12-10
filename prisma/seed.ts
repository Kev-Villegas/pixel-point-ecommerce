import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({});
  await prisma.image.deleteMany({});
  await prisma.properties.deleteMany({});

  const products = [
    {
      name: "Samsung Galaxy S23 Ultra",
      description: "El último smartphone de Samsung con cámara de 200 MP.",
      brand: "Samsung",
      price: 1199.99,
      images: {
        create: [{ url: "https://example.com/images/galaxy-s23-ultra.jpg" }],
      },
      Properties: {
        create: {
          model: "Galaxy S23 Ultra",
          capacity: "256GB",
          ram: "12GB",
          color: "Phantom Black",
          battery: "5000 mAh",
        },
      },
    },
    {
      name: "iPhone 15 Pro Max",
      description: "El smartphone de Apple con el chip más avanzado, el A17.",
      brand: "Apple",
      price: 1399.99,
      images: {
        create: [{ url: "https://example.com/images/iphone-15-pro-max.jpg" }],
      },
      Properties: {
        create: {
          model: "iPhone 15 Pro Max",
          capacity: "512GB",
          ram: "8GB",
          color: "Titanium Gray",
          battery: "4323 mAh",
        },
      },
    },
    {
      name: "Google Pixel 8 Pro",
      description:
        "El smartphone de Google con la mejor experiencia de Android y cámara avanzada.",
      brand: "Google",
      price: 899.99,
      images: {
        create: [{ url: "https://example.com/images/pixel-8-pro.jpg" }],
      },
      Properties: {
        create: {
          model: "Pixel 8 Pro",
          capacity: "128GB",
          ram: "12GB",
          color: "Obsidian",
          battery: "5000 mAh",
        },
      },
    },
    {
      name: "OnePlus 11",
      description: "Un smartphone rápido y eficiente, con Snapdragon 8 Gen 2.",
      brand: "OnePlus",
      price: 799.99,
      images: {
        create: [{ url: "https://example.com/images/oneplus-11.jpg" }],
      },
      Properties: {
        create: {
          model: "OnePlus 11",
          capacity: "256GB",
          ram: "16GB",
          color: "Emerald Green",
          battery: "5000 mAh",
        },
      },
    },
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
