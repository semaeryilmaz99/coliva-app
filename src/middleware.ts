import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")

  if (!token) {
    if (isAuthPage) return NextResponse.next()
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const payload = await verifyToken(token)

  if (!payload) {
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.set("token", "", { maxAge: 0 })
    return response
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    payload.role !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  if (isAuthPage) {
    const redirectUrl =
      payload.role === "ADMIN" ? "/admin/dashboard" : "/home"
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/home/:path*",
    "/payments/:path*",
    "/complaints/:path*",
    "/community/:path*",
    "/chat/:path*",
    "/login",
    "/register",
  ],
}