import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const {
      productId,
      quantity = 1,
      email,
      name,
      trialPeriodDays,
      metadata,
      returnUrl,
    } = await req.json();

    if (!productId || !email) {
      return NextResponse.json(
        { error: "productId and email are required" },
        { status: 400 },
      );
    }

    const resolvedReturnUrl =
      returnUrl || `${req.nextUrl.origin}/success?source=dodo-checkout`;

    const payload: Record<string, unknown> = {
      productId,
      quantity,
      customer: { email, name },
      returnUrl: resolvedReturnUrl,
    };

    if (Number.isInteger(trialPeriodDays) && trialPeriodDays > 0) {
      payload.trialPeriodDays = trialPeriodDays;
    }

    if (metadata && typeof metadata === "object") {
      payload.metadata = metadata;
    }

    const { data } = await axios.post(
      `${BACKEND_BASE_URL}/api/v1/dodo-public/checkout-session`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000,
      },
    );

    return NextResponse.json({
      checkoutUrl: data.checkoutUrl,
      sessionId: data.session?.checkout_session_id || data.session?.id || null,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error?.response?.data?.error ||
          error?.message ||
          "Failed to create checkout via backend",
        details: error?.response?.data || null,
      },
      { status: 500 },
    );
  }
}
