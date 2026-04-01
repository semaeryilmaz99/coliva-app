# Coliva App — Güncel Proje Taslağı (Full Next.js)

## 🛠️ Tech Stack

| Teknoloji | Görev |
|---|---|
| Next.js 14 (App Router) | Frontend + API Routes |
| TypeScript | Tip güvenliği |
| Tailwind CSS | Styling |
| shadcn/ui | UI bileşenleri |
| Recharts | Grafikler |
| TanStack Table | Tablolar |
| PostgreSQL | Veritabanı |
| Prisma | ORM |
| JWT + bcrypt | Auth |
| Socket.io | Realtime chat |
| Zod | Validasyon |
| Vercel | Frontend deploy |
| Railway | PostgreSQL host |

---

## 📁 Klasör Yapısı

```
coliva-app/
│
├── prisma/
│   ├── schema.prisma            → DB şeması
│   └── seed.ts                  → Demo data
│
├── src/
│   │
│   ├── app/                     → Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx             → Landing / yönlendirme
│   │   ├── globals.css
│   │   │
│   │   ├── (auth)/              → Auth sayfaları (public)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (admin)/             → Admin sayfaları (protected)
│   │   │   ├── layout.tsx       → Admin sidebar + header
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── tenants/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── payments/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── announcements/
│   │   │   │   └── page.tsx
│   │   │   ├── complaints/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── chat/
│   │   │       ├── page.tsx
│   │   │       ├── group/
│   │   │       │   └── page.tsx
│   │   │       └── [userId]/
│   │   │           └── page.tsx
│   │   │
│   │   ├── (tenant)/            → Tenant sayfaları (protected)
│   │   │   ├── layout.tsx       → Tenant navbar
│   │   │   ├── home/
│   │   │   │   └── page.tsx
│   │   │   ├── payments/
│   │   │   │   └── page.tsx
│   │   │   ├── complaints/
│   │   │   │   ├── page.tsx
│   │   │   │   └── create/
│   │   │   │       └── page.tsx
│   │   │   ├── community/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── events/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── create/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── roommate/
│   │   │   │       ├── page.tsx
│   │   │   │       └── create/
│   │   │   │           └── page.tsx
│   │   │   └── chat/
│   │   │       ├── page.tsx
│   │   │       ├── group/
│   │   │       │   └── page.tsx
│   │   │       └── [userId]/
│   │   │           └── page.tsx
│   │   │
│   │   └── api/                 → API Routes (backend)
│   │       ├── auth/
│   │       │   ├── login/
│   │       │   │   └── route.ts
│   │       │   ├── register/
│   │       │   │   └── route.ts
│   │       │   └── logout/
│   │       │       └── route.ts
│   │       ├── tenants/
│   │       │   ├── route.ts     → GET (list), POST (create)
│   │       │   └── [id]/
│   │       │       └── route.ts → GET, PUT, DELETE
│   │       ├── payments/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── announcements/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── complaints/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── chat/
│   │       │   ├── rooms/
│   │       │   │   └── route.ts
│   │       │   └── messages/
│   │       │       └── route.ts
│   │       ├── events/
│   │       │   └── route.ts
│   │       ├── roommate/
│   │       │   └── route.ts
│   │       └── socket/
│   │           └── route.ts     → Socket.io handshake
│   │
│   ├── features/                → Feature-based mimari (SOLID)
│   │   ├── auth/
│   │   │   ├── components/      → LoginForm, RegisterForm
│   │   │   ├── hooks/           → useAuth.ts
│   │   │   ├── services/        → auth.service.ts (business logic)
│   │   │   ├── repositories/    → auth.repository.ts (Prisma)
│   │   │   ├── types/           → auth.types.ts
│   │   │   └── validations/     → auth.schema.ts (Zod)
│   │   ├── tenants/
│   │   │   ├── components/      → TenantTable, TenantCard, TenantForm
│   │   │   ├── hooks/           → useTenants.ts, useTenant.ts
│   │   │   ├── services/        → tenant.service.ts
│   │   │   ├── repositories/    → tenant.repository.ts
│   │   │   ├── types/           → tenant.types.ts
│   │   │   └── validations/     → tenant.schema.ts
│   │   ├── payments/
│   │   ├── announcements/
│   │   ├── complaints/
│   │   ├── chat/
│   │   ├── events/
│   │   └── roommate/
│   │
│   ├── components/
│   │   ├── ui/                  → shadcn/ui bileşenleri
│   │   ├── shared/              → Header, Sidebar, Navbar
│   │   └── providers/           → ThemeProvider, SocketProvider
│   │
│   ├── lib/
│   │   ├── prisma.ts            → Prisma client (singleton)
│   │   ├── auth.ts              → JWT helpers
│   │   ├── socket.ts            → Socket.io client
│   │   └── utils.ts             → cn(), formatDate() vb.
│   │
│   ├── hooks/                   → Global hooks (useSocket, useNotification)
│   ├── types/                   → Global TypeScript tipleri
│   ├── constants/               → Sabit değerler
│   └── middleware.ts            → Route koruması (JWT kontrolü)
│
├── server.ts                    → Custom Next.js server (Socket.io için)
├── .env
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔄 Request Akışı

```
Kullanıcı (Browser)
      ↓
src/app/(admin)/tenants/page.tsx     → View (Server Component)
      ↓ fetch
