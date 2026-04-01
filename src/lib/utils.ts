// clsx: Koşullu class isimleri oluşturmak için kullanılır.
// twMerge: Çakışan Tailwind class'larını akıllıca birleştirir.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// shadcn/ui'ın her component'ında kullanılan yardımcı fonksiyon.
// Birden fazla class'ı birleştirip temiz bir string döndürür.
//
// Örnek kullanım:
// cn("p-4 text-sm", isActive && "text-blue-600", "p-2")
// → "text-sm text-blue-600 p-2"  (p-4 ile p-2 çakışıyor, twMerge p-2'yi kazandırır)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}