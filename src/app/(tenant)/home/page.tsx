// Tenant home sayfası — kiracının ana sayfası.
// Duyurular ve son aktiviteler burada listelenecek.
// Şimdilik iskelet yapıyı kuruyoruz, veriyi sonra bağlayacağız.

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">

      {/* Hoşgeldin kartı */}
      <div className="bg-white rounded-xl border p-5">
        <h1 className="text-xl font-bold text-gray-900">Hoş geldin 👋</h1>
        <p className="text-sm text-gray-500 mt-1">
          Coliva'ya hoş geldin. Aşağıdan duyuruları ve aktiviteleri takip edebilirsin.
        </p>
      </div>

      {/* Özet kartlar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Kira Durumu</p>
          <p className="text-lg font-bold text-green-600 mt-1">Ödendi</p>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Açık Şikayet</p>
          <p className="text-lg font-bold text-gray-900 mt-1">0</p>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Uyum Skoru</p>
          <p className="text-lg font-bold text-blue-600 mt-1">100</p>
        </div>
      </div>

      {/* Duyurular */}
      <div className="bg-white rounded-xl border p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Son Duyurular
        </h2>
        {/* Duyuru listesi buraya gelecek */}
        <p className="text-sm text-gray-400 text-center py-6">
          Henüz duyuru yok.
        </p>
      </div>

    </div>
  )
}