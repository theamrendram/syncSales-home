import { NextResponse } from "next/server";
import axios from "axios";

const plans = {
  basic: { name: "Basic", price: 175000, trialDays: 0 },
  pro: { name: "Pro", price: 430000, trialDays: 0 },
};

export async function POST(request: Request) {
  try {
    const {
      plan,
      billingCycle,
      isTrial,
      customer,
    }: {
      plan: string;
      billingCycle: string;
      isTrial: boolean;
      customer: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        company: string;
        address: string;
      };
    } = await request.json();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/subscribe`,
        {
          plan,
          billingCycle,
          isTrial,
          customer,
        }
      );
    } catch (err: any) {
      console.error("Razorpay order creation failed:", err);
      return NextResponse.json(
        { error: err.message || "Failed to create order" },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("Razorpay order creation failed:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
