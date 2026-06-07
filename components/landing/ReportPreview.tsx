'use client'
import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import MiniRadar from './MiniRadar'
import { ArrowRight, Check, Briefcase } from 'lucide-react'

interface Persona {
  emoji: string
  color: string
  type: string
  dominant: string
  tagline: string
  description: string
  scores: number[] // 6 dims
  strengths: string[]
  career: { title: string; match: number }
}

const PERSONAS: Persona[] = [
  {
    emoji: '🦅',
    color: '#0F172A',
    type: 'Pemimpin Visioner',
    dominant: 'Interpersonal',
    tagline: 'Menggerakkan orang menuju visi bersama',
    description:
      'Kamu melihat gambaran besar lebih dulu dari orang lain dan punya naluri alami untuk menyatukan tim di sekitarnya. Kekuatanmu adalah arah dan momentum.',
    scores: [78, 70, 66, 64, 60, 92],
    strengths: ['Kepemimpinan alami', 'Visi jangka panjang', 'Komunikasi yang menggerakkan'],
    career: { title: 'CEO / Direktur Eksekutif', match: 94 },
  },
  {
    emoji: '🔭',
    color: '#2563EB',
    type: 'Analis Strategis',
    dominant: 'Logis-Matematis',
    tagline: 'Mengubah kompleksitas menjadi keputusan',
    description:
      'Pikiranmu memproses informasi rumit dengan cepat dan menyusunnya menjadi strategi konkret. Kamu pemecah masalah yang tidak berhenti di permukaan.',
    scores: [72, 94, 81, 64, 58, 77],
    strengths: ['Pemikiran analitis tajam', 'Problem-solving sistematis', 'Pengambilan keputusan berbasis data'],
    career: { title: 'Data Scientist', match: 96 },
  },
  {
    emoji: '✨',
    color: '#C59830',
    type: 'Kreator Inovatif',
    dominant: 'Spasial',
    tagline: 'Menemukan koneksi yang orang lain lewatkan',
    description:
      'Kreativitasmu mengalir tanpa henti. Kamu mengubah ide abstrak menjadi karya nyata dan melihat pola yang tak terlihat oleh kebanyakan orang.',
    scores: [80, 68, 93, 70, 82, 71],
    strengths: ['Kreativitas tanpa batas', 'Imajinasi spasial kuat', 'Inovasi lintas disiplin'],
    career: { title: 'Creative Director', match: 95 },
  },
  {
    emoji: '🌿',
    color: '#059669',
    type: 'Penjaga Harmoni',
    dominant: 'Interpersonal',
    tagline: 'Menjembatani perbedaan, membangun kepercayaan',
    description:
      'Kehadiranmu membawa ketenangan. Kamu peka terhadap dinamika orang dan menciptakan lingkungan di mana semua orang merasa dihargai.',
    scores: [76, 64, 62, 68, 74, 90],
    strengths: ['Empati tinggi', 'Resolusi konflik', 'Membangun budaya tim'],
    career: { title: 'HR Director', match: 93 },
  },
]

const DIM_LABELS = ['Linguistik', 'Logis', 'Spasial', 'Kinestetik', 'Musikal', 'Interpersonal']

export default function ReportPreview() {
  const [active, setActive] = useState(1)
  const p = PERSONAS[active]

  return (
    <section id="sample" className="relative py-24 lg:py-32 bg-cream overflow-hidden">
      <div className="absolute inset-0 bg-dots-light opacity-60 pointer-events-none" aria-hidden />
      <div className="relative max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow mb-4">Contoh Laporan</span>
          <h2 className="section-title text-balance">Lihat hasilnya, sebelum mendaftar</h2>
          <p className="section-subtitle">
            Setiap profil menghasilkan laporan yang berbeda. Jelajahi beberapa contoh di bawah ini secara langsung.
          </p>
        </Reveal>

        {/* Persona selector */}
        <Reveal delay={80} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {PERSONAS.map((persona, i) => (
            <button
              key={persona.type}
              onClick={() => setActive(i)}
              className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-montserrat font-medium transition-all duration-300 ${
                i === active
                  ? 'border-gold bg-white text-primary shadow-soft'
                  : 'border-border bg-white/60 text-muted hover:border-gold/40 hover:text-primary'
              }`}
            >
              <span className="text-base">{persona.emoji}</span>
              {persona.type}
            </button>
          ))}
        </Reveal>

        {/* Report card */}
        <Reveal delay={120}>
          <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-border shadow-elevated overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left: visualization */}
              <div className="relative p-7 sm:p-9 border-b md:border-b-0 md:border-r border-border bg-surface/40">
                <div className="flex items-center gap-3.5 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: `${p.color}18`, border: `2px solid ${p.color}33` }}
                  >
                    {p.emoji}
                  </div>
                  <div>
                    <p className="text-[11px] font-montserrat uppercase tracking-widest text-muted">Tipe Karakter</p>
                    <h3 className="font-cinzel font-bold text-xl text-primary leading-tight">{p.type}</h3>
                    <p className="text-xs font-montserrat font-medium" style={{ color: p.color }}>
                      Dominan · {p.dominant}
                    </p>
                  </div>
                </div>

                <div key={active} className="aspect-square max-w-[280px] mx-auto animate-fade-in">
                  <MiniRadar scores={p.scores} size={280} showLabels labels={DIM_LABELS} />
                </div>
              </div>

              {/* Right: details */}
              <div key={`d-${active}`} className="p-7 sm:p-9 animate-fade-in">
                <p className="text-sm font-montserrat font-semibold text-gold mb-2">{p.tagline}</p>
                <p className="text-muted text-sm leading-relaxed font-montserrat mb-6">{p.description}</p>

                <p className="text-[11px] font-montserrat uppercase tracking-widest text-muted mb-3">Kekuatan Utama</p>
                <ul className="space-y-2.5 mb-7">
                  {p.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm font-montserrat text-primary">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                        <Check size={11} className="text-gold" />
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 rounded-2xl bg-surface/70 border border-border p-4">
                  <span className="w-9 h-9 rounded-xl bg-navy/10 flex items-center justify-center shrink-0">
                    <Briefcase size={16} className="text-navy" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-montserrat text-muted leading-none mb-1">Rekomendasi karier teratas</p>
                    <p className="text-sm font-semibold font-montserrat text-primary leading-tight">{p.career.title}</p>
                  </div>
                  <span className="rounded-full bg-gold/10 text-gold border border-gold/20 px-2.5 py-1 text-xs font-bold font-montserrat shrink-0">
                    {p.career.match}%
                  </span>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-7 sm:px-9 py-5 border-t border-border bg-surface/50">
              <p className="text-sm font-montserrat text-muted text-center sm:text-left">
                Ini hanya cuplikan — laporan lengkap mencakup analisis mendalam &amp; action plan.
              </p>
              <Link href="/register" className="shrink-0">
                <Button variant="gold" size="md" className="shadow-gold group">
                  Buat laporanku
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
