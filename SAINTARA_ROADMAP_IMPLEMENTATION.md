# SAINTARA — ROADMAP IMPLEMENTATION

> Roadmap implementasi berbasis temuan **`SAINTARA_SYSTEM_MAP.md`**.
> Tujuan: mengubah prototipe front-end (berjalan di atas mock data) menjadi
> produk yang dapat diluncurkan, dikomersialkan, lalu di-scale ke enterprise.
>
> - **Tanggal:** 2026-06-07
> - **Branch:** `claude/confident-archimedes-lkBkx`
> - **Titik awal:** FE matang ✅ · Backend/DB/Auth/Payment ❌ (lihat audit)

---

## Cara Membaca Dokumen

**Fase prioritas**
| Fase | Nama | Definisi "selesai" (exit criteria) |
|------|------|------------------------------------|
| **P0** | MVP Launch | Produk nyata bisa dipakai 1 user end-to-end: daftar → login → assessment → laporan tersimpan permanen. Tanpa pembayaran. |
| **P1** | Commercial Launch | Bisa menghasilkan uang: pembayaran, gating premium, PDF, action plan, legal, i18n dasar. |
| **P2** | Enterprise | Multi-user/tim, API, white-label, SSO, admin, skalabilitas. |

**Skala Kompleksitas** (estimasi 1 engineer full-stack)
| Simbol | Arti | Perkiraan |
|--------|------|-----------|
| `XS` | sangat kecil | < 1 hari |
| `S` | kecil | 1–2 hari |
| `M` | sedang | 3–5 hari |
| `L` | besar | 1–2 minggu |
| `XL` | sangat besar | 3+ minggu |

**Skala Risiko:** 🟢 rendah · 🟡 sedang · 🔴 tinggi
**Prioritas dalam fase:** `must` (blocker rilis) · `should` · `nice`

---

# 🟥 P0 — MVP Launch

**Tema:** Hentikan ketergantungan pada `sessionStorage` & mock auth. Jadikan
data & akun **nyata dan permanen**. Tidak ada monetisasi di fase ini.

**Exit criteria P0:**
- User dapat registrasi → login (DB-backed) → menjalankan assessment → laporan **tersimpan permanen** & bisa dibuka lagi/lintas device.
- Route terproteksi di server. Tidak ada secret hardcoded. Bisa deploy ke serverless.

### P0.1 — Infrastruktur Database (Postgres + Drizzle)
- **Tujuan bisnis:** Fondasi semua data; menghapus risiko kehilangan data & kebohongan "data tersimpan".
- **Prioritas:** `must`
- **Dependensi:** —
- **Kompleksitas:** `M`
- **Risiko:** 🟡 (migrasi dari skema `better-sqlite3` yang ada; pemilihan provider Neon/Supabase; connection pooling di serverless)

### P0.2 — Environment & Secrets Hygiene
- **Tujuan bisnis:** Keamanan dasar & kelayakan deploy; menghapus `NEXTAUTH_SECRET` hardcoded.
- **Prioritas:** `must`
- **Dependensi:** —
- **Kompleksitas:** `XS`
- **Risiko:** 🟢 (tambah `.env.example`, set `NEXTAUTH_URL/SECRET`, rotasi secret)

### P0.3 — Autentikasi Nyata (registrasi + hashing)
- **Tujuan bisnis:** Akun pengguna asli = syarat mutlak produk; aktifkan funnel akuisisi.
- **Prioritas:** `must`
- **Dependensi:** P0.1, P0.2
- **Kompleksitas:** `M`
- **Risiko:** 🟡 (registrasi DB, `bcrypt` yang sudah terpasang, validasi server, edge-case email unik; saat ini registrasi 100% palsu)

### P0.4 — Proteksi Route Server-Side (`middleware`)
- **Tujuan bisnis:** Mencegah akses tak sah ke area produk; integritas data per user.
- **Prioritas:** `must`
- **Dependensi:** P0.3
- **Kompleksitas:** `S`
- **Risiko:** 🟢 (guard saat ini hanya client; `/assessment/*` tanpa guard)

### P0.5 — Persistensi Assessment ke DB (server-side run)
- **Tujuan bisnis:** Laporan jadi aset permanen milik user; mengaktifkan riwayat & berbagi.
- **Prioritas:** `must`
- **Dependensi:** P0.1, P0.3
- **Kompleksitas:** `M`
- **Risiko:** 🟡 (pindahkan eksekusi dari client ke `POST /api/assessment` yang sudah ada tapi orphan; kaitkan `userId`; tambah validasi/rate-limit; hapus jalur `sessionStorage`)

### P0.6 — Dashboard & Riwayat dari DB
- **Tujuan bisnis:** Tampilkan nilai nyata (riwayat asli) → retensi & engagement.
- **Prioritas:** `must`
- **Dependensi:** P0.5
- **Kompleksitas:** `S`
- **Risiko:** 🟢 (ganti `lib/mock.ts`/seeding dengan fetch DB; statistik nyata)

