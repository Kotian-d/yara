import ConnectDB from "@/app/db/connectDb";
import users from "@/app/model/users";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await ConnectDB();
    const userId = request.headers.get("isAuthorized");

    const user = await users.findOne({ _id: userId });

    if (!user)
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 401 }
      );

    const { name, mobile, email } = await users.findOne({
      _id: userId,
    });

    return NextResponse.json({
        name,
        mobile,
        email
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }
}