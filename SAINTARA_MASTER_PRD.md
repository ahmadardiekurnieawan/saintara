# SAINTARA — MASTER PRD

> **Single Source of Truth** untuk seluruh pengembangan SAINTARA.
>
> **Hierarki acuan (penting):**
> 1. **UTAMA — PRD Dasar:** `SAINTARA_SYSTEM_MAP.md` (kondisi & arsitektur nyata)
>    + `SAINTARA_ROADMAP_IMPLEMENTATION.md` (rencana P0/P1/P2). Inilah tulang
>    punggung dokumen ini.
> 2. **PENUNJANG — Konsep Produk:** `Konsep_Website_Saintara_1.docx`. Dipakai
>    **seperlunya** untuk mengarahkan visi/konten/monetisasi — **bukan** untuk
>    merombak total rencana teknis yang sudah ada.

| | |
|---|---|
| **Versi** | 1.1 |
| **Tanggal** | 2026-06-07 |
| **Branch** | `claude/confident-archimedes-lkBkx` |
| **Status produk** | FE prototype matang di atas mock data; backend belum ada |
| **Aturan konflik** | Teknis → ikuti System Map. Rencana → ikuti Roadmap. Visi/konten → ambil dari Konsep seperlunya. |

---

## Daftar Isi
1. Ringkasan Eksekutif
2. Kondisi Saat Ini (ringkas dari System Map)
3. Visi Produk (intisari dari Konsep — seperlunya)
4. Arsitektur & Requirement Teknis
5. Assessment Flow
6. Dashboard Flow
7. **Monetisasi & Model Token/Kredit**
8. Roadmap Tergabung (P0/P1/P2)
9. Data Model
10. Non-Functional Requirements
11. Penyelarasan dengan Konsep (delta yang diambil)
12. Risiko & Open Questions
13. KPI & Glosarium

---

## 1. Ringkasan Eksekutif

SAINTARA saat ini adalah **prototipe front-end berkualitas produksi yang
berjalan di atas mock data**. Lapisan UI/UX & design system sudah matang;
**fondasi backend (DB, auth nyata, payment, PDF, persistensi, engine final)
belum dibangun.**

Dokumen ini memprioritaskan **menyelesaikan fondasi** sesuai roadmap (P0→P2),
sambil **menyelaraskan arah produk** dengan dokumen Konsep pada titik-titik yang
benar-benar dibutuhkan: **multi-segmen, monetisasi berbasis token/kuota, model
karakter, dan deliverable (PDF/sertifikat)**.

Prinsip kerja: **bangun fondasi dulu (PRD dasar), masukkan elemen konsep secara
bertahap sesuai fase** — jangan menunda rilis demi fitur konsep yang besar.

---

## 2. Kondisi Saat Ini (ringkas — detail di System Map)

**Sudah ada (FE matang):** design system (Inter, tokens), UI primitives
(Button/Card/Input/Modal/Badge/Reveal), charts + MiniRadar, landing page,
auth UI, alur assessment manual (form→confirm→processing→result), dashboard,
shell navigasi, PWA/SEO.

**Masih mock / belum ada:**
- Auth = 1 user demo; registrasi palsu; secret hardcoded.
- Persistensi = `sessionStorage` (DB Drizzle ada tapi **tak dipakai**; `better-sqlite3` tak layak serverless).
- Payment, PDF, action plan nyata, i18n = **belum ada**.
- Engine = **PRNG placeholder** (bukan rumus final).
- `POST /api/assessment` orphan; proteksi route hanya client-side.

**Technical debt utama:** DB tak terpakai & tak serverless-ready, secret
hardcoded, persistensi volatile, tanpa middleware, tanpa test/CI, klaim vs
realita engine. (Daftar lengkap & prioritas → System Map §11.)

---

## 3. Visi Produk (intisari Konsep — diambil seperlunya)

