'use client'
import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import MiniRadar from './MiniRadar'
import { ArrowRight, Check, Briefcase, Compass, Target, Lightbulb, Users, type LucideIcon } from 'lucide-react'

interface Persona {
  icon: LucideIcon
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
    icon: Compass,
    type: 'Pemimpin Visioner',
    dominant: 'Interpersonal',
    tagline: 'Menggerakkan orang menuju visi bersama',
    description:
      'Kamu melihat gambaran besar lebih dulu dari orang lain dan punya naluri alami untuk menyatukan tim. Kekuatanmu adalah arah dan momentum.',
    scores: [74, 58, 49, 61, 52, 93],
    strengths: ['Kepemimpinan alami', 'Visi jangka panjang', 'Komunikasi yang menggerakkan'],
    career: { title: 'CEO / Direktur Eksekutif', match: 94 },
  },
  {
    icon: Target,
    type: 'Analis Strategis',
    dominant: 'Logis-Matematis',
    tagline: 'Mengubah kompleksitas menjadi keputusan',
    description:
      'Pikiranmu memproses informasi rumit dengan cepat dan menyusunnya menjadi strategi konkret. Kamu pemecah masalah yang tidak berhenti di permukaan.',
    scores: [70, 95, 81, 52, 47, 76],
    strengths: ['Pemikiran analitis tajam', 'Problem-solving sistematis', 'Keputusan berbasis data'],
    career: { title: 'Data Scientist', match: 96 },
  },
  {
    icon: Lightbulb,
    type: 'Kreator Inovatif',
    dominant: 'Spasial',
    tagline: 'Menemukan koneksi yang orang lain lewatkan',
    description:
      'Kreativitasmu mengalir tanpa henti. Kamu mengubah ide abstrak menjadi karya nyata dan melihat pola yang tak terlihat oleh kebanyakan orang.',
    scores: [78, 55, 94, 64, 85, 60],
    strengths: ['Kreativitas tanpa batas', 'Imajinasi spasial kuat', 'Inovasi lintas disiplin'],
    career: { title: 'Creative Director', match: 95 },
  },
  {
    icon: Users,
    type: 'Penjaga Harmoni',
    dominant: 'Interpersonal',
    tagline: 'Menjembatani perbedaan, membangun kepercayaan',
    description:
      'Kehadiranmu membawa ketenangan. Kamu peka terhadap dinamika orang dan menciptakan lingkungan di mana semua orang merasa dihargai.',
    scores: [80, 56, 51, 66, 72, 90],
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
      <div className="absolute inset-0 bg-dots-light opacity-70 pointer-events-none" aria-hidden />
      <div className="relative max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-12">
          <span className="eyebrow mb-4">Contoh Laporan</span>
          <h2 className="section-title text-balance">Lihat hasilnya, sebelum mendaftar</h2>
          <p className="section-subtitle">
            Setiap profil menghasilkan laporan yang berbeda. Jelajahi beberapa contoh di bawah ini secara langsung.
          </p>
        </Reveal>

        {/* Persona selector */}
        <Reveal delay={80} className="flex flex-wrap gap-2.5 mb-8">
          {PERSONAS.map((persona, i) => {
            const Icon = persona.icon
            return (
              <button
                key={persona.type}
                onClick={() => setActive(i)}
                className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  i === active
                    ? 'border-ink bg-ink text-white shadow-soft'
                    : 'border-border bg-white text-muted hover:border-slate-300 hover:text-primary'
                }`}
              >
                <Icon size={15} className={i === active ? 'text-gold' : 'text-slate-400 group-hover:text-primary'} />
                {persona.type}
              </button>
            )
          })}
        </Reveal>

        {/* Report card */}
        <Reveal delay={120}>
          <div className="max-w-4xl rounded-3xl bg-white border border-border shadow-elevated overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left: visualization */}
              <div className="relative p-7 sm:p-9 border-b md:border-b-0 md:border-r border-border bg-surface/50">
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-ink">
                    <p.icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">Tipe Karakter</p>
                    <h3 className="font-display font-bold text-xl text-primary leading-tight tracking-tight">{p.type}</h3>
                    <p className="text-xs font-medium text-muted">Dominan · {p.dominant}</p>
                  </div>
                </div>

                <div key={active} className="aspect-square max-w-[280px] mx-auto animate-fade-in">
                  <MiniRadar scores={p.scores} size={280} showLabels labels={DIM_LABELS} />
                </div>
              </div>

              {/* Right: details */}
              <div key={`d-${active}`} className="p-7 sm:p-9 animate-fade-in">
                <p className="text-[15px] font-semibold text-primary mb-2">{p.tagline}</p>
                <p className="text-muted text-[15px] leading-relaxed mb-6">{p.description}</p>

                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-3">Kekuatan Utama</p>
                <ul className="space-y-2.5 mb-7">
                  {p.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-[15px] text-primary">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                        <Check size={11} className="text-gold-dark" />
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 rounded-2xl bg-surface border border-border p-4">
                  <span className="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center shrink-0">
                    <Briefcase size={16} className="text-primary" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-muted leading-none mb-1">Rekomendasi karier teratas</p>
                    <p className="text-sm font-semibold text-primary leading-tight">{p.career.title}</p>
                  </div>
                  <span className="rounded-full bg-ink text-white px-2.5 py-1 text-xs font-bold shrink-0">
                    {p.career.match}%
                  </span>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-7 sm:px-9 py-5 border-t border-border bg-surface/40">
              <p className="text-sm text-muted text-center sm:text-left">
                Ini hanya cuplikan—laporan lengkap mencakup analisis mendalam &amp; action plan.
              </p>
              <Link href="/register" className="shrink-0">
                <Button variant="primary" size="md" className="group">
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
