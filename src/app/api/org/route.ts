import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/org`,
      data
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}