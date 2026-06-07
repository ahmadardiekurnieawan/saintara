# SAINTARA — MASTER PRD (Lengkap)

> **Single Source of Truth** untuk seluruh pengembangan SAINTARA.
>
> **Hierarki acuan:**
> 1. **UTAMA — PRD Dasar:** `SAINTARA_SYSTEM_MAP.md` + `SAINTARA_ROADMAP_IMPLEMENTATION.md` (tulang punggung).
> 2. **PENUNJANG — Konsep Produk:** `Konsep_Website_Saintara_1.docx` (diambil seperlunya untuk visi/konten/monetisasi).

| | |
|---|---|
| **Versi** | 2.0 (lengkap) |
| **Tanggal** | 2026-06-07 |
| **Branch** | `claude/confident-archimedes-lkBkx` |
| **Status produk** | FE prototype matang di atas mock data; backend belum ada |
| **Mata uang** | **Indonesia → IDR (Rupiah)** · **Internasional → USD** (lihat §13) |
| **Aturan konflik** | Teknis → System Map · Rencana → Roadmap · Visi/konten → Konsep (seperlunya) |

---

## Daftar Isi
1. Ringkasan Eksekutif
2. Goals & Non-Goals
3. Kondisi Saat Ini (ringkas System Map)
4. Visi Produk & Prinsip
5. Persona & Segmen (+ user stories)
6. Model Karakter: 9 Tipe · 6 Kerangka · 35+ Atribut
7. Information Architecture & Routing
8. Assessment Flow (manual & massal) + Functional Requirements
9. Deliverables: PDF, Sertifikat, Konsultasi
10. Dashboard per Peran + Functional Requirements
11. Monetisasi & Model Token/Kredit
12. **Lokalisasi & Harga (Multi-Currency: IDR & USD)**
13. Arsitektur & Requirement Teknis
14. Data Model
15. Permukaan API (high-level)
16. Roadmap Tergabung (P0/P1/P2)
17. Non-Functional Requirements
18. Analytics & KPI
19. Risiko & Open Questions
20. Definition of Done per Fase
21. Glosarium & Lampiran

---

## 1. Ringkasan Eksekutif

SAINTARA = *Sistem Analisis Intelegensi Tabiat dan Karakter Alami* — platform
yang mengungkap **karakter & potensi alami** seseorang secara cepat (<5 menit)
dari **data minimal**, hasil **deterministik** dan **berorientasi tindakan**,
melayani **5 segmen**: Personal, Organisasi/Instansi, Sekolah, Social Gift, dan
Kemitraan/Agen.

Saat ini produk adalah **prototipe front-end matang di atas mock data**. Fokus
pengembangan: **membangun fondasi nyata** (DB, auth, persistensi, payment, PDF,
engine) sesuai roadmap, lalu **menyelaraskan** ke arah konsep (multi-segmen,
9 tipe, monetisasi token) secara bertahap.

**Strategi rilis:** fondasi dulu → MVP Personal (P0) → komersial Personal +
Social Gift (P1) → Enterprise Org/Sekolah/Agen (P2). Fitur konsep besar
**tidak menahan** rilis MVP.

---

## 2. Goals & Non-Goals

**Goals**
- Produk nyata yang dapat dipakai end-to-end (daftar → tes → laporan permanen → bayar).
- Monetisasi terpadu berbasis **token/kuota** lintas segmen.
- Laporan bernilai (PDF per tier + sertifikat) dan dashboard per peran.
- Harga terlokalisasi: **IDR untuk Indonesia, USD untuk internasional**.
- Arsitektur siap multi-tenant (enterprise) sejak desain.

**Non-Goals (fase ini)**
- Membuat/menyempurnakan **rumus algoritma final** (disiapkan terpisah; sistem hanya menyediakan adapter pluggable).
- Mobile app native (PWA cukup untuk sekarang).
- Marketplace pihak ketiga.

---

## 3. Kondisi Saat Ini (ringkas — detail di System Map)

**Sudah ada (FE matang):** design system (Inter, tokens, ink/putih/emas), UI
primitives, charts + MiniRadar, landing page, auth UI, alur assessment manual,
dashboard, shell navigasi, PWA/SEO.

