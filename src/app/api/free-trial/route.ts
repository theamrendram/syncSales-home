import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
export async function POST(request: NextRequest) {

    const data = request.json();
  try {
    const response = axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/free-trial`,
      {
          data
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error: any) {
    console.log("error creating free trail", error);
    return NextResponse.json(
      { error: error, message: "error creating free trail" },
      { status: 500 }
    );
  }
}
