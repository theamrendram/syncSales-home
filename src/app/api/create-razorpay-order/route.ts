import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const plans = {
  free: { name: "Free", price: 0, trialDays: 0 },
  pro: { name: "Pro", price: 4900, trialDays: 14 }, // Price in paise (49 INR)
  enterprise: { name: "Enterprise", price: 9900, trialDays: 14 }, // Price in paise (99 INR)
};

export async function POST(request: Request) {
  const { plan, isAnnual, isTrial } = await request.json();

  const selectedPlan = plans[plan as keyof typeof plans];
  const price = isAnnual ? selectedPlan.price * 12 * 0.9 : selectedPlan.price; // 10% discount for annual

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(price), // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        planName: selectedPlan.name,
        billingType: isAnnual ? "annual" : "monthly",
        isTrial: isTrial.toString(),
      },
    });

    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
