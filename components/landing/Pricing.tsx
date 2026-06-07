import { Check } from 'lucide-react'
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
    variant: 'primary' as const,
    highlight: true,
    badge: 'Populer',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    priceNote: 'hubungi kami',
    description: 'Untuk tim dan organisasi yang ingin mengoptimalkan SDM.',
    features: ['Semua fitur Professional', 'Assessment tim tak terbatas', 'Dashboard analytics tim', 'API integration', 'Konsultasi 1-on-1', 'Branding white-label'],
    cta: 'Hubungi sales',
    variant: 'outline' as const,
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-16">
          <span className="eyebrow mb-4">Harga</span>
          <h2 className="section-title text-balance">Harga yang jelas, tanpa kejutan</h2>
          <p className="section-subtitle">Pilih paket yang sesuai. Tidak ada biaya tersembunyi.</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 90} className="h-full">
              <div
                className={`relative h-full rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-ink border border-ink shadow-elevated'
                    : 'bg-white border border-border hover:border-slate-300 hover:shadow-soft'
                }`}
              >
                {(plan as { badge?: string }).badge && (
                  <div className="absolute -top-3 left-8">
                    <span className="bg-gold text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      {(plan as { badge?: string }).badge}
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`font-display font-semibold text-lg tracking-tight mb-1 ${plan.highlight ? 'text-white' : 'text-primary'}`}>{plan.name}</h3>
                  <p className={`text-sm mb-5 min-h-[40px] ${plan.highlight ? 'text-white/55' : 'text-muted'}`}>{plan.description}</p>
                  <span className={`font-display font-bold text-4xl tracking-tight ${plan.highlight ? 'text-white' : 'text-primary'}`}>{plan.price}</span>
                  <p className={`text-xs mt-1.5 ${plan.highlight ? 'text-white/45' : 'text-muted'}`}>{plan.priceNote}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-white/10' : 'bg-surface border border-border'}`}>
                        <Check size={11} className={plan.highlight ? 'text-gold' : 'text-primary'} />
                      </span>
                      <span className={plan.highlight ? 'text-white/85' : 'text-primary/90'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.name === 'Enterprise' ? '#contact' : '/register'}>
                  <Button variant={plan.highlight ? 'light' : plan.variant} fullWidth size="lg">
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="text-center text-muted text-sm mt-12">
            Akses seumur hidup ke laporanmu · Garansi uang kembali 7 hari
          </p>
        </Reveal>
      </div>
    </section>
  )
}
