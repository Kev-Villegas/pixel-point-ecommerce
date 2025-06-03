import { auth } from "@/app/_lib/auth";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import sha1 from "sha1";

const getPublicIdFromUrl = (url: string) => {
  const regex = /upload\/(?:v\d+\/)?([^\.]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export async function DELETE(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.email || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ success: false, message: "No URL found" });
  }

  const publicId = getPublicIdFromUrl(url);
  if (!publicId) {
    return NextResponse.json({ success: false, message: "Invalid URL format" });
  }

  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!apiSecret || !apiKey || !cloudName) {
    return NextResponse.json({
      success: false,
      message: "Missing Cloudinary configuration",
    });
  }

  const timestamp = new Date().getTime();
  const string = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = sha1(string);

  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("signature", signature);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      formData,
    );

    if (response.data.result === "not found") {
      return NextResponse.json(response.data, { status: 404 });
    }

    return NextResponse.json({ message: "Image Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete image", error },
      { status: 500 },
    );
  }
}
