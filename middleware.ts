"use server";
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();
// Stop Middleware running on static files
export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
