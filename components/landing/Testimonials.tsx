import Reveal from '@/components/ui/Reveal'
import { Star, ShieldCheck, Lock, RefreshCw, Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Laporannya jauh lebih dalam dari yang saya kira. Untuk pertama kalinya saya bisa menjelaskan cara kerja pikiran saya ke tim dengan bahasa yang jelas.',
    name: 'Anindya Pratiwi',
    role: 'Product Lead, Startup Teknologi',
    initials: 'AP',
    color: '#2563EB',
  },
  {
    quote:
      'Visualisasinya elegan dan mudah dicerna. Action plan-nya membuat hasil assessment terasa nyata, bukan sekadar teori.',
    name: 'Raka Mahendra',
    role: 'Konsultan Manajemen',
    initials: 'RM',
    color: '#C59830',
  },
  {
    quote:
      'Saya pakai untuk onboarding tim baru. Membantu kami memahami kekuatan masing-masing orang sejak hari pertama.',
    name: 'Sarah Wijaya',
    role: 'Head of People',
    initials: 'SW',
    color: '#059669',
  },
]

const guarantees = [
  { icon: Lock, label: 'Privasi terjaga', sub: 'Data tidak dijual' },
  { icon: ShieldCheck, label: 'Hasil personal', sub: 'Unik per profil' },
  { icon: RefreshCw, label: 'Garansi 7 hari', sub: 'Uang kembali' },
]

export default function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow mb-4">Dipercaya</span>
          <h2 className="section-title text-balance">Kata mereka yang sudah mencoba</h2>
          <p className="section-subtitle">
            Digunakan oleh individu dan tim dari berbagai bidang — teknologi, pendidikan, kreatif, hingga riset.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="h-full flex flex-col rounded-3xl border border-border bg-cream/60 p-7 hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
                <Quote size={24} className="text-gold/30 mb-4" />
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                <blockquote className="text-primary/90 text-[15px] leading-relaxed font-montserrat flex-1">
                  “{t.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-border">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-montserrat text-white shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-primary font-montserrat leading-tight">{t.name}</p>
                    <p className="text-xs text-muted font-montserrat">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Trust signals */}
        <Reveal delay={120}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-3xl overflow-hidden border border-border bg-border">
            {guarantees.map((g) => {
              const Icon = g.icon
              return (
                <div key={g.label} className="flex items-center gap-4 bg-white px-6 py-6">
                  <span className="w-11 h-11 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={19} className="text-gold" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-primary font-montserrat leading-tight">{g.label}</p>
                    <p className="text-xs text-muted font-montserrat mt-0.5">{g.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
