import ConnectDB from "@/app/db/connectDb";
import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/app/services/jwthelpers";
import users from "@/app/model/users";
import bcrypt from "bcryptjs";
import { isValidUser } from "@/app/queries/userquery";
import { TokenExpiredError } from 'jsonwebtoken'

export async function POST(request) {
  await ConnectDB();

  if (!request.headers.get("authorization")) {
    return NextResponse.json(
      { status: "error", message: "Authorization header is missing" },
      { status: 401 }
    );
  }

  try {
    const isAuthorized = await verifyAccessToken(
      request.headers.get("authorization")?.split(" ")[1]
    );
    console.log("isAuthorized", isAuthorized);
    if (!isAuthorized) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized access" },
        { status: 401 }
      );
    }

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

    const user = await users.findOne({ _id: isAuthorized.aud });
    const isvalid = await isValidUser(currentpassword, user.password);

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
    if (error instanceof TokenExpiredError) {
      return NextResponse.json(
        { status: "error", message: error.message },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
