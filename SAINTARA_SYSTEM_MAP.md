# SAINTARA — SYSTEM MAP & AUDIT

> Dokumen audit menyeluruh terhadap codebase SAINTARA pada kondisi saat ini.
> Tujuan: memetakan apa yang **sudah ada**, apa yang **masih mock**, apa yang
> **siap production**, dan apa yang **belum ada** dibanding visi/PRD produk.
>
> - **Tanggal audit:** 2026-06-07
> - **Branch:** `claude/confident-archimedes-lkBkx`
> - **Stack:** Next.js 14.2.3 (App Router) · React 18 · TypeScript (strict) · TailwindCSS · NextAuth 4 · Drizzle ORM + better-sqlite3 · Recharts · next-pwa
> - **Total kode aplikasi:** ~2.900 LOC (folder `app/`, `components/`, `lib/`)
>
> ⚠️ **Catatan penting:** Tidak ada file PRD formal di dalam repo. Bagian
> "Missing Features dibanding PRD Final" disusun berdasarkan **visi produk**
> ("Global Human Intelligence Assessment Platform"), **klaim pemasaran** di
> landing page, dan **tier harga** (Personal / Professional / Enterprise).

---

## 1. Struktur Folder Lengkap

```
saintara/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (fonts Inter/Inter Tight, metadata, PWA, SessionProvider)
│   ├── globals.css                   # Design system (tokens, utilities, reveal anim, reduced-motion)
│   │
│   ├── (landing)/                    # Route group: marketing publik
│   │   ├── layout.tsx                # Pass-through layout
│   │   └── page.tsx                  # Landing page (komposisi 10 section)
│   │
│   ├── (auth)/                       # Route group: autentikasi
│   │   ├── layout.tsx                # Split-screen (panel brand ink + form)
│   │   ├── login/page.tsx            # Login (NextAuth credentials, demo user)
│   │   └── register/page.tsx         # Register (MOCK — tidak membuat user)
│   │
│   ├── (app)/                        # Route group: produk terotentikasi
│   │   ├── layout.tsx                # Shell (Sidebar + main + BottomNav)
│   │   ├── dashboard/page.tsx        # Dashboard (mock data via sessionStorage)
│   │   └── assessment/
│   │       ├── page.tsx              # Step 1: input form
│   │       ├── confirm/page.tsx      # Step 2: konfirmasi data
│   │       ├── processing/page.tsx   # Step 3: animasi proses + jalankan algoritma
│   │       └── result/[id]/page.tsx  # Step 4: laporan hasil
│   │
│   └── api/                          # Route handlers
│       ├── assessment/route.ts       # POST: jalankan algoritma (TIDAK dipakai UI)
│       └── auth/[...nextauth]/route.ts  # NextAuth handler
│
├── components/
│   ├── ui/                           # Primitives reusable
│   │   ├── Button.tsx                # variants: primary/light/gold/outline/ghost/danger
│   │   ├── Card.tsx                  # hover/bordered/padded
│   │   ├── Input.tsx                 # label/error/hint/icons
│   │   ├── Modal.tsx                 # overlay + body lock
│   │   ├── Badge.tsx                 # variants warna
│   │   └── Reveal.tsx                # scroll-reveal (IntersectionObserver)
│   │
│   ├── layout/
│   │   ├── Navbar.tsx                # Navbar landing (scroll-aware)
│   │   ├── Sidebar.tsx               # Sidebar app (desktop)
│   │   └── BottomNav.tsx             # Bottom nav app (mobile)
│   │
│   ├── landing/                      # Section landing page
│   │   ├── Hero.tsx                  # Hero + ProductMockup
│   │   ├── ProductMockup.tsx         # Mockup kartu laporan (statik)
│   │   ├── MiniRadar.tsx             # Radar SVG ringan (tanpa lib)
│   │   ├── StatsBar.tsx              # Strip metrik
│   │   ├── ReportPreview.tsx         # Preview laporan interaktif (#sample)
│   │   ├── HowItWorks.tsx            # 3 langkah
│   │   ├── Features.tsx              # Bento fitur
│   │   ├── Testimonials.tsx          # Testimoni + trust signals (MOCK)
│   │   ├── Pricing.tsx               # 3 tier harga
│   │   ├── FAQ.tsx                   # Accordion
│   │   ├── CTA.tsx                   # Call-to-action
│   │   └── Footer.tsx                # Footer
│   │
│   ├── assessment/
│   │   ├── AssessmentForm.tsx        # Form input (nama/tgl lahir/gol darah)
│   │   ├── AssessmentSteps.tsx       # Stepper 4 langkah
│   │   ├── ProfileBadge.tsx          # Badge profil (ikon karakter)
│   │   └── ResultCard.tsx            # Seksi laporan (kekuatan/karier/dll)
│   │
│   ├── charts/
│   │   ├── RadarChart.tsx            # Recharts radar (interaktif)
│   │   └── BarChart.tsx              # Recharts bar
│   │
│   └── providers/
│       └── SessionProvider.tsx       # Wrapper next-auth SessionProvider
│
├── lib/
│   ├── algorithm.ts                  # Engine "assessment" (PRNG ber-seed deterministik)
│   ├── auth.ts                       # Konfigurasi NextAuth (MOCK_USERS)
│   ├── db.ts                         # Skema Drizzle + better-sqlite3 (TIDAK dipakai)
│   ├── mock.ts                       # Seeding & helper sessionStorage (mock data)
│   ├── character.ts                  # Map characterType → ikon + esensi
│   └── utils.ts                      # cn, formatDate, formatCurrency, dll
│
├── public/
│   ├── manifest.json                 # PWA manifest
│   ├── favicon.svg
│   └── icons/icon-192x192.svg, icon-512x512.svg
│   └── (sw.js, workbox-*.js)         # Artefak build next-pwa (gitignored)
│
├── next.config.js                    # next-pwa wrapper
├── tailwind.config.ts                # Design tokens
├── tsconfig.json · postcss.config.js · package.json · README.md
```

