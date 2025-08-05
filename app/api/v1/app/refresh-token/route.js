import ConnectDB from "@/app/db/connectDb";
import users from "@/app/model/users";
import { generateAccessToken, verifyToken } from "@/app/services/jwthelpers";
import { JWTExpired } from "jose/errors";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await ConnectDB();

    if (!request.headers.get("authorization")) {
      return NextResponse.json(
        { status: "error", message: "Authorization header is missing" },
        { status: 401 }
      );
    }

    const isAuthorized = await verifyToken(
      request.headers.get("authorization")?.split(" ")[1]
    );

    if (!isAuthorized) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const user = await users.findOne({ _id: isAuthorized.userId });

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User not found." },
        { status: 404 }
      );
    }

    const accessToken = await generateAccessToken(
      isAuthorized.userId.toString()
    );

    return NextResponse.json({ status: "success", accessToken });
  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 401 });
  }
}
