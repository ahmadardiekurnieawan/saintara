import Reveal from '@/components/ui/Reveal'
import { PenLine, Compass, FileText } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: PenLine,
    title: 'Masukkan data',
    description: 'Cukup nama lengkap, tanggal lahir, dan golongan darah. Tidak ada kuesioner panjang yang melelahkan.',
  },
  {
    step: '02',
    icon: Compass,
    title: 'Pemetaan profil',
    description: 'Profilmu dipetakan ke enam dimensi kecerdasan menggunakan kerangka Multiple Intelligences.',
  },
  {
    step: '03',
    icon: FileText,
    title: 'Terima laporan',
    description: 'Laporan personal yang jernih lengkap dengan kekuatan, rekomendasi karier, dan action plan.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow mb-4">Cara Kerja</span>
          <h2 className="section-title text-balance">Tiga langkah, hasil menyeluruh</h2>
          <p className="section-subtitle">Dari input data hingga laporan personal — selesai dalam hitungan menit.</p>
        </Reveal>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 max-w-4xl mx-auto">
          {/* Connector line */}
          <div className="hidden md:block absolute top-9 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.step} delay={i * 110}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 mb-6">
                    <div className="w-[72px] h-[72px] rounded-3xl bg-white border border-border shadow-soft flex items-center justify-center">
                      <Icon size={26} className="text-gold" strokeWidth={1.75} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-ink flex items-center justify-center text-[11px] font-bold font-montserrat text-gold border border-white/10">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-cinzel font-bold text-xl text-primary mb-3">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed font-montserrat max-w-xs">{step.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
