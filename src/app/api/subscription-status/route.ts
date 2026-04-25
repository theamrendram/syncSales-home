import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function GET(req: NextRequest) {
  try {
    const email = (req.nextUrl.searchParams.get("email") || "").trim();
    const clerkUserId = (req.nextUrl.searchParams.get("clerkUserId") || "").trim();

    if (!email && !clerkUserId) {
      return NextResponse.json(
        { error: "email or clerkUserId query parameter is required" },
        { status: 400 },
      );
    }

    const { data } = await axios.get(`${BACKEND_BASE_URL}/api/v1/subscription/status`, {
      params: { email, clerkUserId },
      timeout: 12000,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    const status = Number(error?.response?.status || 500);
    return NextResponse.json(
      {
        error: error?.response?.data?.error || "Failed to fetch subscription status",
      },
      { status },
    );
  }
}
