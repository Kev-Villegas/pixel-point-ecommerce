// app/api/dashboard/recent-orders/route.ts
import { getRecentOrders } from "@/app/_lib/queries/getRecentOrders";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getRecentOrders();
  return NextResponse.json(data);
}