> Bagian ini **ringkas**; hanya elemen konsep yang dibutuhkan untuk mengarahkan
> pengembangan. Detail naratif lengkap tetap di file Konsep.

**Definisi:** SAINTARA = *Sistem Analisis Intelegensi Tabiat dan Karakter Alami*
— membantu menemukan **karakter & potensi alami** secara cepat (<5 menit) dari
**data minimal**, hasil **deterministik** (tidak berubah), **tanpa kuesioner
panjang**, **berorientasi tindakan**, dan **tidak menghakimi** (karakter elastis,
bukan vonis mutlak).

**Elemen konsep yang relevan untuk produk:**
- **Input tes:** Nama, Tgl lahir, **Jenis Kelamin**, Golongan Darah (**opsional**).
  → build saat ini belum ada jenis kelamin & menjadikan gol darah wajib (perlu disesuaikan).
- **Model karakter:** **9 Tipe** (Pemikir/Pengamat/Perasa/Pemimpi × Introvert/Extrovert + Penggerak) dengan **±35 atribut** dikelompokkan **6 kerangka** (Identitas Dasar, Fondasi Kehidupan, Relasi Sosial, Potensi Diri, Belajar & Berkembang, Kehidupan Praktis).
  → build saat ini memakai 6 tipe lain → **diselaraskan bertahap** (lihat §11).
- **Tier laporan:** Dasar (10 atribut) / Standar (20) / Premium (35+).
- **Segmen:** Personal · Organisasi/Instansi · Sekolah · Social Gift · Kemitraan/Agen.
- **Deliverable:** PDF (atribut sesuai tier) + **Sertifikat**; halaman akhir PDF ada opsi Konsultasi, Tanda Tangan, Nama Panggung.
- **Engine/rumus** disiapkan **terpisah** → diperlakukan sebagai modul pluggable.
- **Tema brand:** putih · emas · biru · hitam; sans-serif modern (sejalan redesign FE).

---

## 4. Arsitektur & Requirement Teknis

**Stack dipertahankan:** Next.js 14 (App Router) · React 18 · TS strict ·
Tailwind · NextAuth · Recharts · next-pwa · **Drizzle ORM**.

**Perubahan fondasi (dari roadmap):**
- **DB → Postgres** (Neon/Supabase), ganti `better-sqlite3`. Sertakan kolom
  `orgId`/tenant sejak awal agar enterprise (P2) tak butuh refactor besar.
- **Auth nyata** (registrasi DB, bcrypt, verifikasi email, reset) + **middleware**/RBAC.
- **Engine adapter** — interface `runAssessment(input) → hasil` yang membungkus
  rumus resmi (pluggable, **server-side**), output termap ke tipe + atribut.
- **Token/credit ledger** + katalog produk + **payment gateway** + webhook +
  **entitlement server-side** (tier menentukan atribut yang dibuka).
- **PDF service** (per tier) + **sertifikat**; **email** transaksional.
- **i18n** (next-intl); **bulk Excel** untuk segmen org/sekolah (fase enterprise).
- **Observability**: analytics, logging, rate limiting, error boundaries, test/CI.

---

## 5. Assessment Flow

**Mode Manual (Personal & Gift)** — sudah ada versi mock; perlu disambungkan:
```
Daftar + pilih tier → verifikasi email → bayar (token)
  → form tes (Nama, Tgl lahir, Jenis Kelamin, Gol darah opsional)
  → engine (server) → simpan ke DB → hasil: dashboard + PDF (sesuai tier) + sertifikat
```

**Mode Massal (Organisasi & Sekolah)** — fitur enterprise (P2):
```
Admin daftar → beli kuota/token → unduh template Excel → unggah data peserta
  → proses batch → hasil ke email tiap peserta + dashboard tim
```
Template Excel: No, Nama, Tgl lahir, Jenis Kelamin, Gol. Darah, Email
(sekolah + No Induk/Kelas). Add-on (multi-ceklis): Laporan Umum · Laporan
Lengkap & Penempatan/Karir · Pelatihan Online/Tatap Muka.

