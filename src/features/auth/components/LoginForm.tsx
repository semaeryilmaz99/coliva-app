"use client"

import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { LoginInput } from "../validations/auth.schema"

// LoginForm component'ı sadece UI'dan sorumludur.
// Business logic yok — sadece formu göster, veriyi useAuth'a ilet.
// Form tasarımını değiştirmek istersen sadece burayı değiştirirsin, auth logic'e dokunman gerekmiyor. (Single Responsibility)

export function LoginForm() {
  const { login, isLoading } = useAuth()

  // Hata mesajını göstermek için local state
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState<LoginInput>({
    email: "",
    password: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setError(null)

    try {
      await login(formData)
    } catch (err) {
      // useAuth'tan gelen hatayı yakala ve göster
      setError(err instanceof Error ? err.message : "Bir hata oluştu")
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <h1 className="text-2xl font-bold text-center">Giriş Yap</h1>

      {/* Hata mesajı */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ornek@email.com"
          className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Şifre */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Şifre</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••"
          className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit butonu */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>

      {/* Register linki */}
      <p className="text-sm text-center text-gray-500">
        Hesabın yok mu?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Kayıt ol
        </a>
      </p>
    </div>
  )
}