### P0.7 — Shareable Report Links (publik aman)
- **Tujuan bisnis:** Loop viral/akuisisi organik; perbaiki fitur share yang kini rusak lintas device.
- **Prioritas:** `should`
- **Dependensi:** P0.5
- **Kompleksitas:** `S`
- **Risiko:** 🟡 (token/slug publik vs privasi; kontrol akses)

### P0.8 — Error/Loading/Not-Found Boundaries
- **Tujuan bisnis:** Pengalaman tepercaya & profesional saat gagal/loading.
- **Prioritas:** `should`
- **Dependensi:** —
- **Kompleksitas:** `XS`
- **Risiko:** 🟢 (`error.tsx`, `loading.tsx`, `not-found.tsx`)

### P0.9 — Integritas Klaim & Disclaimer Assessment
- **Tujuan bisnis:** Mitigasi risiko hukum/kepercayaan; engine saat ini PRNG, bukan AI/psikometri.
- **Prioritas:** `must`
- **Dependensi:** —
- **Kompleksitas:** `S`
- **Risiko:** 🔴 (klaim "akurasi/AI" vs realita; perlu disclaimer jelas atau perbaikan metode — lihat P1.6)

**Risiko level fase P0:** 🔴 terbesar di **P0.9** (kredibilitas/legal) & **P0.1/0.5** (arsitektur data). Salah arsitektur DB di awal mahal untuk diperbaiki.

---

# 🟧 P1 — Commercial Launch

**Tema:** Monetisasi & kelengkapan nilai. Setelah data/akun nyata (P0), buka
pembayaran, fitur premium yang dijanjikan, dan kepatuhan dasar.

**Exit criteria P1:**
- User bisa membayar → mendapat akses premium (PDF, action plan 30 hari) yang di-gate di server.
- Halaman legal ada; i18n dasar aktif; klaim akurat.

### P1.1 — Integrasi Payment Gateway + Webhook
- **Tujuan bisnis:** Sumber pendapatan utama; aktifkan tier Personal/Professional.
- **Prioritas:** `must`
- **Dependensi:** P0.1, P0.3
- **Kompleksitas:** `L`
- **Risiko:** 🔴 (Midtrans/Xendit/Stripe; webhook idempotent; rekonsiliasi; keamanan; saat ini tombol "Bayar" no-op)

### P1.2 — Model Order/Invoice + Entitlement Premium (server-side)
- **Tujuan bisnis:** Mengubah pembayaran jadi hak akses yang ditegakkan; cegah bypass.
- **Prioritas:** `must`
- **Dependensi:** P1.1
- **Kompleksitas:** `M`
- **Risiko:** 🟡 (gating premium saat ini hanya blur CSS; perlu cek server)

### P1.3 — Generator PDF Laporan (20+ halaman)
- **Tujuan bisnis:** Deliverable berbayar utama (dijanjikan di pricing).
- **Prioritas:** `must`
- **Dependensi:** P0.5, P1.2
- **Kompleksitas:** `L`
- **Risiko:** 🟡 (rendering PDF di serverless—react-pdf vs headless Chromium; biaya/timeout; konsistensi brand)

### P1.4 — Action Plan 30 Hari (fitur nyata)
- **Tujuan bisnis:** Pendorong nilai & retensi (justifikasi tier Professional).
- **Prioritas:** `should`
- **Dependensi:** P0.5, P1.2
- **Kompleksitas:** `M`
- **Risiko:** 🟡 (tracking progress, unlock harian, penyimpanan state; kini hanya 3 hari + blur)

### P1.5 — Halaman Profil & Pengaturan + Billing
- **Tujuan bisnis:** Manajemen akun & langganan; menurunkan beban support.
- **Prioritas:** `should`
- **Dependensi:** P0.3, P1.2
- **Kompleksitas:** `M`
- **Risiko:** 🟢 (nav sudah ada placeholder; perlu halaman nyata)

### P1.6 — Kredibilitas Metode Assessment
- **Tujuan bisnis:** Daya jual & kepercayaan jangka panjang; bedakan dari "hiburan".
- **Prioritas:** `should`
- **Dependensi:** P0.9
- **Kompleksitas:** `L`–`XL`
- **Risiko:** 🔴 (pilihan strategis: instrumen psikometri tervalidasi **atau** integrasi LLM yang jujur menggantikan PRNG; berdampak ke seluruh value proposition)

### P1.7 — Legal & Compliance Dasar
- **Tujuan bisnis:** Syarat komersial; perlindungan hukum (UU PDP/consumer).
- **Prioritas:** `must`
- **Dependensi:** —
- **Kompleksitas:** `S`
- **Risiko:** 🟡 (Privasi, S&K, Keamanan Data, consent; link kini `#`)

