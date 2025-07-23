import ConnectDB from "@/app/db/connectDb";
import { NextResponse } from "next/server";

export async function POST(request) {
  await ConnectDB();
  const { mobile, password } = await request.json();
  console.log(mobile, password);

  if(mobile !== "9739283261" || password !== "pass1234") {
    return NextResponse.json({ status: "error", message: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ status: "success", message: "Login successful" }, { status: 200  });
}
