// Zod: Runtime'da veri doğrulama kütüphanesi.
// Hem frontend'de form validasyonu hem de backend'de API verisini doğrulamak için kullanılır.
import { z } from "zod"

// Register formundan gelecek verinin şeması.
// Her alan için tip ve kural tanımlıyoruz.
// Kural ihlal edilirse ikinci parametre hata mesajı olarak döner.
export const registerSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir email giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  phone: z.string().optional(),       // Zorunlu değil, boş bırakılabilir
  roomNumber: z.string().optional(),  // Zorunlu değil, boş bırakılabilir
})

// Login formundan gelecek verinin şeması.
// Sadece email ve şifre yeterli.
export const loginSchema = z.object({
  email: z.string().email("Geçerli bir email giriniz"),
  password: z.string().min(1, "Şifre giriniz"),
})

// z.infer: Zod şemasından otomatik TypeScript tipi üretir.
// Ayrıca interface yazmak zorunda kalmıyoruz — şema değişince tip de değişir.
// RegisterInput = { name: string, email: string, password: string, phone?: string, roomNumber?: string }
// LoginInput    = { email: string, password: string }
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>