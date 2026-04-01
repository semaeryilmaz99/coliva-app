// Edge Runtime dahil her ortamda çalışan JWT kütüphanesi.
// jsonwebtoken yerine jose kullanıyoruz çünkü middleware Edge Runtime'da çalışır.
import { SignJWT, jwtVerify } from "jose"

// JWT_SECRET .env'den okunuyor.
// TextEncoder ile string → byte dizisine çevriliyor (jose bunu bekliyor).
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET as string
)

// Token içinde taşınacak kullanıcı bilgileri.
// Hassas veri (şifre vb.) buraya konulmamalı — token decode edilebilir.
export interface JwtPayload {
  id: string
  email: string
  role: "ADMIN" | "TENANT"
}

// Login/register sonrası çağrılır, JWT token üretir.
// HS256 algoritması ile imzalanır, 7 gün geçerlidir.
export async function signToken(payload: JwtPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

// Middleware ve korumalı API'lerde çağrılır.
// Token geçerliyse payload döner, geçersiz veya süresi dolmuşsa null döner.
export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return {
      id: payload.id as string,
      email: payload.email as string,
      role: payload.role as "ADMIN" | "TENANT",
    }
  } catch {
    return null
  }
}