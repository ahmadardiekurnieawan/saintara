import Reveal from '@/components/ui/Reveal'

const steps = [
  {
    step: '01',
    title: 'Masukkan data',
    description: 'Cukup nama lengkap, tanggal lahir, dan golongan darah. Tanpa kuesioner panjang yang melelahkan.',
  },
  {
    step: '02',
    title: 'Pemetaan profil',
    description: 'Profilmu dipetakan ke enam dimensi kecerdasan menggunakan kerangka Multiple Intelligences.',
  },
  {
    step: '03',
    title: 'Terima laporan',
    description: 'Laporan personal yang jernih: kekuatan, rekomendasi karier, dan action plan—siap ditindaklanjuti.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-white">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-16">
          <span className="eyebrow mb-4">Cara Kerja</span>
          <h2 className="section-title text-balance">Tiga langkah, hasil menyeluruh</h2>
          <p className="section-subtitle">Dari input data hingga laporan personal—selesai dalam hitungan menit.</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {steps.map((step, i) => (
            <Reveal key={step.step} delay={i * 110}>
              <div className="h-full bg-white p-8 lg:p-10">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-display font-bold text-5xl text-slate-200 tracking-tight">{step.step}</span>
                  <span className="h-px flex-1 bg-border mb-2" />
                </div>
                <h3 className="font-display font-semibold text-xl text-primary mb-3 tracking-tight">{step.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
