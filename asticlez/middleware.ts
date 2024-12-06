import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// Initialize Redis (replace with your actual connection URL and token from Upstash)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// Create middleware for rate limiting
export default async function middleware(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("host") || "anonymous";
  const { success } = await redis.lpush(ip, "request");
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  return NextResponse.next();
}