### P1.8 — Email Transaksional & Notifikasi
- **Tujuan bisnis:** Verifikasi, kuitansi, reset password, retensi.
- **Prioritas:** `should`
- **Dependensi:** P0.3, P1.1
- **Kompleksitas:** `M`
- **Risiko:** 🟢 (Resend/SES; deliverability)

### P1.9 — i18n Dasar (ID/EN)
- **Tujuan bisnis:** Jangkauan "Global" yang diklaim; pasar awal ID+EN.
- **Prioritas:** `should`
- **Dependensi:** —
- **Kompleksitas:** `M`
- **Risiko:** 🟡 (next-intl; refactor copy hardcoded; konten laporan multibahasa)

### P1.10 — Analytics, Telemetry & Rate Limiting
- **Tujuan bisnis:** Optimasi funnel konversi; proteksi abuse pada endpoint berbayar.
- **Prioritas:** `should`
- **Dependensi:** P0.5, P1.1
- **Kompleksitas:** `S`
- **Risiko:** 🟢 (PostHog/GA + rate limit API)

**Risiko level fase P1:** 🔴 pada **P1.1** (uang/keamanan) & **P1.6** (validitas produk). P1.3 berisiko teknis (PDF di serverless).

---

# 🟦 P2 — Enterprise

**Tema:** Multi-user, organisasi, integrasi, dan skala. Hanya bermakna setelah
produk individu (P0+P1) terbukti.

**Exit criteria P2:**
- Tim/organisasi bisa onboard, mengelola anggota, melihat analytics tim, integrasi via API, dan white-label.

### P2.1 — Model Multi-Tenant / Teams + RBAC
- **Tujuan bisnis:** Membuka segmen B2B bernilai tinggi (tier Enterprise).
- **Prioritas:** `must`
- **Dependensi:** P0.1, P0.3, P1.2
- **Kompleksitas:** `XL`
- **Risiko:** 🔴 (perubahan model data fundamental: org/team/member/role; isolasi data antar-tenant)

### P2.2 — Assessment Tim (undangan & manajemen anggota)
- **Tujuan bisnis:** Use-case inti enterprise (assessment tim tak terbatas).
- **Prioritas:** `must`
- **Dependensi:** P2.1
- **Kompleksitas:** `L`
- **Risiko:** 🟡 (alur undangan, kuota, status)

### P2.3 — Dashboard Analytics Tim
- **Tujuan bisnis:** Nilai jual utama enterprise; insight agregat SDM.
- **Prioritas:** `should`
- **Dependensi:** P2.2
- **Kompleksitas:** `L`
- **Risiko:** 🟡 (agregasi, privasi individu vs visibilitas manajer)

### P2.4 — Public API + API Keys
- **Tujuan bisnis:** Integrasi sistem klien (HRIS) = retensi & ekspansi.
- **Prioritas:** `should`
- **Dependensi:** P0.5, P2.1
- **Kompleksitas:** `L`
- **Risiko:** 🟡 (versioning, auth API key, rate limit, dokumentasi, kontrak stabil)

### P2.5 — SSO / OAuth Enterprise
- **Tujuan bisnis:** Syarat pengadaan enterprise; keamanan & kemudahan onboarding.
- **Prioritas:** `should`
- **Dependensi:** P0.3, P2.1
- **Kompleksitas:** `M`–`L`
- **Risiko:** 🟡 (SAML/OIDC, Google Workspace; kompleksitas IdP)

### P2.6 — White-Label / Custom Branding
- **Tujuan bisnis:** Penawaran premium enterprise (diklaim di pricing).
- **Prioritas:** `nice`
- **Dependensi:** P2.1, P1.3
- **Kompleksitas:** `L`
- **Risiko:** 🟡 (tema dinamis, domain kustom, branding di PDF)

### P2.7 — Admin Panel & Operasi
- **Tujuan bisnis:** Operasional internal (support, moderasi, refund, observability).
- **Prioritas:** `should`
- **Dependensi:** P0.1, P1.1
- **Kompleksitas:** `L`
- **Risiko:** 🟢 (build internal; akses berhak)

### P2.8 — Hardening Skala (test, CI/CD, monitoring, a11y penuh)
- **Tujuan bisnis:** Keandalan pada volume enterprise & SLA.
- **Prioritas:** `must` (untuk skala)
- **Dependensi:** lintas-fase
- **Kompleksitas:** `L` (berkelanjutan)
- **Risiko:** 🟡 (utang teknis terkumpul: belum ada test/CI; `userScalable=false` a11y)

**Risiko level fase P2:** 🔴 pada **P2.1** (multi-tenancy mengubah fondasi data — idealnya dipertimbangkan sejak desain P0.1 agar tidak refactor besar).