---

## 2. Routing yang Sudah Ada

| Path | Tipe | Auth | Status | Keterangan |
|------|------|------|--------|------------|
| `/` | Static | Publik | ✅ Production-ready (visual) | Landing page premium |
| `/login` | Static | Publik | ⚠️ Mock | Hanya user demo yang valid |
| `/register` | Static | Publik | ❌ Mock | Tidak membuat akun (timeout → `/login`) |
| `/dashboard` | Dynamic (`force-dynamic`) | Client-guard | ⚠️ Mock | Data dari `sessionStorage` |
| `/assessment` | Static | Client-guard* | ⚠️ Mock | Step 1 — input |
| `/assessment/confirm` | Static | Client-guard* | ⚠️ Mock | Step 2 — konfirmasi |
| `/assessment/processing` | Static | Client-guard* | ⚠️ Mock | Step 3 — proses |
| `/assessment/result/[id]` | Dynamic | Client-guard* | ⚠️ Mock | Step 4 — laporan |
| `/api/assessment` | Route handler (POST) | ❌ Tidak ada | 🟡 Orphan | Ada, tapi **tidak dipanggil** UI |
| `/api/auth/[...nextauth]` | Route handler | — | ⚠️ Mock | Handler NextAuth |

> \* **Proteksi route hanya di sisi client** (redirect via `useEffect` di
> dashboard). Tidak ada `middleware.ts`. Halaman `/assessment/*` bahkan tidak
> punya guard sama sekali — bisa diakses tanpa login.

**Belum ada:** Profil, Pengaturan, Riwayat penuh, Billing, halaman legal
(Privasi/Syarat), Blog, Admin, `error.tsx`, `loading.tsx`, `not-found.tsx`.

---

## 3. Database Schema yang Sudah Ada

📄 `lib/db.ts` — **didefinisikan tetapi TIDAK PERNAH diimpor/dipakai** di mana pun.

