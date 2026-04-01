import { NextResponse } from "next/server"

export async function POST() {
  // Logout işlemi basit — sadece cookie'yi sil.
  // Sunucu tarafında token'ı geçersiz kılmak için
  // token'ın maxAge'ini 0 yapıyoruz, tarayıcı cookie'yi siler.
  const response = NextResponse.json(
    { message: "Çıkış yapıldı" },
    { status: 200 }
  )

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0, // Anında sil
  })

  return response
}