**Masih mock / belum ada:** auth (1 user demo, registrasi palsu, secret
hardcoded), persistensi (`sessionStorage`; DB Drizzle tak dipakai &
`better-sqlite3` tak serverless-ready), payment, PDF, i18n, engine final
(PRNG placeholder), `POST /api/assessment` orphan, proteksi route client-side.

**Technical debt prioritas:** DB, secret, persistensi, middleware, test/CI,
klaim vs realita engine. (Lengkap → System Map §11.)

---

## 4. Visi Produk & Prinsip

**Definisi:** menemukan karakter alami ("DNA karakter") yang **elastis** (bisa
tumbuh/bergeser), **bukan vonis mutlak**. Cepat, dari data minimal, **tanpa
kuesioner panjang**, hasil **tidak berubah-ubah**, **tidak menghakimi**,
**berorientasi tindakan** (untuk diri, pasangan, tim, guru-murid).

**Prinsip wajib:**
- Bahasa inklusif lintas usia/gender/status; menghormati esensi ketuhanan.
- Hasil sebagai **cermin & titik awal pertumbuhan**, dengan disclaimer jelas.
- Slogan: *"Selamat bertemu jati diri Anda yang lebih baik."*

**Brand:** Putih (kesederhanaan) · Emas (kemewahan) · Biru (kepercayaan) ·
Hitam (keteguhan); sans-serif modern (Inter/Poppins). Redesign FE saat ini
sudah selaras (ink/putih/emas); **biru** ditambahkan sebagai aksen (mis. segmen
Organisasi).

---

## 5. Persona & Segmen

| Segmen | Persona | Kebutuhan | Cara tes | Akun |
|--------|---------|-----------|----------|------|
| **Personal** | Individu | Kenali diri, karier, relasi | Form manual | personal |
| **Organisasi** | Admin HR/manajer | Rekrutmen, penempatan, chemistry tim | Massal (Excel) | org_admin |
| **Sekolah** | Admin/Guru BK | Gaya belajar, jurusan, konseling | Massal (Excel) | school_admin |
| **Social Gift** | Donatur | Donasi/hadiah tes | Beli lisensi (QTY) | donor |
| **Kemitraan/Agen** | Reseller | Jual lisensi/token, komisi | Lisensi agen | agent |

**Contoh user stories:**
- *Personal:* "Sebagai individu, saya ingin mengikuti tes & mengunduh PDF laporan agar memahami potensi & arah karier saya."
- *Organisasi:* "Sebagai Admin HR, saya ingin mengunggah Excel berisi 50 kandidat & menerima laporan tim + rekomendasi penempatan agar rekrutmen tepat sasaran."
- *Sekolah:* "Sebagai Guru BK, saya ingin melihat gaya belajar & kecenderungan karir tiap siswa untuk konseling."
- *Donatur:* "Sebagai donatur, saya ingin membelikan paket tes untuk siswa kurang mampu & menerima laporan dampak."
- *Agen:* "Sebagai mitra, saya ingin membeli token grosir & menjual ulang dengan komisi."

---

## 6. Model Karakter — 9 Tipe · 6 Kerangka · 35+ Atribut

### 6.1 Sembilan Tipe (klasifikasi utama)
| # | Tipe | Unsur | Arah |
|---|------|-------|------|
| 1–2 | Pemikir Introvert / Extrovert | Thinking | I / E |
| 3–4 | Pengamat Introvert / Extrovert | Sensing | I / E |
| 5–6 | Perasa Introvert / Extrovert | Feeling | I / E |
| 7–8 | Pemimpi Introvert / Extrovert | Intuiting | I / E |
| 9 | Penggerak | (driver) | — |

> Build saat ini memakai 6 tipe lain → **diselaraskan bertahap (P1)**, tidak memblok MVP.

### 6.2 Enam Kerangka (±35 atribut laporan)
1. **Identitas Dasar** — Sistem Operasi Otak, Arah Ekspresi, Unsur Karakter (S/T/F/I), Warna Karakter & Makna, Kata Kunci.
2. **Fondasi Kehidupan** — Kemistri Alami, Peranan Ideal, Target & Kunci Sukses, Harapan Alami, Mental Alami, Kecenderungan Alami, Ketakutan Diri.
3. **Relasi Sosial** — Kecocokan Pasangan (ranking), Saran Rumah Tangga, Kecocokan Pertemanan, Coach & Mentor, Bahasa Cinta.
4. **Potensi Diri** — Kekuatan, Tantangan, Catatan Potensi & Ancaman, Apresiasi Diri, Sumber Kebahagiaan.
5. **Belajar & Berkembang** — Cara Belajar, Naikkan Minat Belajar, Sekolah→Karir, Rekomendasi Karir, Tips Bisnis, Nasehat Penting.
6. **Kehidupan Praktis** — Tabiat Uang, Cara Bekerja, Pengendalian Mood, Pemicu Emosi & Stres, Saran Olahraga.

