import { NextRequest } from "next/server";

export function getClientContext(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  const cf = req.headers.get("cf-connecting-ip");
  const xr = req.headers.get("x-real-ip");
  const ip = (xff ? xff.split(",")[0].trim() : cf || xr || "unknown") as string;
  const userAgent = req.headers.get("user-agent") || "unknown";
  return { ip, userAgent };
}