```ts
// Drizzle ORM + better-sqlite3 (file ./saintara.db)
users {
  id            text  PK
  name          text  NOT NULL
  email         text  NOT NULL UNIQUE
  passwordHash  text  NOT NULL
  createdAt     text  DEFAULT CURRENT_TIMESTAMP
}

assessments {
  id                  text  PK
  userId              text  → users.id
  name                text  NOT NULL
  birthDate           text  NOT NULL
  bloodType           text  NOT NULL
  characterType       text  NOT NULL
  intelligenceScores  text  NOT NULL   // JSON string
  strengths           text  NOT NULL   // JSON string
  weaknesses          text  NOT NULL   // JSON string
  careerPaths         text  NOT NULL   // JSON string
  createdAt           text  DEFAULT CURRENT_TIMESTAMP
}
```

**Temuan kritis:**
- `getDb()` membuat tabel saat dipanggil — **tetapi tidak ada satu pun pemanggil**.
- `better-sqlite3` berbasis file lokal → **tidak akan berjalan di serverless** (Vercel/Netlify) karena filesystem ephemeral/read-only.
- Tidak ada migrasi, seed DB, relasi yang ditegakkan, indeks, atau tabel untuk: sessions, orders/payments, subscriptions, teams, action-plan progress.
- Persistensi nyata saat ini = **`sessionStorage` browser** (lihat §6).

---

## 4. Auth Flow yang Sudah Ada

📄 `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`, `components/providers/SessionProvider.tsx`

```
[Login form] --signIn('credentials')--> NextAuth CredentialsProvider
   authorize() → cek MOCK_USERS (1 user, password PLAINTEXT) → return user | null
   strategy: JWT (maxAge 30 hari) → callbacks set token.id / session.user.id
   pages: signIn '/login', error '/login'
```

**Yang ada:**
- NextAuth v4 dengan `CredentialsProvider`, sesi JWT, `SessionProvider` di root.
- Satu user mock: `demo@saintara.id` / `demo1234` (perbandingan password plaintext).
- Helper UI: `useSession`, `signIn`, `signOut` (Sidebar, dashboard, login).

**Mock / belum ada:**
- ❌ **Registrasi tidak fungsional** — `register/page.tsx` hanya `setTimeout(800)` lalu redirect ke `/login`. Tidak menulis user.
- ❌ Tidak ada hashing aktif (`bcryptjs` terpasang sebagai dependency tapi **tidak dipakai**).
- ❌ Tidak terhubung ke DB (`users` table tak tersentuh).
- ❌ Tidak ada OAuth/SSO, verifikasi email, reset password, magic link.
- ⚠️ **`NEXTAUTH_SECRET` punya fallback hardcoded** di source (`'saintara-secret-phase1-2024'`) — risiko keamanan.
- ⚠️ Warning runtime `NEXTAUTH_URL` (belum diset; `.env.example` tidak ada).
- ⚠️ Proteksi route hanya client-side (tidak ada `middleware`).

---

## 5. Payment Flow yang Sudah Ada

❌ **TIDAK ADA payment flow nyata.** Yang ada hanyalah UI/teaser.

| Titik | Lokasi | Perilaku aktual |
|-------|--------|------------------|
| Tombol tier "Pilih Professional" / "Mulai sekarang" | `landing/Pricing.tsx` | Link ke `/register` |
| Tombol "Hubungi sales" (Enterprise) | `landing/Pricing.tsx` | Anchor `#contact` (mati) |
| Modal "Buka laporan lengkap" | `assessment/result/[id]/page.tsx` | Tampil daftar fitur premium |
| Tombol **"Bayar Rp 199.000"** | result modal | **No-op** (tidak ada `onClick`) |
| Action plan terkunci (blur) | `ResultCard.tsx` | Murni visual (blur CSS) |

**Belum ada:** integrasi gateway (Midtrans/Xendit/Stripe), webhook, model
order/invoice, status langganan, entitlement/gating premium di server, kuitansi,
refund, riwayat transaksi.

---

## 6. Assessment Flow yang Sudah Ada

📄 `app/(app)/assessment/*`, `components/assessment/*`, `lib/algorithm.ts`, `lib/mock.ts`

