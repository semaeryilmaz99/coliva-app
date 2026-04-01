import { NextRequest, NextResponse } from "next/server"
import { loginSchema } from "@/features/auth/validations/auth.schema"
import { loginUser } from "@/features/auth/services/auth.service"

export async function POST(request: NextRequest) {
  try {
    // 1. Request body'den veriyi al
    const body = await request.json()

    // 2. Zod ile validate et
    const validatedData = loginSchema.safeParse(body)

    // 3. Validasyon başarısızsa hata döndür
    if (!validatedData.success) {
      const errorMessage = validatedData.error?.issues?.[0]?.message ?? "Geçersiz veri"
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      )
    }

    // 4. Service katmanını çağır
    const result = await loginUser(validatedData.data)

    // 5. Token'ı HTTP-only cookie olarak set et
    const response = NextResponse.json(
      { user: result.user },
      { status: 200 }
    )
    response.cookies.set("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 gün
    })

    return response
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Bir hata oluştu"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}