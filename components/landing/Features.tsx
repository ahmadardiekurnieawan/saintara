import { BarChart3, FileText, CalendarCheck, Briefcase } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import MiniRadar from './MiniRadar'

const features = [
  {
    icon: BarChart3,
    title: 'Radar interaktif',
    description: 'Lihat keenam dimensi kecerdasanmu dalam satu visual yang jernih dan mudah dibaca.',
  },
  {
    icon: FileText,
    title: 'Laporan PDF premium',
    description: 'Unduh laporan rapi dengan analisis mendalam dan rekomendasi yang dipersonalisasi.',
  },
  {
    icon: CalendarCheck,
    title: 'Action plan 30 hari',
    description: 'Tantangan harian terukur untuk mengubah insight menjadi kebiasaan nyata.',
  },
  {
    icon: Briefcase,
    title: 'Rekomendasi karier',
    description: 'Jalur karier yang paling selaras dengan pola kekuatan alamimu, lengkap dengan skor kecocokan.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-16">
          <span className="eyebrow mb-4">Fitur</span>
          <h2 className="section-title text-balance">Semua yang kamu butuhkan, dalam satu laporan</h2>
          <p className="section-subtitle">Dirancang untuk memberi insight terdalam dengan pengalaman yang paling jernih.</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 md:auto-rows-fr">
          {/* Featured dark card */}
          <Reveal className="md:col-span-2">
            <div className="relative h-full rounded-3xl bg-ink border border-white/[0.06] p-8 sm:p-10 overflow-hidden">
              <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40 pointer-events-none" aria-hidden />
              <div className="absolute -bottom-20 -right-12 w-72 h-72 bg-gold/[0.08] blur-[90px] rounded-full pointer-events-none" aria-hidden />
              <div className="relative grid sm:grid-cols-2 gap-8 items-center h-full">
                <div>
                  <span className="eyebrow !text-slate-400 mb-4">Inti Platform</span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight tracking-tight mb-3">
                    Analisis enam dimensi kecerdasan
                  </h3>
                  <p className="text-white/55 text-[15px] leading-relaxed">
                    Berbasis kerangka Multiple Intelligences—linguistik, logis-matematis, spasial, kinestetik, musikal, dan interpersonal—dipetakan menjadi profil yang utuh dan personal.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                  <div className="aspect-square max-w-[220px] mx-auto">
                    <MiniRadar scores={[84, 67, 91, 48, 72, 79]} size={220} dark />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <Reveal key={feature.title} delay={i * 70}>
                <div className="group h-full rounded-3xl border border-border bg-white p-7 hover:border-slate-300 hover:shadow-soft transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center mb-5 group-hover:bg-ink group-hover:border-ink transition-colors">
                    <Icon size={20} className="text-primary group-hover:text-white transition-colors" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-primary mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-muted text-[15px] leading-relaxed">{feature.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
