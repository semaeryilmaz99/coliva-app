import { NextRequest, NextResponse } from "next/server"
import { registerSchema } from "@/features/auth/validations/auth.schema"
import { registerUser } from "@/features/auth/services/auth.service"

// API Route katmanı sadece HTTP isteğini karşılar ve cevap döner.
// Business logic burada olmaz — sadece:
// 1. Gelen veriyi validate et
// 2. Service'i çağır
// 3. Sonucu HTTP response olarak döndür

export async function POST(request: NextRequest) {
  try {
    // 1. Request body'den veriyi al
    const body = await request.json()

    // 2. Zod ile validate et
    const validatedData = registerSchema.safeParse(body)

    // 3. Validasyon başarısızsa hata döndür
    if (!validatedData.success) {
      const errorMessage = validatedData.error?.issues?.[0]?.message ?? "Geçersiz veri"
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      )
    }

    // 4. Service katmanını çağır
    const result = await registerUser(validatedData.data)

    // 5. Token'ı HTTP-only cookie olarak set et
    const response = NextResponse.json(
      { user: result.user },
      { status: 201 }
    )
    response.cookies.set("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Bir hata oluştu"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}