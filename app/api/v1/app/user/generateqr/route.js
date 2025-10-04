import { NextResponse } from "next/server";
import CreateOrderAPI from "@/app/services/tezgateway";

export async function POST(request) {
    const { amount } = await request.json();
  const api = new CreateOrderAPI("https://tezgateway.com/api/create-order");
  try {
    await api.createOrder(
      "9739283261",
      "2e4de2cdf3abaf525644f88de06e4436",
      amount,
      "8787772321800",
      "https://https://yara-one.vercel.app/callback/8787772321800",
      "testremark",
      "testremark2"
    );

    console.log("Order created:", order);
    return NextResponse.json({ order });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json({ error: error.message });
  }
}
