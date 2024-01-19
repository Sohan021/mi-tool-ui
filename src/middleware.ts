import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
};