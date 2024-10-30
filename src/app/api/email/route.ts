import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("data", data);

  try {
    const res = axios.post(
      "https://script.google.com/macros/s/AKfycbyQRFpLvkLyR2ygBfSmqy-SDKzm-oS2eCD4ewPmq6rypO40NaHPOblBC5yfgI59170U/exec",
      data
    );
    console.log("res", res);
    return NextResponse.json({ data: res });
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({ data });
}
