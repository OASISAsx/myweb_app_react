import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // 🔒 protect /protected/*
  if (pathname.startsWith("/")) {
    // ❌ ยังไม่ login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else if (token) {
      console.log("User ID from middleware:", token.sub);
      pathname.startsWith("/");
    }

    // ❌ ไม่ใช่ admin
    // if (token.role !== "admin") {
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["//:path*"],
};