```
/assessment (AssessmentForm)
   ├─ validasi client (nama ≥2, tgl lahir masa lalu, gol darah)
   └─ simpan → sessionStorage['assessment_draft']
        ↓
/assessment/confirm
   └─ tampilkan draft → konfirmasi
        ↓
/assessment/processing
   ├─ runAssessment(draft)              ← algoritma jalan di CLIENT
   ├─ saveResult() → sessionStorage['result_<id>'] + ['completed_assessments']
   └─ animasi 3.4s → redirect
        ↓
/assessment/result/[id]
   └─ getResult(id) dari sessionStorage → render laporan
```

**Engine — `lib/algorithm.ts`:**
- **Deterministik PRNG ber-seed** dari `hash(nama) + tanggal + koefisien golongan darah`.
- Output: 6 dimensi kecerdasan, 1 dari 6 tipe karakter, kekuatan/kelemahan, 3 jalur karier, gaya relasi, 3 daily challenge (2 terkunci).
- ⚠️ **Bukan AI, bukan instrumen psikometri** — tidak ada validitas/reliabilitas. Secara teknis ini generator pseudo-acak (mirip numerologi).
- 🟡 Field `profileEmoji` & `profileColor` masih dihasilkan tapi **tidak lagi dipakai UI** (UI sekarang pakai ikon via `lib/character.ts`) → dead fields.

**Temuan:**
- 🟡 `POST /api/assessment` menjalankan algoritma yang sama, **tetapi UI tidak memanggilnya** (algoritma dijalankan client-side). API praktis orphan.
- ❌ Hasil **hanya di `sessionStorage`** → hilang saat tab ditutup; **share link tidak berfungsi lintas device** (penerima tidak punya `result_<id>`).
- ❌ Tidak ada persistensi DB, tidak ada keterkaitan ke `userId`.

---

## 7. Dashboard Flow yang Sudah Ada

📄 `app/(app)/dashboard/page.tsx`, `lib/mock.ts`, `lib/character.ts`

```
Mount:
  ├─ useSession() → jika 'unauthenticated' redirect /login (client guard)
  ├─ ensureSeed()  → seed 2 laporan contoh ke sessionStorage (sekali, key 'saintara_seeded_v2')
  └─ getHistory()  → render riwayat
Tampilan:
  ├─ Greeting + tanggal
  ├─ CTA "Mulai analisis" (ink card)
  ├─ Stat cards: Total analisis · Minggu ini · Action plan (20% STATIS)
  ├─ Riwayat analisis (list → /assessment/result/<id>)
  └─ Teaser action plan
```

**Mock:** seluruh data berasal dari `sessionStorage` + seeding. Statistik
"Action plan 20%" hardcoded. Tidak ada fetch ke server. "Minggu ini" dihitung
dari `createdAt` lokal.

---

## 8. Komponen yang Reusable

| Komponen | Lokasi | Catatan |
|----------|--------|---------|
| `Button` | `ui/Button.tsx` | 6 varian, sizes, loading, fullWidth — dipakai luas |
| `Card` | `ui/Card.tsx` | hover/bordered/padded |
| `Input` | `ui/Input.tsx` | label/error/hint/icon kiri-kanan |
| `Modal` | `ui/Modal.tsx` | overlay + body scroll lock |
| `Badge` | `ui/Badge.tsx` | varian warna |
| `Reveal` | `ui/Reveal.tsx` | scroll-reveal generik (IO + reduced-motion) |
| `MiniRadar` | `landing/MiniRadar.tsx` | radar SVG ringan, prop `dark`, reusable di mana saja |
| `AssessmentSteps` | `assessment/AssessmentSteps.tsx` | stepper 4 langkah |
| `ProfileBadge` | `assessment/ProfileBadge.tsx` | badge profil berbasis ikon |
| `RadarChart` / `BarChart` | `charts/*` | recharts, terima `IntelligenceScores` |
| `Sidebar` / `BottomNav` / `Navbar` | `layout/*` | shell navigasi |
| `lib/utils` | `cn`, `formatDate`, `formatCurrency`, `calculateAge`, `generateId`, `sleep` | utilitas umum |
| `lib/character` | `characterIcon`, `characterEssence` | mapping tipe karakter |