---

## 6. Dashboard Flow

- **Personal:** profil, **riwayat tes**, unduh PDF/sertifikat, status tier. *(mock ada → butuh data nyata + PDF.)*
- **Admin Organisasi (enterprise):** kelola kuota/token, batch Excel, daftar peserta + hasil, **laporan tim** (penempatan, chemistry, gaya komunikasi/kepemimpinan), manajemen anggota & peran.
- **Admin Sekolah:** fokus edukasi (gaya belajar, kecenderungan karir, data BK), kelola kelas/angkatan.
- **Donatur (Social Gift):** riwayat donasi, penerima, **laporan dampak**.
- **Mitra/Agen:** lisensi, stok token, penjualan, komisi.
- **Admin Internal:** konten (tipe×atribut), order/pembayaran, kuota, penyaluran gift, acara/pelatihan, audit.

---

## 7. Monetisasi & Model Token/Kredit

**Prinsip — SAINTARA Credit (Token):** semua aksi berbayar mengonsumsi
**token** = **hak 1 tes pada tier tertentu**. Model ini menyatukan skema
konsep (lisensi tier + kuota per-peserta + donasi + reseller) menjadi satu.

- **1 Token = 1 hak tes** (terikat tier Dasar/Standar/Premium).
- Token bisa: dipakai sendiri, dialokasikan ke peserta (org/sekolah), **dihadiahkan** (gift), atau **dijual ulang** (agen).

**Acuan harga (dari Konsep — dalam USD):**
| Segmen | Item | Harga |
|--------|------|-------|
| Personal | Dasar (10) / Standar (20) / Premium (35+) | $10 / $25 / $30 |
| Organisasi | Admin tes berulang / sekali / kuota | $2.500 / $1.500 / $25 per peserta |
| Sekolah | Admin tes berulang / sekali / kuota | $2.500 / $1.500 / $15 per peserta |
| Social Gift | Lisensi (Dasar/Standar/Premium) × QTY | $10 / $25 / $30 |
| Agen | Lisensi/token grosir untuk dijual ulang | (komisi/margin — TBD) |

**Komponen yang harus dibangun:** wallet/ledger token (idempotent), katalog
produk & tier, checkout + gateway + webhook, konsumsi token atomic saat tes,
**entitlement server-side**, invoice/refund, komisi agen, laporan dampak donasi.

> ⚠️ **Open question — mata uang:** Konsep memakai **USD**; build menampilkan
> **IDR** (Rp 99.000/199.000). Perlu keputusan (USD / IDR / multi-currency);
> harga build saat ini tidak final.

---

## 8. Roadmap Tergabung (P0/P1/P2)

> Tulang punggung = roadmap dasar. Item ber-tanda **(K)** = tambahan dari Konsep
> yang dimasukkan **seperlunya** pada fase yang tepat.
> Format: `prioritas · kompleksitas · risiko`.

### 🟥 P0 — MVP Launch (Personal, fondasi nyata)
- P0.1 DB Postgres + Drizzle · must · M · 🟡
- P0.2 Env & secrets hygiene · must · XS · 🟢
- P0.3 Auth nyata + verifikasi email · must · M · 🟡
- P0.4 Middleware/RBAC dasar · must · S · 🟢
- P0.5 Persistensi assessment ke DB · must · M · 🟡
- P0.6 Dashboard & riwayat dari DB · must · S · 🟢
- P0.7 Error/loading/not-found · should · XS · 🟢
- P0.8 Disclaimer & integritas klaim · must · S · 🔴
- **(K)** P0.9 Form tes sesuai konsep (tambah **jenis kelamin**; gol darah **opsional**) · should · S · 🟢
- **(K)** P0.10 Engine adapter (bungkus rumus, siap diganti) · should · M · 🟡

