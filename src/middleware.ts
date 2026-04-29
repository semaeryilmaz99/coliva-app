import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")

  // Login olmadan sadece login ile açılabilen sayfalara erişmeye çalışırsa logine yönlendirir
  if (!token) {
    if (isAuthPage) return NextResponse.next()
    return NextResponse.redirect(new URL("/login", request.url))
  }
  // Token doğrulama yaparak user bilgilerini alır 
  const payload = await verifyToken(token)

  if (!payload) {
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.set("token", "", { maxAge: 0 })
    return response
  }
  
  // Ve role göre erişim kontrolü yapar. Admin olmayan userların admin sayfasına erişimini engeller.
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    payload.role !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  // Normal user ise home sayfasına yönlendirir. Admin ise admin dashboard'a yönlendirir.

  if (isAuthPage) {
    const redirectUrl =
      payload.role === "ADMIN" ? "/admin/dashboard" : "/home"
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  return NextResponse.next()
}

// Middleware'in hangi yolları koruyacağını belirler. Belirtilen yollar dışında kalan sayfalara admin/kiracı ayrımı olmadan herkes erişebilir. 

export const config = {
  matcher: [
    "/admin/:path*",
    "/home/:path*",
    "/payments/:path*",
    "/complaints/:path*",
    "/community/:path*",
    "/chat/:path*",
    "/login",
    "/register"
  ],
}

// Yetki kontrolüne göre yönlendirme kısmının bitişi