import { scrapeProduct } from "@/app/_lib/scraper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 },
      );
    }

    const scrapedData = await scrapeProduct(url);

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

export async function GET() {
  return NextResponse.json({
    message: "Product Scraper API",
    usage: 'POST a JSON body with { "url": "https://..." }',
  });
}