### 6.3 Tier (jumlah atribut yang dibuka)
| Tier | Atribut | Untuk |
|------|---------|-------|
| Dasar | 10 | Pengenalan |
| Standar | 20 | Menengah |
| Premium | 35+ | Lengkap |

> Implikasi konten: matriks **[9 tipe] × [±35 atribut]** + aturan ranking relasi
> antar-tipe (pasangan/teman/mentor), **multibahasa**. Effort konten signifikan
> (CMS/seed terstruktur).

---

## 7. Information Architecture & Routing

**Navigasi (target):** Tentang · Produk (Personal/Organisasi/Sekolah/Social Gift)
· Pelatihan & Acara · Rahasia Karakter Alami (artikel) · Kemitraan · Akun Saya · Bahasa.

| Rute (target) | Fungsi | Status |
|---|---|---|
| `/` | Landing utama | ✅ (reorientasi ke 9 tipe) |
| `/produk/{personal,organisasi,sekolah,social-gift}` | LP + alur daftar per segmen | ❌ |
| `/tentang`, `/pelatihan`, `/artikel`, `/kemitraan` | Konten/SEO/mitra | ❌ |
| `/login`, `/register` | Auth (multi jenis akun) | ⚠️ mock |
| `/dashboard` | Profil, riwayat, unduh PDF | ⚠️ mock |
| `/tes/*` | Assessment manual & massal | ⚠️ manual mock |
| `/org`, `/sekolah` | Dashboard admin enterprise | ❌ |
| `/donatur`, `/agen` | Dashboard donatur & mitra | ❌ |
| `/admin` | Operasi internal | ❌ |
| `/api/*` | Endpoint (assessment, auth, payment webhook, dst) | ⚠️ minimal |

---

## 8. Assessment Flow + Functional Requirements

### 8.1 Input tes
| Field | Wajib | Catatan |
|-------|-------|---------|
| Nama Lengkap | ✅ | ada |
| Nama Panggilan | ➖ | belum ada |
| Tgl/Bln/Thn Lahir | ✅ | ada |
| **Jenis Kelamin (L/P)** | ✅ | **BELUM ada — tambah** |
| Golongan Darah | ➖ **opsional** | build menjadikannya wajib → ubah |

### 8.2 Mode Manual (Personal & Gift)
```
Daftar + pilih tier → verifikasi email → bayar (token)
 → form tes → engine (server) → simpan DB → hasil: dashboard + PDF + sertifikat
```
**FR:** validasi server; konsumsi 1 token tier; hasil deterministik; PDF sesuai tier.
**Acceptance:** user dapat membuka kembali laporan kapan saja & dari device lain.

### 8.3 Mode Massal (Organisasi & Sekolah) — P2
```
Admin beli kuota/token → unduh template Excel → isi → unggah
 → validasi & proses batch (async) → email hasil ke tiap peserta + dashboard tim
```
Template: No, Nama, Tgl lahir, Jenis Kelamin, Gol. Darah, Email (sekolah: +No Induk/Kelas).
Add-on (multi-ceklis): Laporan Umum · Lengkap & Penempatan/Karir · Pelatihan Online/Tatap Muka.
**FR:** validasi baris (error report), idempotensi batch, kuota cukup sebelum proses, retry.
**Acceptance:** 95% baris valid terproses; baris invalid dilaporkan; email terkirim.

---

## 9. Deliverables: PDF, Sertifikat, Konsultasi

- **PDF Laporan** — atribut sesuai tier (10/20/35+); branding tema; halaman akhir: opsi **Konsultasi**, **Tanda Tangan**, **Nama Panggung**.
- **Sertifikat** — per peserta (personal & tim/siswa).
- **Konsultasi** — CTA lanjutan (potensi monetisasi tambahan).
- **Email** — hasil massal dikirim ke peserta + pusat.

