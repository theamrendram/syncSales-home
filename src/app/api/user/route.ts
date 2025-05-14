import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
export async function POST(req: NextRequest) {
  const { firstName, lastName, phone, email, username } = await req.json();
  const { userId } = getAuth(req);
  console.log(firstName, lastName, phone, email, username, userId);

  try {
    const user = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user`,
      {
        firstName,
        lastName,
        phone,
        email,
        username,
        userId,
      }
    );
    console.log(user);
    return NextResponse.json(user.data);
  } catch (error: any) {
    console.log(
      "something went wrong while creating user",
      error.message,
      "\n",
      error.response.data,
      "\n",
      error.response.status
    );
    return NextResponse.json(
      { error: "Something went wrong", message: error.response.data },
      { status: 500 }
    );
  }
}
