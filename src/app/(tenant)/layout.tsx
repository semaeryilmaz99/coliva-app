// Tenant layout'u — tüm tenant sayfalarını saran wrapper.
// Sidebar veya navbar burada tanımlanır.
// Bu layout içindeki tüm sayfalar otomatik olarak
// bu navbar'ı görür — her sayfada tekrar yazmak gerekmez.

import { TenantNavbar } from "@/components/shared/TenantNavbar"

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TenantNavbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}