> Design system (tokens warna, tipografi Inter/Inter Tight, `.eyebrow`,
> `.section-title`, `.input-field`, dll) terpusat di `tailwind.config.ts` +
> `globals.css` → konsisten dan reusable.

---

## 9. Komponen / Bagian yang Masih MOCK

| Item | Lokasi | Sifat mock |
|------|--------|------------|
| Autentikasi | `lib/auth.ts` | 1 user hardcoded, password plaintext |
| Registrasi | `(auth)/register` | tidak membuat user |
| Persistensi data | `lib/mock.ts` + `sessionStorage` | bukan DB; volatile |
| Seeding riwayat | `lib/mock.ts` (`ensureSeed`) | 2 laporan contoh dibuat di browser |
| Engine assessment | `lib/algorithm.ts` | PRNG deterministik, bukan assessment nyata |
| Payment & premium | result modal, Pricing | tidak ada transaksi |
| PDF download | result page/modal | tidak ada generator |
| Testimoni & trust | `landing/Testimonials.tsx` | nama/peran sintetis |
| Statistik landing & dashboard | `StatsBar`, dashboard | sebagian statis |
| Rating "4.9" / "ribuan pengguna" | Hero | klaim belum terverifikasi |
| Link legal/sosial/blog | Footer, register | `href="#"` (placeholder) |

---

## 10. Komponen / Bagian yang SIAP Production (FE)

> "Siap production" = lapisan front-end matang & konsisten; **masih bergantung
> pada backend nyata untuk data**.

- ✅ **Design system** (tokens, tipografi, kontras, reduced-motion).
- ✅ **Landing page** (`/`) — semua 10 section, responsif desktop/mobile.
- ✅ **UI primitives** (`Button`, `Card`, `Input`, `Modal`, `Badge`, `Reveal`).
- ✅ **Auth UI** (login/register layout & form — logikanya yang masih mock).
- ✅ **Assessment UX** (stepper, form + validasi, konfirmasi, processing).
- ✅ **Report experience UI** (header, radar/bar toggle, kartu seksi).
- ✅ **Shell aplikasi** (Sidebar, BottomNav, responsif).
- ✅ **Visualisasi** (RadarChart, BarChart, MiniRadar).
- ✅ **PWA assets** (manifest, ikon, favicon) + **SEO/OG meta** (`app/layout.tsx`).
- ✅ **Aksesibilitas dasar** (`prefers-reduced-motion` dihormati).

---

## 11. Technical Debt

**🔴 Tinggi**
1. **DB tidak terpakai & tak kompatibel serverless** — `better-sqlite3` berbasis file; skema `lib/db.ts` nol pemanggil. Perlu migrasi ke Postgres (Neon/Supabase) + Drizzle.
2. **Persistensi `sessionStorage`** — data hilang & share link rusak lintas device. Harus pindah ke DB.
3. **Auth mock + secret hardcoded** — fallback `NEXTAUTH_SECRET` di source; registrasi palsu; tidak pakai hashing meski `bcryptjs` ada.
4. **Tidak ada proteksi route server-side** — belum ada `middleware.ts`; `/assessment/*` tanpa guard.
5. **Klaim vs realita** — engine "assessment" adalah PRNG; perlu instrumen valid atau LLM yang jujur (klaim "AI"/akurasi sebagian sudah dilunakkan di copy, perlu konsisten).

**🟠 Sedang**
6. `POST /api/assessment` orphan (tak dipakai) + tanpa validasi/rate-limit.
7. Dependencies tak terpakai: `bcryptjs`, `jose` (terpasang, tidak dipakai).
8. Field mati `profileEmoji`/`profileColor` di `algorithm.ts`.
9. Tidak ada `error.tsx` / `loading.tsx` / `not-found.tsx` (UX error/loading default).
10. Tidak ada test (unit/e2e), tidak ada CI, tidak ada linting yang ditegakkan.
11. `.env.example` tidak ada; `NEXTAUTH_URL` belum diset (warning runtime).
12. `userScalable=false` + `maximumScale=1` di viewport (`app/layout.tsx`) — isu aksesibilitas (zoom diblokir).

