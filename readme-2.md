# 🏢 Coliva App

Coliva, apartman ve yurt gibi toplu yaşam alanlarını dijitalleştiren bir yönetim platformudur. Kiracı yönetimi, kira takibi, duyurular, şikayet sistemi ve gerçek zamanlı iletişim gibi özellikler sunar.

---

## 🚀 Tech Stack

| Katman | Teknoloji |
|---|---|
| Frontend + API | Next.js 15 (App Router) |
| Dil | TypeScript |
| Stil | Tailwind CSS + shadcn/ui |
| Veritabanı | PostgreSQL (Railway) |
| ORM | Prisma 5 |
| Auth | JWT + bcrypt |
| Realtime | Socket.io |
| Validasyon | Zod |
| Grafikler | Recharts |
| Tablolar | TanStack Table |
| Tarih | Day.js |
| Deploy | Vercel (frontend) + Railway (DB) |

---

## 📁 Proje Yapısı

```
coliva-app/
├── prisma/
│   ├── schema.prisma          # Veritabanı şeması
│   └── migrations/            # Migration geçmişi
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Auth sayfaları (login, register)
│   │   ├── (admin)/           # Admin sayfaları (protected)
│   │   ├── (tenant)/          # Tenant sayfaları (protected)
│   │   └── api/               # API endpoint'leri
│   │       └── auth/
│   │           ├── login/
│   │           ├── register/
│   │           └── logout/
│   │
│   ├── features/              # Feature-based mimari (SOLID)
│   │   ├── auth/
│   │   │   ├── components/    # LoginForm, RegisterForm
│   │   │   ├── hooks/         # useAuth
│   │   │   ├── services/      # Business logic
│   │   │   ├── repositories/  # Prisma sorguları
│   │   │   ├── types/         # TypeScript tipleri
│   │   │   └── validations/   # Zod şemaları
│   │   ├── tenants/
│   │   ├── payments/
│   │   ├── announcements/
│   │   ├── complaints/
│   │   ├── chat/
│   │   ├── events/
│   │   └── roommate/
│   │
│   ├── components/
│   │   ├── ui/                # shadcn/ui bileşenleri
│   │   ├── shared/            # Header, Sidebar vb.
│   │   └── providers/         # Context provider'ları
│   │
│   ├── lib/
│   │   ├── prisma.ts          # Prisma singleton client
│   │   ├── auth.ts            # JWT helper'ları
│   │   ├── socket.ts          # Socket.io client
│   │   └── utils.ts           # Yardımcı fonksiyonlar
│   │
│   ├── hooks/                 # Global custom hook'lar
│   ├── types/                 # Global TypeScript tipleri
│   ├── constants/             # Sabit değerler
│   └── middleware.ts          # Route koruması
│
├── .env                       # Ortam değişkenleri
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🗄️ Veritabanı Şeması

Prisma ile tanımlanmış tablolar:

| Tablo | Açıklama |
|---|---|
| `User` | Kiracılar ve yöneticiler |
| `Payment` | Kira ödemeleri |
| `Announcement` | Duyurular |
| `Complaint` | Şikayetler |
| `Warning` | Uyarılar |
| `Room` | Chat odaları |
| `Message` | Chat mesajları |
| `RoomParticipant` | Chat katılımcıları |
| `Event` | Etkinlikler |
| `RoommatePost` | Oda arkadaşı ilanları |
| `Notification` | Bildirimler |

---

## 🔐 Auth Sistemi

### Akış

```
Kullanıcı formu doldurur
        ↓
RegisterForm / LoginForm   → Formu gösterir, veriyi toplar
        ↓
useAuth hook               → API'ye istek atar
        ↓
API Route (route.ts)       → Zod ile veriyi doğrular
        ↓
Service katmanı            → Business logic (şifre hash, kontrol)
        ↓
Repository katmanı         → Prisma ile veritabanı işlemi
        ↓
JWT token üretilir         → HTTP-only cookie olarak saklanır
        ↓
Kullanıcı role göre yönlendirilir
```

### Güvenlik Kararları

- **Şifre hashleme** — bcrypt ile hash'lenir, veritabanında düz metin saklanmaz
- **JWT token** — 7 günlük geçerlilik süresi, kullanıcı bilgisi (id, email, role) taşır
- **HTTP-only cookie** — JavaScript ile erişilemez, XSS saldırılarına karşı güvenli
- **Middleware** — Her istekte token doğrulanır, rol kontrolü yapılır
- **Genel hata mesajı** — "Email veya şifre hatalı" ile hangi alanın yanlış olduğu gizlenir

---

## 👥 Roller

| Rol | Açıklama | Yönlendirme |
|---|---|---|
| `ADMIN` | Apartman yöneticisi | `/admin/dashboard` |
| `TENANT` | Kiracı | `/home` |

---

## 📋 Feature Planı

### ✅ Tamamlanan
- [x] Proje kurulumu (Next.js 15, TypeScript, Tailwind, shadcn/ui)
- [x] Veritabanı kurulumu (PostgreSQL + Prisma migrate)
- [x] Auth feature (register, login, logout)
- [x] JWT + HTTP-only cookie
- [x] Middleware (route koruması + rol kontrolü)

### 🔄 Devam Eden (Phase 1)
- [ ] Tenant home sayfası
- [ ] Admin dashboard
- [ ] Kiracı yönetimi
- [ ] Kira takibi
- [ ] Duyurular
- [ ] Şikayet sistemi
- [ ] Push notification

### 📅 Planlanıyor (Phase 2)
- [ ] Realtime chat (group + DM)
- [ ] Topluluk uyum skoru

### 📅 Planlanıyor (Phase 3)
- [ ] Etkinlik / aktivite sistemi
- [ ] Oda arkadaşı bulma

---

## ⚙️ Kurulum

### Gereksinimler
- Node.js 20+
- PostgreSQL (Railway veya local)

### Adımlar

```bash
# Repoyu klonla
git clone https://github.com/semaeryilmaz99/coliva-app.git
cd coliva-app

# Bağımlılıkları yükle
npm install

# .env dosyasını oluştur
cp .env.example .env
# DATABASE_URL ve JWT_SECRET değerlerini doldur

# Veritabanını migrate et
npx prisma migrate dev

# Geliştirme sunucusunu başlat
npm run dev
```

### Ortam Değişkenleri

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your_secret_key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🏛️ Mimari Prensipler

Bu proje **SOLID** prensipleri ve **Clean Code** anlayışıyla geliştirilmektedir.

**Single Responsibility** — Her katmanın tek bir sorumluluğu var. Repository sadece DB sorguları, service sadece business logic, route sadece HTTP yönetimi.

**Open/Closed** — Yeni bir feature eklemek için mevcut kodu değiştirmek gerekmez, `features/` altına yeni bir klasör açılır.

**Dependency Inversion** — Üst katmanlar alt katmanlara doğrudan bağımlı değil. Service, repository interface'ini kullanır.

**Feature-based mimari** — Her özellik kendi klasöründe yaşar: `components`, `hooks`, `services`, `repositories`, `types`, `validations`.