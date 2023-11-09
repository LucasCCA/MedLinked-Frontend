import jwt_decode from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { TokenData } from "./types";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const resetToken = request.cookies.get("resetToken")?.value;
  const tokenData = token ? jwt_decode<TokenData>(token) : ({} as TokenData);

  if (!token || Date.now() >= tokenData.exp * 1000) {
    request.cookies.delete("token");

    if (!resetToken && request.nextUrl.pathname === "/senha/alterar")
      return NextResponse.redirect(new URL("/", request.url));

    if (
      request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/cadastro" ||
      request.nextUrl.pathname === "/senha" ||
      request.nextUrl.pathname === "/senha/alterar"
    )
      return NextResponse.next();

    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname === "/cadastro" ||
    request.nextUrl.pathname === "/admin" ||
    request.nextUrl.pathname === "/senha" ||
    request.nextUrl.pathname === "/senha/alterar"
  )
    return NextResponse.redirect(new URL("/admin/agenda", request.url));
}

export const config = {
  matcher: ["/", "/cadastro", "/senha/:path*", "/admin/:path*"],
};
