import ConnectDB from "@/app/db/connectDb";
import { NextResponse } from "next/server";

export async function POST(request) {
  await ConnectDB();
  const { mobile, password } = await request.json();
  console.log(mobile, password);

  return NextResponse.json({ status: "success" });
}
