import { Check, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import Link from 'next/link'

const plans = [
  {
    name: 'Personal',
    price: 'Rp 99.000',
    priceNote: 'per laporan',
    description: 'Untuk individu yang ingin memahami diri lebih dalam.',
    features: ['Analisis 6 dimensi kecerdasan', 'Radar chart interaktif', 'Profil karakter lengkap', '3 rekomendasi karier', 'Gaya relasi & komunikasi', '3 hari action plan'],
    cta: 'Mulai sekarang',
    variant: 'outline' as const,
    highlight: false,
  },
  {
    name: 'Professional',
    price: 'Rp 199.000',
    priceNote: 'per laporan',
    description: 'Untuk profesional yang serius mengembangkan diri.',
    features: ['Semua fitur Personal', 'PDF premium 20+ halaman', 'Action plan 30 hari penuh', 'Analisis kepemimpinan', 'Insight tim & kolaborasi', 'Update laporan tahunan'],
    cta: 'Pilih Professional',
    variant: 'gold' as const,
    highlight: true,
    badge: 'Terpopuler',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    priceNote: 'hubungi kami',
    description: 'Untuk tim dan organisasi yang ingin mengoptimalkan SDM.',
    features: ['Semua fitur Professional', 'Assessment tim tak terbatas', 'Dashboard analytics tim', 'API integration', 'Konsultasi 1-on-1', 'Branding white-label'],
    cta: 'Hubungi sales',
    variant: 'primary' as const,
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow mb-4">Harga</span>
          <h2 className="section-title text-balance">Investasi yang jelas untuk dirimu</h2>
          <p className="section-subtitle">Pilih paket yang sesuai. Tidak ada biaya tersembunyi.</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 90} className="h-full">
              <div
                className={`relative h-full bg-white rounded-3xl border p-8 flex flex-col transition-all duration-300 ${
                  plan.highlight
                    ? 'border-gold/60 shadow-elevated md:scale-[1.04] z-10'
                    : 'border-border shadow-soft hover:-translate-y-1 hover:shadow-card-hover'
                }`}
              >
                {(plan as { badge?: string }).badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-gold text-white text-[11px] font-bold font-montserrat px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-gold">
                      <Sparkles size={11} />
                      {(plan as { badge?: string }).badge}
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-cinzel font-bold text-xl text-primary mb-1">{plan.name}</h3>
                  <p className="text-muted text-sm font-montserrat mb-5 min-h-[40px]">{plan.description}</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`font-cinzel font-bold text-4xl ${plan.highlight ? 'text-gold' : 'text-primary'}`}>{plan.price}</span>
                  </div>
                  <p className="text-xs text-muted font-montserrat mt-1.5">{plan.priceNote}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm font-montserrat">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-gold/12 flex items-center justify-center shrink-0">
                        <Check size={11} className="text-gold" />
                      </span>
                      <span className="text-primary/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.name === 'Enterprise' ? '#contact' : '/register'}>
                  <Button variant={plan.variant} fullWidth size="lg">
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="text-center text-muted text-sm font-montserrat mt-12">
            Akses seumur hidup ke laporanmu · Garansi uang kembali 7 hari
          </p>
        </Reveal>
      </div>
    </section>
  )
}
