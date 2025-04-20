import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";
function verifyRazorpaySignature({
  orderId,
  razorpayPaymentId,
  razorpaySignature,
  secretKey,
}: {
  orderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  secretKey: string;
}) {
  const dataToSign = `${orderId}|${razorpayPaymentId}`;
  const generatedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(dataToSign)
    .digest("hex");

  return generatedSignature === razorpaySignature;
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const {
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    plan,
    billingCycle,
    isTrial,
    customer,
  } = data;
  try {
    if (
      !verifyRazorpaySignature({
        orderId: razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        secretKey: process.env.RAZORPAY_KEY_SECRET || "",
      })
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    console.log("data", data);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment`,
      {
        razorpayPaymentId,
        razorpayOrderId,
        plan,
        billingCycle,
        isTrial,
        customer,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response", response);
    const subscriptionData = await response.data;
    return NextResponse.json(subscriptionData);
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}