**FR:** generasi async; URL aman (signed); regenerasi bila konten diperbarui.

---

## 10. Dashboard per Peran + Functional Requirements

- **Personal:** profil, **riwayat tes**, unduh PDF/sertifikat, status tier/token.
- **Admin Organisasi:** kelola **kuota/token**, batch Excel + status, daftar peserta + hasil, **laporan tim** (profil, potensi/tantangan, gaya komunikasi/kepemimpinan, **rekomendasi penempatan**, **analisis chemistry**), manajemen anggota & peran (Admin/Manajer/Viewer).
- **Admin Sekolah:** gaya belajar, kecenderungan karir, data BK, kelola kelas/angkatan.
- **Donatur:** riwayat donasi, penerima, **laporan dampak**, transparansi.
- **Mitra/Agen:** lisensi, stok token, penjualan, **komisi**, materi.
- **Admin Internal:** konten (tipe×atribut), order/pembayaran, kuota, penyaluran gift, acara/pelatihan, audit, refund, observability.

---

## 11. Monetisasi & Model Token/Kredit

**Prinsip — SAINTARA Credit (Token):** semua aksi berbayar mengonsumsi **token**
= **hak 1 tes pada tier tertentu**. Menyatukan lisensi tier + kuota per-peserta +
donasi + reseller menjadi satu model.

- **1 Token = 1 hak tes** (terikat tier Dasar/Standar/Premium).
- Token: dipakai sendiri · dialokasikan ke peserta (org/sekolah) · **dihadiahkan** (gift) · **dijual ulang** (agen).
- **Entitlement server-side**: tier menentukan atribut PDF yang dibuka (tidak boleh bypass di client).

**Komponen wajib:** wallet/ledger token (idempotent), katalog produk & tier,
checkout + payment gateway + webhook (rekonsiliasi), konsumsi token atomic saat
tes, invoice/refund, komisi agen, laporan dampak donasi.

---

## 12. Lokalisasi & Harga (Multi-Currency: IDR & USD)

### 12.1 Aturan mata uang (KEPUTUSAN FINAL)
- **Pengguna di Indonesia → Rupiah (IDR).**
- **Pengguna internasional (di luar Indonesia) → US Dollar (USD).**
- **Penentuan region:** berdasarkan (urutan) pilihan eksplisit user → negara akun saat daftar (`country`) → deteksi IP/locale sebagai fallback. User dapat **mengganti** mata uang/region secara manual.
- **Penyimpanan:** harga disimpan **per mata uang** di `Product` (bukan dikonversi runtime), agar harga IDR adalah price-point lokal (bukan hasil FX mentah).
- **Tampilan:** format `Rp1.234.000` (IDR, tanpa desimal) / `$1,234.00` (USD).

### 12.2 Pajak & metode bayar per region
| Region | Mata uang | Pajak | Gateway & metode |
|--------|-----------|-------|------------------|
| Indonesia | IDR | PPN 11% (sesuai ketentuan) | Midtrans/Xendit — QRIS, Virtual Account, e-wallet, kartu |
| Internasional | USD | sesuai yurisdiksi | Stripe — kartu, dompet global |

### 12.3 Price Book (acuan — *calibratable* oleh bisnis)
> USD = acuan konsep. IDR = price-point lokal (asumsi ~Rp15.000–16.000/USD,
> dibulatkan ke harga psikologis). Angka final ditetapkan bisnis.

**Personal (lisensi per tes / token)**
| Tier | Atribut | USD | IDR |
|------|---------|-----|-----|
| Dasar | 10 | $10 | Rp149.000 |
| Standar | 20 | $25 | Rp349.000 |
| Premium | 35+ | $30 | Rp419.000 |

**Organisasi / Instansi**
| Item | USD | IDR |
|------|-----|-----|
| Akun Admin — tes berulang | $2.500 | Rp39.500.000 |
| Akun Admin — sekali tes | $1.500 | Rp23.500.000 |
| Kuota tes (token) / peserta | $25 | Rp375.000 |

**Sekolah**
| Item | USD | IDR |
|------|-----|-----|
| Akun Admin — tes berulang | $2.500 | Rp39.500.000 |
| Akun Admin — sekali tes | $1.500 | Rp23.500.000 |
| Kuota tes (token) / peserta | $15 | Rp225.000 |

