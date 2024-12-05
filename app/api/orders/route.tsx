import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const orders = await db.order.findMany();

  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {}
