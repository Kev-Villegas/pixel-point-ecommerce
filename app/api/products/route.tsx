import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const products = await db.product.findMany();

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {}
