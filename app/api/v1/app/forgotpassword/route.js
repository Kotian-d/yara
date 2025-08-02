import ConnectDB from "@/app/db/connectDb";
import { NextResponse } from "next/server";
import users from "@/app/model/users";
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserByMobile } from "@/app/queries/userquery";
import generateRandomPassword from "@/app/services/generatepasswd";
import { sendWhatsappMsg } from "@/app/services/smsservices";

export async function POST(request) {
  await ConnectDB();
  try {
    let foundUser;
    const { mobile, email } = await request.json();

    if(mobile){
         foundUser = await getUserByMobile(mobile);
    } else {
        foundUser = await getUserByEmail(email);
    }

    if (!foundUser) {
      return NextResponse.json(
        { status: "error", message: "User not found." },
        { status: 404 }
      );
    }

    const password = generateRandomPassword();
    const hashedpassword = await bcrypt.hash(password, 10);

    await users.findByIdAndUpdate({_id: foundUser._id},{
        password: hashedpassword
    });

    console.log(`=============== New password generated: ${password} =======================`);
    //await sendWhatsappMsg(foundUser.mobile, foundUser.mobile, password);

    return NextResponse.json(
      { status: "success", message: "Password Reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