**Social Gift (lisensi/QTY donasi)** — mengikuti tier Personal (Dasar/Standar/Premium) × QTY.

**Kemitraan/Agen** — harga grosir + komisi/margin (struktur TBD oleh bisnis).

> ⚠️ Harga build saat ini (Rp99.000/Rp199.000) **digantikan** oleh price book ini.

### 12.4 i18n konten
Bahasa UI & laporan: **ID & EN** dahulu (P1), arsitektur siap bahasa lain
(Mandarin/Arab) sesuai klaim konsep. Locale memengaruhi: bahasa, mata uang,
format tanggal/angka, metode bayar.

---

## 13. Arsitektur & Requirement Teknis

**Stack dipertahankan:** Next.js 14 (App Router) · React 18 · TS strict ·
Tailwind · NextAuth · Recharts · next-pwa · **Drizzle ORM**.

**Fondasi yang dibangun:**
- **DB → Postgres** (Neon/Supabase); sertakan `orgId`/tenant sejak awal.
- **Auth nyata** (registrasi DB, bcrypt, verifikasi email, reset) + **middleware**/RBAC multi-peran.
- **Engine adapter** — `runAssessment(input) → {typeCode, attributes}` membungkus rumus resmi, **server-side**, deterministik, `engineVersion`.
- **Content store** — matriks tipe×atribut + ranking relasi, multibahasa.
- **Monetisasi** — token ledger + katalog + checkout + gateway (Midtrans/Xendit + Stripe) + webhook + entitlement.
- **PDF service** (per tier) + **sertifikat**; **email** transaksional (Resend/SES).
- **Bulk engine** — template Excel, validasi, ingest, antrian, distribusi email.
- **i18n** (next-intl); **observability** (analytics, logging, rate limit, error boundaries, test/CI).

---

## 14. Data Model (entitas inti)

```
User(id, role[personal|org_admin|school_admin|donor|agent|internal],
     name, nickname?, email(unique), phone?, country, city?, gender,
     passwordHash, emailVerifiedAt?, locale, currency[IDR|USD], createdAt)

Organization(id, type[company|school], name, ownerUserId, createdAt)
OrgMember(id, orgId, userId, role[admin|manager|viewer])

CreditWallet(id, ownerType[user|org], ownerId, balanceByTier{dasar,standar,premium})
CreditTxn(id, walletId, delta, tier, reason[purchase|consume|gift|refund|agent_sale], refId, createdAt)

Product(id, segment, tier, currency, priceAmount, taxRate, attributesUnlocked)
Order(id, buyerUserId, items[], currency, amount, tax, status, gatewayRef, createdAt)
Payment(id, orderId, gateway[midtrans|xendit|stripe], status, payload, createdAt)

TestSubject(id, name, gender, birthDate, bloodType?, email?, externalRef?)
Assessment(id, subjectId, requestedByUserId, orgId?, tier, typeCode(1..9),
           attributes(jsonb), engineVersion, status, createdAt)
Report(id, assessmentId, pdfUrl, certificateUrl, locale, createdAt)

Batch(id, orgId, fileRef, total, processed, status, createdAt)
GiftDonation(id, donorUserId, tier, qty, recipientType[named|managed], status)
AgentLicense(id, agentUserId, wholesaleTerms, createdAt)
AgentSale(id, agentId, buyerRef, tier, qty, commission, currency, createdAt)
Article(id, slug, segment, locale, body, publishedAt)
Event(id, type[free|private], title, schedule, docsRef)
```

---

## 15. Permukaan API (high-level)

| Endpoint | Fungsi |
|----------|--------|
| `POST /api/auth/*` | NextAuth (login/session) |
| `POST /api/register` | Buat akun (per role) + verifikasi email |
| `POST /api/assessment` | Jalankan engine (server) → simpan (konsumsi token) |
| `GET /api/assessment/:id` | Ambil hasil (berhak) |
| `GET /api/report/:id/pdf` | Unduh PDF (signed, sesuai tier) |
| `GET /api/pricing?region=` | Price book sesuai mata uang region |
| `POST /api/checkout` | Buat order (IDR→Midtrans/Xendit, USD→Stripe) |
| `POST /api/webhooks/{midtrans,xendit,stripe}` | Konfirmasi bayar (idempotent) → top-up token |
| `POST /api/org/batch` | Unggah Excel peserta (massal) |
| `GET /api/org/:id/dashboard` | Data laporan tim |
| `POST /api/gift` | Donasi lisensi |
| `POST /api/agent/sale` | Penjualan agen + komisi |

