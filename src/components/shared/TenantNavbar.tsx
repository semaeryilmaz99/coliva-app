"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/features/auth/hooks/useAuth"

// TenantNavbar — kiracı sayfalarında üstte görünen navigasyon.
// Aktiflik kontrolü için usePathname hook'u kullanılıyor.
// Hangi linkte olduğumuzu anlayıp aktif linki vurguluyoruz.

const navLinks = [
  { href: "/home", label: "Ana Sayfa" },
  { href: "/payments", label: "Kira" },
  { href: "/complaints", label: "Şikayetler" },
  { href: "/community", label: "Topluluk" },
  { href: "/chat", label: "Mesajlar" },
]

export function TenantNavbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white border-b px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <span className="font-bold text-lg text-blue-600">Coliva</span>

        {/* Linkler */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Kullanıcı bilgisi + çıkış */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{user?.name}</span>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            Çıkış
          </button>
        </div>

      </div>
    </nav>
  )
}