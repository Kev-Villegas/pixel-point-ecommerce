import { getMonthlyTrends } from "@/app/_lib/queries/getMonthlyTrends";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getMonthlyTrends();
  return NextResponse.json(data);
}