---

## 16. Roadmap Tergabung (P0/P1/P2)

> Tulang punggung = roadmap dasar. **(K)** = tambahan dari Konsep, ditempatkan di
> fase yang tepat. Format: `prioritas · kompleksitas · risiko`.

### 🟥 P0 — MVP Launch (Personal, fondasi nyata)
- P0.1 DB Postgres + Drizzle · must · M · 🟡
- P0.2 Env & secrets hygiene · must · XS · 🟢
- P0.3 Auth nyata + verifikasi email · must · M · 🟡
- P0.4 Middleware/RBAC dasar · must · S · 🟢
- P0.5 Persistensi assessment ke DB · must · M · 🟡
- P0.6 Dashboard & riwayat dari DB · must · S · 🟢
- P0.7 Error/loading/not-found · should · XS · 🟢
- P0.8 Disclaimer & integritas klaim · must · S · 🔴
- **(K)** P0.9 Form tes sesuai konsep (jenis kelamin; gol darah opsional) · should · S · 🟢
- **(K)** P0.10 Engine adapter (pluggable) · should · M · 🟡

### 🟧 P1 — Commercial Launch (Personal + Social Gift)
- **(K)** P1.1 Token/credit ledger + katalog tier · must · L · 🟡
- **(K)** P1.2 **Lokalisasi harga & mata uang (IDR/USD)** + price book · must · M · 🟡
- P1.3 Payment gateway (Midtrans/Xendit + Stripe) + webhook · must · L · 🔴
- P1.4 Entitlement tier server-side (10/20/35) · must · M · 🟡
- P1.5 Generator PDF per tier · must · L · 🟡
- **(K)** P1.6 Sertifikat · should · M · 🟢
- P1.7 Email transaksional · must · M · 🟢
- P1.8 Profil/Pengaturan/Billing · should · M · 🟢
- P1.9 Legal & privasi (UU PDP) · must · S · 🟡
- P1.10 i18n ID/EN · should · M · 🟡
- P1.11 Analytics & rate limiting · should · S · 🟢
- **(K)** P1.12 Integrasi rumus resmi / kredibilitas metode · should · L–XL · 🔴
- **(K)** P1.13 Social Gift (donasi + penyaluran + dampak) · should · L · 🟡
- **(K)** P1.14 Konten 9 tipe + 35 atribut (bertahap) · should · L · 🟡

### 🟦 P2 — Enterprise (Organisasi, Sekolah, Mitra)
- **(K)** P2.0 Landing & alur per-segmen (Org/Sekolah) · must · M · 🟢
- P2.1 Multi-tenant (Organization/Member) + RBAC penuh · must · XL · 🔴
- **(K)** P2.2 Tes massal via Excel · must · L · 🟡
- P2.3 Dashboard analytics tim (penempatan, chemistry) · must · L · 🟡
- **(K)** P2.4 Kuota/token org & sekolah + add-on pelatihan · must · M · 🟡
- **(K)** P2.5 Dashboard Sekolah (gaya belajar, jurusan, BK) · should · L · 🟡
- **(K)** P2.6 Kemitraan/Agen (lisensi, stok, komisi, payout) · should · L · 🟡
- P2.7 SSO/OAuth enterprise · should · M–L · 🟡
- P2.8 White-label (branding PDF/dashboard, domain) · nice · L · 🟡
- **(K)** P2.9 Pelatihan & Acara + Artikel "Rahasia Karakter Alami" · should · M · 🟢
- P2.10 Admin panel internal + observability · must · L · 🟢
- P2.11 Hardening (test, CI/CD, a11y WCAG AA, skala) · must · L · 🟡

---

## 17. Non-Functional Requirements

