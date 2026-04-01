import bcrypt from "bcryptjs"
import { signToken } from "@/lib/auth"
import { findUserByEmail, createUser } from "../repositories/auth.repository"
import { RegisterInput, LoginInput } from "../validations/auth.schema"

// Service katmanı business logic'ten sorumludur.
// "Kullanıcı var mı?", "Şifre doğru mu?", "Token üret" gibi
// kararlar burada verilir.
// Repository'den veri alır, işler ve sonucu döndürür.
// API route'ları bu katmanı çağırır — doğrudan Prisma'ya dokunmaz.

export async function registerUser(data: RegisterInput) {
  // 1. Bu email daha önce kayıtlı mı kontrol et
  const existingUser = await findUserByEmail(data.email)
  if (existingUser) {
    throw new Error("Bu email adresi zaten kullanılıyor")
  }

  // 2. Şifreyi hashle — düz metin şifreyi veritabanına asla kaydetme
  // 10: salt rounds — ne kadar yüksekse o kadar güvenli ama yavaş
  // Genellikle 10-12 arası kullanılır
  const hashedPassword = await bcrypt.hash(data.password, 10)

  // 3. Kullanıcıyı veritabanına kaydet
  const user = await createUser({
    ...data,
    password: hashedPassword,
  })

  // 4. JWT token üret ve döndür
  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  })

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }
}

export async function loginUser(data: LoginInput) {
  // 1. Email ile kullanıcıyı bul
  const user = await findUserByEmail(data.email)
  if (!user) {
    // Güvenlik için "kullanıcı bulunamadı" yerine genel hata ver
    // Böylece saldırgan hangi email'in kayıtlı olduğunu anlayamaz
    throw new Error("Email veya şifre hatalı")
  }

  // 2. Girilen şifreyi hashlenmiş şifreyle karşılaştır
  const isPasswordValid = await bcrypt.compare(data.password, user.password)
  if (!isPasswordValid) {
    throw new Error("Email veya şifre hatalı")
  }

  // 3. JWT token üret ve döndür
  const token = await signToken({
  id: user.id,
  email: user.email,
  role: user.role,
  })

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }
}