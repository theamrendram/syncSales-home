import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/create`,
      data,
    );
    console.log("response.data", response.data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.log(error.response.data.details[0]);
    return NextResponse.json(
      {
        error: error.response.data.details[0],
      },
      { status: 500 },
    );
  }
}
