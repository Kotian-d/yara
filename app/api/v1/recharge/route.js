import ConnectDB from "@/app/db/connectDb";
import { getUserByToken } from "@/app/queries/userquery";
import { NextResponse } from "next/server";

export async function GET(request) {
  await ConnectDB();
  const searchurl = new URL(request.url);
  const searchParams = new URLSearchParams(searchurl.search);
  const user = await getUserByToken(searchParams.get("api_token"));
  const api_token = searchParams.get("api_token");
  const mn = searchParams.get("mn");
  const amt = searchParams.get("amt");
  const opcode = searchParams.get("opcode");

  if (!user)
    return NextResponse.json({ status: "error", message: "Unauthorized User" });

  console.log(mn, amt, opcode, api_token);
  return NextResponse.json({ status: "success" });
}

export async function POST(request) {
  await ConnectDB();
  const { mn, amt, opcode, api_token } = await request.json();
  console.log(mn, amt, opcode, api_token);
  const user = await getUserByToken(api_token);

  if (!user)
    return NextResponse.json({ status: "error", message: "Unauthorized User" });

  return NextResponse.json({ status: "success" });
}
