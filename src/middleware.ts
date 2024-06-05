import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const test = request.cookies.get("currentUser")?.value;
  if (request.nextUrl.pathname.includes("/dashboard")) {
    // const session = await getSession();
  }

  return NextResponse.next();
}
