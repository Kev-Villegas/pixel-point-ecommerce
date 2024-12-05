import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  params: Promise<{ id: string }>,
) {
  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id: parseInt(id) },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}

export async function POST(request: NextRequest) {}
