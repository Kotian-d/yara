import ConnectDB from "@/app/db/connectDb";
import { NextResponse } from "next/server";
import users from "@/app/model/users";
import bcrypt from "bcryptjs";
import { isValidUser } from "@/app/queries/userquery";

export async function POST(request) {
  await ConnectDB();
  try {
    const { currentpassword, newpassword, confirmpassword } =
      await request.json();

    if (newpassword !== confirmpassword) {
      return NextResponse.json(
        {
          status: "error",
          message: "New password and Cofirm Password doesnot match",
        },
        { status: 403 }
      );
    }
    const userId = request.headers.get("isAuthorized");

    const user = await users.findOne({ _id: userId });
    const isvalid = await isValidUser(currentpassword, user.password);

    console.log(user)

    if (!isvalid) {
      return NextResponse.json(
        { status: "error", message: "Invalid credentials" },
        { status: 403 }
      );
    }

    const hashedpassword = await bcrypt.hash(newpassword, 10);
    await users.findOneAndUpdate(
      { _id: user._id },
      {
        password: hashedpassword,
      }
    );

    return NextResponse.json(
      { status: "success", message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
