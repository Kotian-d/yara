import { getUserByEmail, getUserByMobile } from "@/app/queries/userquery";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/app/zodschema/userSchema";
import { NextResponse } from "next/server";
import ConnectDB from "@/app/db/connectDb";

export async function POST(request) {
  try {
    await ConnectDB();
    const result = RegisterSchema.safeParse(await request.json());
    if (result.success) {
      const emailexits = await getUserByEmail(result.data.email);
      if (emailexits) throw new Error("Email id already exists in the system");

      const mobileexits = await getUserByMobile(result.data.mobile);
      if (mobileexits)
        throw new Error("Mobile Number already exists in the system");

      const hashedpassword = await bcrypt.hash(result.data.password, 10);
      const api_token = uuidv4();
      await users.create({
        name: result.data.username,
        email: result.data.email,
        password: hashedpassword,
        shopname: result.data.shopname,
        state: result.data.state,
        api_token: api_token,
        isactive: true,
        mobile: Number(result.data.mobile),
      });

      return NextResponse.json(
        { status: "success", message: "Account Created Successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { status: "error", message: result.error.errors[0].message },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 400 }
    );
  }
}