**🟡 Rendah**
13. Font dimuat via `<link>` Google Fonts (boleh dimigrasi ke `next/font` untuk performa).
14. Dua mekanisme radar (recharts `RadarChart` + SVG `MiniRadar`) hidup berdampingan — disengaja, tapi perlu kejelasan kapan pakai yang mana.
15. Nav "Akun" (BottomNav) & beberapa link masih mengarah ke `/dashboard` / `#`.
16. Statistik dashboard ("Action plan 20%") hardcoded.

---

## 12. Missing Features dibanding PRD Final (Visi Produk)

> Dasar pembanding: visi "Global Human Intelligence Assessment Platform" + klaim
> landing + tier Personal/Professional/Enterprise. (Tidak ada file PRD di repo.)

### A. Fondasi / Backend
- [ ] Database produksi (Postgres) + migrasi + persistensi laporan & user
- [ ] Autentikasi nyata: registrasi DB, hashing (bcrypt), verifikasi email, reset password
- [ ] OAuth / SSO (Google, dll) — relevan untuk Enterprise
- [ ] Proteksi route server-side (`middleware`) + RBAC (user/admin/team)
- [ ] Penyimpanan & pengambilan laporan via `userId` (riwayat lintas device)
- [ ] Public/shareable report links yang benar-benar berfungsi

### B. Monetisasi
- [ ] Integrasi payment gateway (Midtrans/Xendit/Stripe) + webhook
- [ ] Model order/invoice + status langganan + entitlement premium server-side
- [ ] Halaman Billing / riwayat transaksi / refund
- [ ] Gating fitur premium yang nyata (bukan blur CSS)

### C. Fitur Produk Inti
- [ ] **Generator PDF laporan 20+ halaman** (dijanjikan di pricing)
- [ ] **Action Plan 30 hari** sebagai fitur nyata (tracking progress, unlock harian)
- [ ] **Instrumen assessment yang valid** (psikometri tervalidasi atau LLM jujur) menggantikan PRNG
- [ ] Halaman **Profil** & **Pengaturan** akun
- [ ] Update laporan tahunan (klaim Professional)

### D. Enterprise / Team
- [ ] Assessment tim (multi-user, undangan)
- [ ] Dashboard analytics tim
- [ ] API integration (publik, terotentikasi)
- [ ] White-label / custom branding
- [ ] Konsultasi 1-on-1 (penjadwalan)

### E. Internasionalisasi & Konten
- [ ] **i18n** 4 bahasa (ID/EN/Mandarin/Arab) — diklaim, belum ada
- [ ] Halaman legal: Kebijakan Privasi, Syarat & Ketentuan, Keamanan Data
- [ ] Blog / konten

### F. Operasional & Kualitas
- [ ] Email transaksional & notifikasi
- [ ] Admin panel
- [ ] Analytics/telemetry produk (mis. PostHog/GA)
- [ ] Error/loading/not-found boundaries
- [ ] Test (unit + e2e) + CI/CD
- [ ] Rate limiting & proteksi abuse pada API
- [ ] Audit aksesibilitas (WCAG AA) penuh

---

## Ringkasan Eksekutif

| Lapisan | Status |
|---------|--------|
| **Front-end / UI / Design system** | 🟢 Matang & konsisten (premium tech-platform) |
| **Alur produk (UX)** | 🟢 Lengkap end-to-end (login → dashboard → assessment → report) |
| **Data & persistensi** | 🔴 Mock (`sessionStorage`); DB ada tapi tak dipakai |
| **Autentikasi** | 🔴 Mock (1 user, registrasi palsu) |
| **Payment / premium** | 🔴 Belum ada (UI only) |
| **Engine assessment** | 🟠 Deterministik PRNG (bukan assessment ilmiah) |
| **Enterprise / i18n / PDF / action plan** | 🔴 Belum ada |

**Kesimpulan:** SAINTARA saat ini adalah **prototipe front-end berkualitas
produksi di atas data mock**. Lapisan tampilan & UX sudah kuat dan kohesif;
fondasi backend (DB, auth nyata, payment, PDF, instrumen assessment valid,
fitur enterprise, i18n) **belum dibangun** dan menjadi jalur kerja utama menuju
production.
