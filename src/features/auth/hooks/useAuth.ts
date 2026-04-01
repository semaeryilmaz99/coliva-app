"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthUser, AuthState } from "../types/auth.types"
import { LoginInput, RegisterInput } from "../validations/auth.schema"

// useAuth: Auth işlemlerini yöneten custom hook.
// Tüm auth state'i ve fonksiyonları tek yerden yönetir.
// Hangi component auth'a ihtiyaç duyarsa bu hook'u çağırır.
// Bu sayede auth logic'i component'lardan ayrılmış olur. (Separation of Concerns)

export function useAuth() {
  const router = useRouter()

  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    isAuthenticated: false,
  })

  // Kullanıcı bilgisini günceller
  function setUser(user: AuthUser | null) {
    setState({
      user,
      isLoading: false,
      isAuthenticated: !!user, // user varsa true, yoksa false
    })
  }

  async function login(data: LoginInput) {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      // Login API'sine istek at
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error)
      }

      // Kullanıcı bilgisini state'e kaydet
      setUser(result.user)

      // Role göre yönlendir
      if (result.user.role === "ADMIN") {
        router.push("/admin/dashboard")
      } else {
        router.push("/home")
      }
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw error // Hatayı component'a ilet, orada gösterilecek
    }
  }

  async function register(data: RegisterInput) {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error)
      }

      setUser(result.user)
      router.push("/home")
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    router.push("/login")
  }

  return {
    ...state,
    login,
    register,
    logout,
  }
}