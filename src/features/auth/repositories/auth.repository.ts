import { prisma } from "@/lib/prisma"
import { RegisterInput } from "../validations/auth.schema"

// Repository katmanı sadece veritabanı işlemlerinden sorumludur.
// Business logic burada olmaz — sadece Prisma sorguları vardır.
// Bu sayede ileride Prisma'yı başka bir ORM ile değiştirirsen
// sadece bu dosyaları değiştirmen yeterli olur. (Dependency Inversion)

// Email ile kullanıcı bul — login sırasında kullanılır
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

// ID ile kullanıcı bul — token doğrulama sırasında kullanılır
export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  })
}

// Yeni kullanıcı oluştur — register sırasında kullanılır
// data içinde name, email, password (hashlenmiş), phone, roomNumber var
export async function createUser(
  data: RegisterInput & { password: string; role?: "ADMIN" | "TENANT" }
) {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      roomNumber: data.roomNumber,
      role: data.role ?? "TENANT",
    },
  })
}