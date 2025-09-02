import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req:NextRequest) {
    console.log("Payment webhook received");
    
    const razorpaySecret = process.env.NEXT_PUBLIC_RAZOR_KEY_SECRET;
    if (!razorpaySecret) {
        console.error("Webhook secret not configured");
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
    try {
        const body = await req.text();
        const rawBody = Buffer.from(body, 'utf-8');

        const signature = req.headers.get('x-razorpay-signature');
        if (!signature) {
            console.log("No signature provided");
            return NextResponse.json(
                { success: false, message: "Invalid Signature" },
                { status: 400 }
            );
        }

        const expectedSignature = crypto
            .createHmac('sha256', razorpaySecret)
            .update(rawBody)
            .digest('hex');

        console.log("Received Signature:", signature);
        console.log("Expected Signature:", expectedSignature);

        // Verify signature
        if (signature !== expectedSignature) {
            console.log("Signature doesn't match");
            return NextResponse.json(
                { success: false, message: "Invalid Signature" },
                { status: 400 }
            );
        }

        console.log("Signature matched");
        // Parse the webhook body
        const event = JSON.parse(body);
        
        if (event.event === 'payment.authorized') {
            console.log("Payment Successful:", event.payload.payment.entity);
            // Handle successful payment
        } else if (event.event === 'payment.failed') {
            console.log("Payment Failed:", event.payload.payment.entity);
            // Handle failed payment
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
export async function GET() {
    return NextResponse.json({ message: "Success" });
  }