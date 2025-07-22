import ConnectDB from "@/app/db/connectDb";
import { NextResponse } from "next/server";

export async function GET(request) {
  await ConnectDB();
  return NextResponse.json({
    balance: 1000.0,
    opening: 0.0,
    purchase: 2000.0,
    sale: 1060.0,
    commission: 60.0,
  });
}
