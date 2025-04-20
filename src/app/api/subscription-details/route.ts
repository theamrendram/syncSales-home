import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subscriptionId = searchParams.get("subscription_id");

  if (!subscriptionId) {
    return NextResponse.json(
      { error: "Subscription ID is required" },
      { status: 400 }
    );
  }

  try {
    const subscription = await razorpay.subscriptions.fetch(subscriptionId);
    const plan = await razorpay.plans.fetch(subscription.plan_id);
    console.log(subscription, plan);
    return NextResponse.json({
      id: subscription.id,
      amount: plan.item.amount,
      plan: plan.item.name,
      endAt: subscription.end_at,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
