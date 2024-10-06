import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZOR_KEYID!,
  key_secret: process.env.NEXT_PUBLIC_RAZOR_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const payment = await razorpay.orders.create({
      amount: amount * 10,
      currency: "INR",
      receipt: "receipt" + Math.random().toString(36).substring(7),
    });

    return NextResponse.json(
      {
        orderId: payment.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in payment", error);
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
