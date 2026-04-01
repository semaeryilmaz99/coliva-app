"use client"

import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { RegisterInput } from "../validations/auth.schema"

// RegisterForm, LoginForm ile aynı yapıyı takip eder.
// Tek fark daha fazla alan var: name, phone, roomNumber.

export function RegisterForm() {
  const { register, isLoading } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
    phone: "",
    roomNumber: "",
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
      await register(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu")
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <h1 className="text-2xl font-bold text-center">Kayıt Ol</h1>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      {/* İsim */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Ad Soyad</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ad Soyad"
          className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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

      {/* Telefon (opsiyonel) */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">
          Telefon <span className="text-gray-400">(opsiyonel)</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="05xx xxx xx xx"
          className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Oda numarası (opsiyonel) */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">
          Oda / Daire No <span className="text-gray-400">(opsiyonel)</span>
        </label>
        <input
          type="text"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          placeholder="Örn: 12B"
          className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
      </button>

      <p className="text-sm text-center text-gray-500">
        Zaten hesabın var mı?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Giriş yap
        </a>
      </p>
    </div>
  )
}