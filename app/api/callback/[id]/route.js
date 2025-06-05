import api from "@/app/model/apis";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  const searchurl = new URL(request.url);
  const searchParams = new URLSearchParams(searchurl.search);
  const apis = await api.findOne({ id: id });

  const reqid = searchParams.get("reqid");
  const mn = searchParams.get("mn");
  const amt = searchParams.get("amt");
  const status = searchParams.get("status");

  return NextResponse.json({
    status: "success",
    message: "we have received your callback",
  });
}

export async function POST(request, { params }) {
  const { id } = await params;
  try {
    const headersList = await headers();
    const content_type = headersList.get("content-type");
    console.log(content_type);
    if (content_type === "application/json") {
      const { reqid, status, mn, amt } = await request.json();
      console.log(reqid, status, mn, amt);
    } else if (content_type === "application/xml") {
      console.log("xml parser");
    } else {
      const formData = await request.formData();
      const reqid = formData.get("reqid");
      const mn = formData.get("mn");
      const amt = formData.get("amt");
      const status = formData.get("status");
      console.log(reqid, status, mn, amt);
    }
    return NextResponse.json({
    status: "success",
    message: "we have received your callback",
  });
  } catch (error) {
    return NextResponse.json({
    status: "error",
    message: error.message,
  });
  }

  
}
