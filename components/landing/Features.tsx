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
    description: 'Tantangan harian yang terukur untuk mengubah insight menjadi kebiasaan nyata.',
  },
  {
    icon: Briefcase,
    title: 'Rekomendasi karier',
    description: 'Jalur karier yang paling selaras dengan pola kekuatan alamimu, lengkap dengan skor kecocokan.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-white">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow mb-4">Fitur</span>
          <h2 className="section-title text-balance">Semua yang kamu butuhkan, dalam satu laporan</h2>
          <p className="section-subtitle">Dirancang untuk memberi insight terdalam dengan pengalaman paling elegan.</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 auto-rows-fr">
          {/* Featured dark card */}
          <Reveal className="md:col-span-2">
            <div className="relative h-full rounded-3xl bg-gradient-hero border border-white/[0.06] p-8 sm:p-10 overflow-hidden">
              <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50 pointer-events-none" aria-hidden />
              <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-gold/10 blur-[90px] rounded-full pointer-events-none" aria-hidden />
              <div className="relative grid sm:grid-cols-2 gap-8 items-center h-full">
                <div>
                  <span className="eyebrow mb-4">Inti Platform</span>
                  <h3 className="font-cinzel font-bold text-2xl sm:text-3xl text-white leading-tight mb-3">
                    Analisis enam dimensi kecerdasan
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed font-montserrat">
                    Berbasis kerangka Multiple Intelligences — linguistik, logis-matematis, spasial, kinestetik, musikal, dan interpersonal — dipetakan menjadi profil yang utuh dan personal.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 backdrop-blur-sm">
                  <div className="aspect-square max-w-[220px] mx-auto">
                    <MiniRadar scores={[78, 88, 72, 65, 60, 84]} size={220} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <Reveal key={feature.title} delay={i * 70}>
                <div className="group h-full rounded-3xl border border-border bg-cream/40 p-7 hover:bg-white hover:border-gold/30 hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors">
                    <Icon size={22} className="text-gold" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-cinzel font-bold text-lg text-primary mb-2">{feature.title}</h3>
                  <p className="text-muted text-sm leading-relaxed font-montserrat">{feature.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
