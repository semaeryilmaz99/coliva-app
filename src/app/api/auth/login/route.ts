import { NextRequest, NextResponse } from "next/server"
import { loginSchema } from "@/features/auth/validations/auth.schema"
import { loginUser } from "@/features/auth/services/auth.service"

// Next.js API Route — sadece POST isteği kabul eder.
// Tarayıcıdan /api/auth/login'e POST atılınca bu fonksiyon çalışır.
// Görevi: isteği al, doğrula, service'e ilet, cevap döndür.
// Business logic burada yok — sadece HTTP katmanı.
export async function POST(request: NextRequest) {
  try {
    // İstek gövdesindeki JSON'ı okur.
    // { email: "test@coliva.com", password: "123456" } gibi bir şey gelir.
    const body = await request.json()

    // Zod ile veriyi doğrula.
    // safeParse hata fırlatmaz, { success, data, error } döndürür.
    const validatedData = loginSchema.safeParse(body)

    // Validasyon başarısızsa (email formatı yanlış, şifre boş vb.)
    // ilk hata mesajını 400 status ile döndür.
    if (!validatedData.success) {
      const errorMessage = validatedData.error?.issues?.[0]?.message ?? "Geçersiz veri"
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      )
    }

    // Validasyon geçtiyse service katmanına ilet.
    // loginUser: email/şifre kontrolü yapar, token üretir.
    const result = await loginUser(validatedData.data)

    // Başarılı response oluştur, içinde sadece user bilgisi var.
    // Token response body'de değil — cookie'de saklanacak.
    const response = NextResponse.json(
      { user: result.user },
      { status: 200 }
    )

    // Token'ı HTTP-only cookie olarak tarayıcıya gönder.
    // httpOnly: JavaScript ile okunamaz, XSS'e karşı güvenli.
    // secure: Sadece production'da HTTPS zorunlu olsun.
    // sameSite: "lax" — cross-site request'lerde cookie gönderilmez, CSRF'e karşı koruma.
    // maxAge: Saniye cinsinden — 60*60*24*7 = 7 gün.
    response.cookies.set("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    // Service'den gelen hatalar buraya düşer.
    // "Email veya şifre hatalı" gibi mesajlar buradan döner.
    const message =
      error instanceof Error ? error.message : "Bir hata oluştu"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}