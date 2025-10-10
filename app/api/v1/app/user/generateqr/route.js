import { NextResponse } from "next/server";
import CreateOrderAPI from "@/app/integration/tez/tezgateway";

function generateOrderNumber() {
  // The smallest 12-digit number is 10^11
  const min = 100000000000; 
  // The largest 12-digit number is 10^12 - 1
  const max = 999999999999; 

  // Generate a random number within the defined range (inclusive)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

export async function POST(request) {
  const { amount } = await request.json();

  if(amount == null || parseInt(amount) <= 0 || parseInt(amount) > 10000) return NextResponse.json({ status: "error", message: "Please enter the amount between 1 to 10000" }, { status: 400 });

  const orderid = generateOrderNumber();
  const api = new CreateOrderAPI("https://tezgateway.com/api/create-order");
  try {

    const order = await api.createOrder(
      "9739283261",
      "2e4de2cdf3abaf525644f88de06e4436",
      amount,
      orderid.toString(),
      `https://yara-one.vercel.app/integration/tez/callback/${orderid}.toString()`,
      "testremark",
      "testremark2"
    );   
  
    return NextResponse.json({ order });
  } catch (error) {
    console.log("Order creation failed:", error.message);
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}

