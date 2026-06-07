import { Check, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'
const plans = [
  { name: 'Personal', price: 'Rp 99.000', priceNote: 'per laporan', description: 'Untuk individu yang ingin memahami diri sendiri lebih dalam.', features: ['Analisis 6 dimensi kecerdasan', 'Radar chart interaktif', 'Profil karakter lengkap', '3 rekomendasi karier', 'Gaya relasi & komunikasi', '3 hari action plan'], cta: 'Mulai Sekarang', variant: 'outline' as const, highlight: false },
  { name: 'Professional', price: 'Rp 199.000', priceNote: 'per laporan', description: 'Untuk profesional yang serius dalam pengembangan diri.', features: ['Semua fitur Personal', 'PDF premium 20+ halaman', 'Action plan 30 hari penuh', 'Analisis kepemimpinan', 'Insight tim & kolaborasi', 'Update laporan tahunan'], cta: 'Pilih Professional', variant: 'gold' as const, highlight: true, badge: 'Terpopuler' },
  { name: 'Enterprise', price: 'Custom', priceNote: 'hubungi kami', description: 'Untuk tim dan organisasi yang ingin mengoptimalkan SDM.', features: ['Semua fitur Professional', 'Assessment tim tak terbatas', 'Dashboard analytics tim', 'API integration', 'Konsultasi 1-on-1', 'Branding white-label'], cta: 'Hubungi Sales', variant: 'primary' as const, highlight: false },
]
export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="badge-gold mb-4 inline-block">Harga Transparan</span>
          <h2 className="section-title mb-4">Investasi untuk Dirimu</h2>
          <p className="section-subtitle max-w-2xl mx-auto">Pilih paket yang sesuai. Tidak ada biaya tersembunyi.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`relative bg-white rounded-3xl border-2 p-8 flex flex-col ${plan.highlight ? 'border-gold shadow-gold scale-105 z-10' : 'border-border shadow-card'}`}>
              {(plan as { badge?: string }).badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-white text-xs font-bold font-montserrat px-4 py-1.5 rounded-full flex items-center gap-1.5"><Zap size={11} />{(plan as { badge?: string }).badge}</span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-cinzel font-bold text-xl text-primary mb-1">{plan.name}</h3>
                <p className="text-muted text-sm font-montserrat mb-4">{plan.description}</p>
                <span className={`font-cinzel font-bold text-3xl ${plan.highlight ? 'text-gold' : 'text-primary'}`}>{plan.price}</span>
                <p className="text-xs text-muted font-montserrat mt-1">{plan.priceNote}</p>
              </div>
              <ul className="space-y-2.5 flex-1 mb-8">
                {plan.features.map((f, j) => <li key={j} className="flex items-start gap-2.5 text-sm font-montserrat"><Check size={15} className="text-gold mt-0.5 flex-shrink-0" /><span className="text-primary">{f}</span></li>)}
              </ul>
              <Link href={plan.name === 'Enterprise' ? '#contact' : '/register'}><Button variant={plan.variant} fullWidth size="lg">{plan.cta}</Button></Link>
            </div>
          ))}
        </div>
        <p className="text-center text-muted text-sm font-montserrat mt-10">Semua paket termasuk akses seumur hidup ke laporan Anda. Garansi uang kembali 7 hari.</p>
      </div>
    </section>
  )
}
