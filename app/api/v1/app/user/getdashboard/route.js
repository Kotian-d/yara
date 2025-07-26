import ConnectDB from "@/app/db/connectDb";
import { NextResponse } from "next/server";

export async function GET(request) {
  await ConnectDB();
  return NextResponse.json({
    balance: 1000.00,
    opening: 0.00,
    purchase: 2000.00,
    sale: 1060.00,
    commission: 60.00,
  });
}
