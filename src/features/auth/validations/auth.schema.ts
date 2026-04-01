import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir email giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  phone: z.string().optional(),
  roomNumber: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email("Geçerli bir email giriniz"),
  password: z.string().min(1, "Şifre giriniz"),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>