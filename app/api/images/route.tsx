import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import sha1 from "sha1";

const getPublicIdFromUrl = (url: string) => {
  const regex = /upload\/(?:v\d+\/)?([^\.]+)/;

  const match = url.match(regex);
  return match ? match[1] : null;
};

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ success: false, message: "no url found" });
  }

  const publicId = getPublicIdFromUrl(url);
  const timestamp = new Date().getTime();
  const string = `public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;

  const signature = sha1(string);
  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("signature", signature);
  formData.append("api_key", process.env.CLOUDINARY_API_KEY);
  formData.append("timestamp", timestamp);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
    formData,
  );

  if (response.data.result === "not found") {
    return NextResponse.json(response.data, { status: 404 });
  }

  return NextResponse.json({ message: "Image Deleted" }, { status: 200 });
}
