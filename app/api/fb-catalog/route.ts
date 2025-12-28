import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Importante para que no se cachee estáticamente en build

export async function GET() {
  try {
    const products = await db.product.findMany({
      // where: {
      //   stock: {
      //     gt: 0
      //   }
      // },
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const baseUrl = "https://pixel-point.com.ar";

    let xml = `<?xml version="1.0"?>
    <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
    <channel>
    <title>Pixel Point Catalogo</title>
    <link>${baseUrl}</link>
    <description>Catálogo de productos Pixel Point</description>
    `;

    products.forEach((product) => {
      const availability = product.stock > 0 ? "in stock" : "out of stock";

      const mainImage = product.images[0]?.url || "";
      const additionalImages = product.images
        .slice(1, 10)
        .map((img) => img.url);

      const productLink = `${baseUrl}/productos/${product.id}`;

      xml += `
      <item>
        <g:id>${product.id}</g:id>
        <g:title><![CDATA[${product.name}]]></g:title>
        <g:description><![CDATA[${product.description || product.name}]]></g:description>
        <g:link>${productLink}</g:link>
        <g:image_link>${mainImage}</g:image_link>
        <g:brand><![CDATA[${typeof product.brand === "string" ? product.brand : "Genérico"}]]></g:brand>
        <g:condition>new</g:condition>
        <g:availability>${availability}</g:availability>
        <g:price>${product.price} ARS</g:price>
        ${additionalImages.map((url) => `<g:additional_image_link>${url}</g:additional_image_link>`).join("")}
      </item>
      `;
    });

    xml += `
    </channel>
    </rss>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generando catálogo FB:", error);
    return new NextResponse("Error generating feed", { status: 500 });
  }
}
