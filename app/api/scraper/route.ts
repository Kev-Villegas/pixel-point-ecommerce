import { scrapeProduct } from "@/app/_lib/scraper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    // Validar que se proporcione una URL
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validar que sea una URL válida
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 },
      );
    }

    // Hacer scraping del producto
    const scrapedData = await scrapeProduct(url);

    // TODO: Descomentar cuando se confirme desde el modal
    // Crear el producto en la base de datos
    // const product = await db.product.create({
    //   data: {
    //     name: scrapedData.name,
    //     description: scrapedData.description,
    //     brand: scrapedData.brand,
    //     price: scrapedData.price,
    //     stock: scrapedData.stock,
    //     properties: {
    //       create: Object.fromEntries(
    //         Object.entries(scrapedData.properties).filter(([, v]) => v !== undefined)
    //       ) as any,
    //     },
    //   },
    //   include: {
    //     properties: true,
    //     images: true,
    //   },
    // });

    // // Descargar y guardar imágenes
    // let imagesCount = 0;
    // if (scrapedData.images.length > 0) {
    //   const savedImagePaths = await downloadAndSaveImages(
    //     scrapedData.images,
    //     product.id
    //   );

    //   imagesCount = savedImagePaths.length;

    //   // Guardar referencias de imágenes en la BD
    //   for (const imagePath of savedImagePaths) {
    //     await db.image.create({
    //       data: {
    //         url: imagePath,
    //         productId: product.id,
    //       },
    //     });
    //   }
    // }

    // Retornar solo los datos extraídos para preview en modal
    return NextResponse.json(
      {
        success: true,
        message: "Product data scraped successfully",
        data: scrapedData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      {
        error: "Failed to scrape product",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// GET endpoint para ver estado
export async function GET() {
  return NextResponse.json({
    message: "Product Scraper API",
    usage: 'POST a JSON body with { "url": "https://..." }',
  });
}
