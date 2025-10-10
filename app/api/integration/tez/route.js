import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchurl = new URL(request.url);
  const searchParams = new URLSearchParams(searchurl.search);

  const orderId = searchParams.get("order_id");
  const customerMobile = searchParams.get("customer_mobile");
  const utr = searchParams.get("utr");
  const amount = searchParams.get("amount");
  const method = searchParams.get("method");
  const status = searchParams.get("status");

  console.log(orderId, status, customerMobile, amount, method);

  return NextResponse.json({
    status: "success",
    message: "we have received your callback",
  });
}

export async function POST(request) {
  try {
    const headersList = await headers();
    const content_type = headersList.get("content-type");
    console.log(content_type);
    if (content_type === "application/json") {
      const { orderId, status, customerMobile, amount, method, utr } = await request.json();
      console.log(orderId, status, customerMobile, amount, method, utr);
    } else if (content_type === "application/xml") {
      console.log("xml parser");
    } else {
      const formData = await request.formData();
      const orderId = formData.get("order_id");
      const customerMobile = formData.get("customer_mobile");
      const utr = formData.get("utr");
      const amount = formData.get("amount");
      const method = formData.get("method");
      const status = formData.get("status");
      console.log(orderId, status, customerMobile, amount, method, utr);
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
