import jwt_decode from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { TokenData } from "./types";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const tokenData = token ? jwt_decode<TokenData>(token) : ({} as TokenData);

  if (!token || Date.now() >= tokenData.exp * 1000) {
    if (request.nextUrl.pathname === "/" || request.url.includes("/cadastro"))
      return NextResponse.next();

    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname === "/" || request.url.includes("/cadastro"))
    return NextResponse.redirect(new URL("/admin", request.url));
}

export const config = {
  matcher: ["/", "/cadastro", "/admin/:path*"],
};