### 🟧 P1 — Commercial Launch (monetisasi Personal)
- **(K)** P1.1 Token/credit ledger + katalog tier · must · L · 🟡
- P1.2 Payment gateway + webhook · must · L · 🔴
- P1.3 Entitlement premium server-side (tier 10/20/35) · must · M · 🟡
- P1.4 Generator PDF per tier · must · L · 🟡
- **(K)** P1.5 Sertifikat · should · M · 🟢
- P1.6 Email transaksional · must · M · 🟢
- P1.7 Profil/Pengaturan/Billing · should · M · 🟢
- P1.8 Legal & privasi (UU PDP) · must · S · 🟡
- P1.9 i18n ID/EN · should · M · 🟡
- P1.10 Analytics & rate limiting · should · S · 🟢
- **(K)** P1.11 Kredibilitas metode / integrasi rumus resmi · should · L–XL · 🔴
- **(K)** P1.12 Social Gift (donasi lisensi + penyaluran + dampak) · should · L · 🟡
- **(K)** P1.13 Konten 9 tipe + 35 atribut/6 kerangka (bertahap) · should · L · 🟡

### 🟦 P2 — Enterprise (Organisasi, Sekolah, Mitra)
- **(K)** P2.0 Landing & alur per-segmen (Org/Sekolah) · must · M · 🟢
- P2.1 Multi-tenant (Organization/Member) + RBAC penuh · must · XL · 🔴
- **(K)** P2.2 Tes massal via Excel (template/ingest/batch/email) · must · L · 🟡
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

## 9. Data Model (entitas inti)

```
User(id, role[personal|org_admin|school_admin|donor|agent|internal],
     name, nickname?, email(unique), phone?, country?, city?, gender,
     passwordHash, emailVerifiedAt?, locale, createdAt)

Organization(id, type[company|school], name, ownerUserId, createdAt)   // P2
OrgMember(id, orgId, userId, role[admin|manager|viewer])               // P2

CreditWallet(id, ownerType[user|org], ownerId, balanceByTier{...})
CreditTxn(id, walletId, delta, tier, reason[purchase|consume|gift|refund|agent_sale], refId, createdAt)

Product(id, segment, tier, priceAmount, currency, attributesUnlocked)
Order(id, buyerUserId, items[], amount, currency, status, gatewayRef, createdAt)
Payment(id, orderId, gateway, status, payload, createdAt)

TestSubject(id, name, gender, birthDate, bloodType?, email?, externalRef?)
Assessment(id, subjectId, requestedByUserId, orgId?, tier, typeCode, attributes(jsonb), engineVersion, status, createdAt)
Report(id, assessmentId, pdfUrl, certificateUrl, locale, createdAt)

Batch(id, orgId, fileRef, total, processed, status, createdAt)         // P2 Excel
GiftDonation(id, donorUserId, tier, qty, recipientType[named|managed], status)
AgentLicense / AgentSale(...)                                          // P2
Article / Event(...)                                                   // P2
```

> Sertakan `orgId` & konsep tenant sejak P0 meski belum diaktifkan.

---

## 10. Non-Functional Requirements

- **Keamanan:** bcrypt, proteksi route server-side, webhook idempotent, engine server-only (proteksi IP), rate limiting, hapus secret hardcoded.
- **Privasi/Compliance:** UU PDP — consent, hak hapus, retensi; data massal (org/sekolah/minor) butuh perlakuan khusus & persetujuan wali.
- **Performa:** hasil <5 menit; batch & PDF & email asinkron.
- **Skalabilitas:** desain multi-tenant sejak awal; antrian batch/PDF/email.
- **Aksesibilitas:** WCAG AA; perbaiki `userScalable=false`.
- **Keandalan:** test (unit+e2e), CI/CD, monitoring, error boundaries.

---

## 11. Penyelarasan dengan Konsep (delta yang diambil)

