import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { supabase } from "../../../../../utils/supabse/client";

const webhookSecret = process.env.NEXT_PUBLIC_WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };

  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (error) {
    console.log((error as Error).message);
    return NextResponse.json(
      {
        message: "Invalid error in svix",
      },
      { status: 400 }
    );
  }
  const eventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, ...attributes } = evt.data;
    const { data, error } = await supabase.from("users").insert({
      clerk_id: id,
      userName: attributes.first_name,
      email: attributes.email_addresses[0]?.email_address,
      credits: 10,
    });
    return NextResponse.json(
      { data: "user created successfully in db", error },
      { status: 202 }
    );
  }
  return NextResponse.json(
    {
      data: {
        message: "User Created successfully in database",
      },
    },
    { status: 200 }
  );
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
