import ConnectDB from "@/app/db/connectDb";
import recharge from "@/app/services/recharge";
import { NextResponse } from "next/server";

export async function GET(request) {
  await ConnectDB();
  const searchurl = new URL(request.url);
  const searchParams = new URLSearchParams(searchurl.search);
  const api_token = searchParams.get("api_token");
  const mn = searchParams.get("mn");
  const amt = searchParams.get("amt");
  const opcode = searchParams.get("opcode");

  const response = await recharge(mn, amt, opcode, api_token);

  return NextResponse.json(response);
}

export async function POST(request) {
  await ConnectDB();
  const { mn, amt, opcode, api_token } = await request.json();
  console.log(mn, amt, opcode, api_token);

  return NextResponse.json({ status: "success" });
}