- **Keamanan:** bcrypt, proteksi route server-side, webhook idempotent, engine server-only (proteksi IP), rate limiting, manajemen secret (hapus fallback hardcoded).
- **Privasi/Compliance:** UU PDP — consent, hak hapus, retensi; data massal/minor (sekolah) butuh persetujuan wali; transparansi donasi.
- **Performa:** hasil <5 menit; batch/PDF/email **asinkron** (antrian).
- **Skalabilitas:** multi-tenant sejak desain; antrian; index DB.
- **Aksesibilitas:** WCAG AA; perbaiki `userScalable=false`.
- **Keandalan:** test (unit+e2e), CI/CD, monitoring, error boundaries, audit log.
- **Lokalisasi:** mata uang & bahasa konsisten lintas UI, PDF, email, invoice.

---

## 18. Analytics & KPI

- **Aktivasi:** daftar → tes pertama (%).
- **Monetisasi:** konversi berbayar, ARPU, distribusi tier, **GMV per mata uang (IDR vs USD)**.
- **Token economy:** terjual vs terkonsumsi, saldo mengendap.
- **Enterprise:** org/sekolah aktif, peserta/batch, retensi tes berulang.
- **Social Gift:** donasi tersalurkan, laporan dampak terkirim.
- **Agen:** mitra aktif, penjualan, komisi.
- **Kualitas:** NPS/CSAT, unduh PDF/sertifikat, refund rate.
- **Konten/SEO:** trafik artikel → daftar.

---

## 19. Risiko & Open Questions

**Risiko 🔴**
1. **Rumus/engine final belum ada** ("disiapkan terpisah") — blocker hasil bermakna; pakai adapter + tandai placeholder hingga siap.
2. **Klaim akurasi** — wajib disclaimer "elastis, bukan vonis".
3. **Payment + token ledger multi-currency** — uang nyata; idempotensi & rekonsiliasi ketat; dua gateway (lokal + global).
4. **Konten besar** (9×35 + relasi, multibahasa) — effort non-coding signifikan.
5. **Data minor (sekolah)** — kepatuhan privasi anak.

**Resolved ✅**
- **Mata uang:** Indonesia → IDR; internasional → USD (§12).

**Open questions ❓**
- Angka **IDR final** (price book §12.3 masih *calibratable*).
- Pemetaan tepat input → 9 tipe → 35 atribut (rumus).
- Skema komisi agen & harga grosir.
- Model pelatihan/acara (gratis vs berbayar).
- Visibilitas atribut individu ke manajer (privasi tim).

---

## 20. Definition of Done per Fase

**P0 (MVP) selesai bila:** user registrasi (DB) → verifikasi email → login →
tes (form lengkap: + jenis kelamin) → hasil **tersimpan permanen** & dibuka lagi
lintas device; route terproteksi server; tanpa secret hardcoded; deploy serverless.

**P1 (Commercial) selesai bila:** user **membayar** (IDR via Midtrans/Xendit atau
USD via Stripe) → token bertambah → tes mengonsumsi token → **PDF per tier +
sertifikat** terunduh; harga tampil sesuai region; legal & i18n ID/EN aktif;
Social Gift berfungsi.

**P2 (Enterprise) selesai bila:** Org/Sekolah dapat **unggah Excel** → batch
terproses → email hasil + **dashboard tim** (penempatan/chemistry); kuota/token
terkelola; **agen** dapat menjual & menerima komisi; admin internal & hardening siap.

---

## 21. Glosarium & Lampiran

**Glosarium:** *Tabiat & Karakter Alami* (karakter bawaan elastis) · *9 Tipe* ·
*6 Kerangka / 35 atribut* · *Tier* (Dasar 10/Standar 20/Premium 35+) ·
*Token/Kredit* (hak 1 tes per tier) · *Massal/Batch* (tes via Excel) ·
*Social Gift* (donasi tes) · *Mitra/Agen* (reseller) · *Engine/Rumus* (algoritma
pemetaan, terpisah & pluggable).

**Lampiran — Precedence & dokumen terkait:**
1. **UTAMA:** `SAINTARA_SYSTEM_MAP.md`, `SAINTARA_ROADMAP_IMPLEMENTATION.md`.
2. **PENUNJANG:** `Konsep_Website_Saintara_1.docx` (visi/konten — seperlunya).

> Konflik: teknis → System Map · rencana → Roadmap · visi/konten → Konsep
> (sebatas dibutuhkan). **PRD dasar adalah poros utama**; PRD ini menyelaraskan
> ketiganya dan menetapkan **mata uang: IDR (Indonesia) & USD (internasional)**.
