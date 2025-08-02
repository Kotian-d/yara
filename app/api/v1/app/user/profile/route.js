import ConnectDB from "@/app/db/connectDb";
import users from "@/app/model/users";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await ConnectDB();
    const userId = request.headers.get("isAuthorized");

    const user = await users.findOne({_id: userId});

    if(!user) return NextResponse.json({status: error, message: "User not found"}, {status: 401});

    const { name, email, mobile, address, pincode } = await users.findOne({
      _id: userId,
    });

    return NextResponse.json({ name, email, mobile, address, pincode });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
