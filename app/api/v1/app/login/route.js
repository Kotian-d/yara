import ConnectDB from "@/app/db/connectDb";
import { getUserFromDb, isValidUser } from "@/app/queries/userquery";
import { LoginSchema } from "@/app/zodschema/userSchema";
import { NextResponse } from "next/server";
import { generateAccessToken, generateRefreshToken } from "@/app/services/jwthelpers";

export async function POST(request) {
  try {
    await ConnectDB();
    const result = LoginSchema.safeParse(await request.json());
    if (result.success) {
      const { mobile, password } = result.data;

      const user = await getUserFromDb(mobile);

      if (!user) {
        return NextResponse.json(
          { status: "error", message: "User not found." },
          { status: 404 }
        );
      }
      // logic to verify if the user exists
      const isvalid = await isValidUser(password, user.password);

      if (!isvalid) {
        // No user found, so this is their first attempt to login
        // Optionally, this is also the place you could do a user registration
        return NextResponse.json(
          { status: "error", message: "Invalid credentials." },
          { status: 401 }
        );
      }

      const accessToken = await generateAccessToken(user._id.toString());
      const refreshToken = await generateRefreshToken(user._id.toString());

      // return user object with their profile data
      return NextResponse.json(
        { status: "success", accessToken, refreshToken },
        { status: 200 }
      );
    }

    console.log(result.error.errors);
    return NextResponse.json(
      { status: "error", message: `${result.error.errors[0].path[0]} ${result.error.errors[0].message}` },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
