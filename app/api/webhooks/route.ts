import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import connect from "@/app/lib/connect";
import User from "@/app/Models/UserSchema";

export async function POST(req: Request) {
  console.log("Webhook received");

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is not defined");
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers");
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("Verified event:", evt);
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;
  console.log(`Event type: ${eventType}`);

  if (eventType === "session.created") {
    console.log("session.created event detected");
    const { user_id } = evt.data;

    try {
      console.log("Calling connect()...");
      await connect();
      console.log("Looking for user...");

      // Попробуем найти существующего пользователя по ID
      let user = await User.findOne({ clerkUserId: user_id });

      // Если пользователь не найден, создадим нового
      if (!user) {
        console.log("User not found, creating new user...");
        user = new User({
          clerkUserId: user_id,
          emailAddress: "placeholder@example.com", // Замените на актуальный email, если доступен
        });
        await user.save();
        console.log("User created");
      } else {
        console.log("User already exists");
      }
    } catch (error) {
      console.error("Error in user handling:", error);
    }
  } else {
    console.log(`Event type is not 'session.created', it is: ${eventType}`);
  }

  console.log(`Webhook with an ID of ${evt.data.id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}