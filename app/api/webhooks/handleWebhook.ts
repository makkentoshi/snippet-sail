import connect from "@/app/lib/connect";
import User from "@/app/Models/UserSchema";

const handleWebhook = async (evt: any) => {
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses } = evt.data;

    const newUser = {
      clerkUserId: id,
      emailAddress: email_addresses[0].email_address,
    };
    try {
      await connect();
      console.log("user creating...");
      await User.create(newUser);
      console.log("user created");
    } catch (error) {
      console.error(error);
    }
  }
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", evt);

  return new Response("", { status: 200 });
};

export default handleWebhook;
