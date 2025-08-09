import { NextResponse } from "next/server";

export async function GET(params) {
  const data = [
    {
      bank: "HDFC BANK",
      account_name: " BANNA",
      account_number: 50200101923575,
      ifsc_code: "HDFC0009540",
      branch: "Shirva",
      account_type: "Current",
      category: "primary",
      upiId: "502001015@okhdfcbank",
    },
    {
      bank: "CANARA BANK",
      account_name: " BANNA",
      account_number: 120035071540,
      ifsc_code: "CNRB0000636",
      branch: "SHANKARPURA",
      account_type: "Current",
      category: "secondary",
    },
  ];
  return NextResponse.json({status: "success", data });
}