> Hanya delta **yang dibutuhkan**; sisanya tetap di file Konsep sebagai referensi.

| Delta | Dampak | Fase |
|-------|--------|------|
| Input **jenis kelamin** + gol darah **opsional** | Ubah form & schema | P0 (K) |
| **9 tipe** menggantikan 6 tipe build | Ganti engine output + konten | P1 (K) bertahap |
| **35 atribut / 6 kerangka** + tier 10/20/35 | Content store + entitlement | P1 (K) |
| **Token/kuota** sebagai basis monetisasi | Ledger + checkout | P1 (K) |
| **Segmen** Org/Sekolah/Gift/Agen | Landing, alur, dashboard | P1–P2 (K) |
| **Tes massal Excel** | Bulk engine | P2 (K) |
| **PDF tier + Sertifikat** | PDF service | P1 (K) |
| **Artikel/Pelatihan/Acara** | Konten & SEO | P2 (K) |
| **i18n** ("Bahasa") | next-intl | P1 (K) |
| Aksen **biru** + emas | Selaraskan tema (kecil) | kapan saja 🟢 |

> Catatan: penggantian model karakter (6→9 tipe) **tidak memblok MVP P0**.
> MVP bisa rilis dengan engine adapter + konten awal; penyelarasan 9 tipe & 35
> atribut dilakukan saat konten + rumus resmi siap (P1).

---

## 12. Risiko & Open Questions

**Risiko 🔴**
1. **Rumus/engine final belum ada** ("disiapkan terpisah") — blocker untuk hasil bermakna; sampai siap, gunakan adapter + tandai placeholder.
2. **Klaim akurasi** — wajib disclaimer "elastis, bukan vonis".
3. **Payment & token ledger** — uang nyata; idempotensi & rekonsiliasi ketat.
4. **Konten besar** (9×35 + relasi, multibahasa) — effort non-coding signifikan.
5. **Data minor (sekolah)** — kepatuhan privasi anak.

**Open questions ❓**
- Mata uang final (USD/IDR/multi)?
- Pemetaan tepat input → 9 tipe → 35 atribut (rumus)?
- Skema komisi agen & harga grosir?
- Model pelatihan/acara (gratis vs berbayar)?
- Visibilitas atribut individu ke manajer (privasi tim)?

---

## 13. KPI & Glosarium

**KPI:** aktivasi (daftar→tes pertama), konversi berbayar/ARPU/distribusi tier,
token terjual vs terkonsumsi, org/sekolah aktif & peserta/batch, donasi
tersalurkan, mitra aktif & komisi, NPS/CSAT, unduh PDF/sertifikat, trafik artikel.

**Glosarium:**
- **Tabiat & Karakter Alami** — karakter bawaan elastis (fokus produk).
- **9 Tipe / 6 Kerangka / 35 atribut** — model klasifikasi & isi laporan.
- **Tier** — Dasar(10)/Standar(20)/Premium(35+) atribut.
- **Token/Kredit** — hak 1 tes pada tier; basis monetisasi terpadu.
- **Massal/Batch** — tes banyak peserta via Excel (org/sekolah).
- **Social Gift / Mitra-Agen** — donasi tes / reseller lisensi.
- **Engine/Rumus** — algoritma pemetaan input→karakter (terpisah, pluggable).

---

### Lampiran — Dokumen Terkait & Precedence
1. **UTAMA:** `SAINTARA_SYSTEM_MAP.md`, `SAINTARA_ROADMAP_IMPLEMENTATION.md`.
2. **PENUNJANG:** `Konsep_Website_Saintara_1.docx` (visi/konten — diambil seperlunya).

> Konflik: **teknis** → System Map; **rencana** → Roadmap; **visi/konten** →
> Konsep (sebatas yang dibutuhkan). PRD ini menyelaraskan ketiganya dengan
> **PRD dasar sebagai poros utama**.
