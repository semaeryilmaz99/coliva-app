// Prisma client'ı import ediyoruz.
// PrismaClient veritabanıyla konuşmamızı sağlayan ana sınıf.
import { PrismaClient } from "@prisma/client"

// Sorun: Next.js development modunda dosyalar her değiştiğinde yeniden yüklenir (hot reload).
// Her yüklemede new PrismaClient() çağrılırsa yüzlerce DB bağlantısı açılır ve limit aşılır.
// Çözüm: Singleton pattern — bir kez oluştur, hep aynısını kullan.

// globalThis: Uygulamanın her yerinden erişilebilen global nesne.
// TypeScript'e "bu nesnede prisma alanı olabilir" diyoruz.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Global'de prisma varsa onu kullan, yoksa yeni oluştur.
// ?? (nullish coalescing): sol taraf null/undefined ise sağ tarafı kullan.
export const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

// Sadece development'ta global'e kaydet.
// Production'da zaten hot reload olmaz, global'e gerek yok.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}