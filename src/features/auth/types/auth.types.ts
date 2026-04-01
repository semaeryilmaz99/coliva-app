// Auth feature'ında kullanılan TypeScript tipleri
// Bu dosya sayesinde tüm auth ile ilgili tipler tek yerden yönetilir.
// Bir tipi değiştirmek gerekirse sadece buraya bakman yeterli.

// Veritabanındaki User modelinin frontend'e gönderilen güvenli versiyonu.
// password alanı kasıtlı olarak yok — asla client'a gönderilmemeli.
export interface AuthUser {
  id: string
  name: string
  email: string
  role: "ADMIN" | "TENANT"
}

// Login ve register sonucunda dönen response tipi
export interface AuthResponse {
  user: AuthUser
}

// Auth context'inde tutulacak state tipi
// useAuth hook'u bu tipi kullanacak
export interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
}