src/app/api/tenants/route.ts         → Controller (sadece req/res)
      ↓
src/features/tenants/services/       → Business Logic
      ↓
src/features/tenants/repositories/   → Prisma Sorgusu
      ↓
PostgreSQL
```

## ⚡ Realtime Chat Akışı

```
Kullanıcı
      ↓
server.ts (Custom Next.js Server + Socket.io)
      ↓
src/app/api/socket/route.ts          → Handshake
      ↓
src/features/chat/                   → Chat logic
      ↓
PostgreSQL (mesaj geçmişi)
```

---

## 🗄️ Prisma Şeması

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── KULLANICILAR ────────────────────────────────────

model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  password     String
  phone        String?
  role         Role     @default(TENANT)
  roomNumber   String?
  score        Int      @default(100)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  payments         Payment[]
  announcements    Announcement[]
  complaintsGiven  Complaint[]    @relation("ComplaintFrom")
  complaintsAbout  Complaint[]    @relation("ComplaintAbout")
  warnings         Warning[]
  sentMessages     Message[]
  events           Event[]
  roommatePost     RoommatePost?
  notifications    Notification[]
  roomParticipants RoomParticipant[]
}

enum Role {
  ADMIN
  TENANT
}

// ─── KİRA / ÖDEMELER ─────────────────────────────────

model Payment {
  id        String        @id @default(cuid())
  userId    String
  amount    Float
  month     String        // "2024-01"
  status    PaymentStatus @default(PENDING)
  paidAt    DateTime?
  createdAt DateTime      @default(now())

  user User @relation(fields: [userId], references: [id])
}

enum PaymentStatus {
  PENDING
  PAID
  OVERDUE
}

// ─── DUYURULAR ───────────────────────────────────────

model Announcement {
  id        String   @id @default(cuid())
  title     String
  content   String
  authorId  String
  createdAt DateTime @default(now())

  author        User           @relation(fields: [authorId], references: [id])
  notifications Notification[]
}

// ─── ŞİKAYETLER ──────────────────────────────────────

model Complaint {
  id          String            @id @default(cuid())
  title       String
  description String
  category    ComplaintCategory
  status      ComplaintStatus   @default(OPEN)
  isAnonymous Boolean           @default(false)
  fromId      String
  aboutId     String?
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt

  from     User      @relation("ComplaintFrom", fields: [fromId], references: [id])
  about    User?     @relation("ComplaintAbout", fields: [aboutId], references: [id])
  warnings Warning[]
}

enum ComplaintCategory {
  NOISE
  CLEANLINESS
  COMMON_AREA
  OTHER
}

enum ComplaintStatus {
  OPEN
  IN_PROGRESS
  RESOLVED
}

// ─── UYARILAR ────────────────────────────────────────

model Warning {
  id          String   @id @default(cuid())
  userId      String
  complaintId String?
  message     String
  createdAt   DateTime @default(now())

  user      User       @relation(fields: [userId], references: [id])
  complaint Complaint? @relation(fields: [complaintId], references: [id])
}

// ─── CHAT ─────────────────────────────────────────────

model Room {
  id        String   @id @default(cuid())
  type      RoomType
  createdAt DateTime @default(now())

  messages     Message[]
  participants RoomParticipant[]
}

model RoomParticipant {
  id     String @id @default(cuid())
  roomId String
  userId String

  room Room @relation(fields: [roomId], references: [id])
  user User @relation(fields: [userId], references: [id])

  @@unique([roomId, userId])
}

model Message {
  id        String   @id @default(cuid())
  content   String
  senderId  String
  roomId    String
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())

  sender User @relation(fields: [senderId], references: [id])
  room   Room @relation(fields: [roomId], references: [id])
}

enum RoomType {
  GROUP
  DIRECT
}

// ─── ETKİNLİKLER ─────────────────────────────────────

model Event {
  id          String   @id @default(cuid())
  title       String
  description String?
  date        DateTime
  location    String?
  authorId    String
  createdAt   DateTime @default(now())

  author User @relation(fields: [authorId], references: [id])
}

// ─── ODA ARKADAŞI ────────────────────────────────────

model RoommatePost {
  id          String    @id @default(cuid())
  userId      String    @unique
  description String
  budget      Float?
  moveInDate  DateTime?
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())

  user User @relation(fields: [userId], references: [id])
}

// ─── BİLDİRİMLER ─────────────────────────────────────

model Notification {
  id             String           @id @default(cuid())
  userId         String
  type           NotificationType
  message        String
  isRead         Boolean          @default(false)
  announcementId String?
  createdAt      DateTime         @default(now())

  user         User          @relation(fields: [userId], references: [id])
  announcement Announcement? @relation(fields: [announcementId], references: [id])
}

enum NotificationType {
  ANNOUNCEMENT
  PAYMENT_DUE
  COMPLAINT
  WARNING
  EVENT
  MESSAGE
}
```

---

## 📋 Phase Planı

| Phase | Kapsam | Süre |
|---|---|---|
| **Phase 1** | Auth + Kiracı/Kira yönetimi + Duyurular + Şikayetler + Bildirimler | 5 hafta |
| **Phase 2** | Realtime chat + Topluluk uyum skoru | 2 hafta |
| **Phase 3** | Etkinlikler + Oda arkadaşı | 2 hafta |

**Phase 1 bitti = LinkedIn paylaşımı yap.**