---

## Peta Dependensi (ringkas)

```
P0.1 DB ─┬─ P0.3 Auth ─┬─ P0.4 Middleware
         │             ├─ P0.5 Persist Assessment ─┬─ P0.6 Dashboard DB
         │             │                            ├─ P0.7 Share Links
         │             │                            └─ P1.3 PDF / P1.4 Action Plan
         │             └─ P1.1 Payment ─ P1.2 Entitlement ─ P1.3/P1.4/P1.5
P0.2 Env ┘
P0.9 Disclaimer ── P1.6 Metode Assessment

P2.1 Multi-tenant (butuh P0.1+P0.3+P1.2) ─ P2.2 ─ P2.3
                                          └─ P2.4 API / P2.5 SSO / P2.6 White-label
```

> **Catatan arsitektur penting:** keputusan **P0.1 (skema DB)** sebaiknya sudah
> mengantisipasi **P2.1 (multi-tenant)** — menambah konsep `organization/team`
> belakangan jauh lebih mahal. Pertimbangkan kolom/relasi tenant sejak awal
> meski belum diaktifkan.

---

## Urutan Eksekusi yang Disarankan

1. **P0.2 → P0.1 → P0.3 → P0.4** (fondasi aman: env, DB, auth, guard)
2. **P0.5 → P0.6 → P0.8 → P0.9** (data nyata + UX andal + disclaimer) → **rilis MVP**
3. **P0.7** (share) bila ingin growth organik lebih awal
4. **P1.7 → P1.1 → P1.2 → P1.3 → P1.4** (legal lalu monetisasi & deliverable) → **rilis komersial**
5. **P1.5 / P1.8 / P1.9 / P1.10** (kelengkapan & optimasi)
6. **P1.6** (metode assessment) — paralel, strategis, mulai riset lebih awal
7. **P2.x** setelah product-market fit individu terkonfirmasi

---

## Ringkasan Matriks

| ID | Fitur | Fase | Prioritas | Kompleksitas | Risiko |
|----|-------|------|-----------|--------------|--------|
| P0.1 | Database (Postgres+Drizzle) | P0 | must | M | 🟡 |
| P0.2 | Env & Secrets | P0 | must | XS | 🟢 |
| P0.3 | Auth nyata | P0 | must | M | 🟡 |
| P0.4 | Middleware proteksi route | P0 | must | S | 🟢 |
| P0.5 | Persistensi assessment | P0 | must | M | 🟡 |
| P0.6 | Dashboard dari DB | P0 | must | S | 🟢 |
| P0.7 | Shareable report links | P0 | should | S | 🟡 |
| P0.8 | Error/Loading boundaries | P0 | should | XS | 🟢 |
| P0.9 | Integritas klaim/disclaimer | P0 | must | S | 🔴 |
| P1.1 | Payment gateway + webhook | P1 | must | L | 🔴 |
| P1.2 | Order/entitlement premium | P1 | must | M | 🟡 |
| P1.3 | Generator PDF | P1 | must | L | 🟡 |
| P1.4 | Action plan 30 hari | P1 | should | M | 🟡 |
| P1.5 | Profil/Pengaturan/Billing | P1 | should | M | 🟢 |
| P1.6 | Kredibilitas metode | P1 | should | L–XL | 🔴 |
| P1.7 | Legal & compliance | P1 | must | S | 🟡 |
| P1.8 | Email transaksional | P1 | should | M | 🟢 |
| P1.9 | i18n (ID/EN) | P1 | should | M | 🟡 |
| P1.10 | Analytics & rate limit | P1 | should | S | 🟢 |
| P2.1 | Multi-tenant + RBAC | P2 | must | XL | 🔴 |
| P2.2 | Assessment tim | P2 | must | L | 🟡 |
| P2.3 | Analytics tim | P2 | should | L | 🟡 |
| P2.4 | Public API | P2 | should | L | 🟡 |
| P2.5 | SSO/OAuth | P2 | should | M–L | 🟡 |
| P2.6 | White-label | P2 | nice | L | 🟡 |
| P2.7 | Admin panel | P2 | should | L | 🟢 |
| P2.8 | Hardening skala | P2 | must | L | 🟡 |

---

## Asumsi & Catatan

- Tidak ada **PRD formal** di repo; prioritas diturunkan dari visi produk, klaim
  landing, dan tier harga (lihat `SAINTARA_SYSTEM_MAP.md` §12).
- Estimasi kompleksitas mengasumsikan 1 engineer full-stack berpengalaman dan
  **dapat berubah** dengan keputusan vendor (DB, payment, PDF, i18n).
- Risiko 🔴 pada **klaim/metode assessment (P0.9/P1.6)** dan **payment (P1.1)**
  adalah yang paling menentukan keberhasilan komersial—prioritaskan mitigasinya.
