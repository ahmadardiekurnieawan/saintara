'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import Reveal from '@/components/ui/Reveal'

const faqs = [
  {
    q: 'Bagaimana cara kerja SAINTARA?',
    a: 'SAINTARA memetakan kombinasi unik dari nama lengkap, tanggal lahir, dan golongan darah menjadi profil kecerdasan enam dimensi berbasis kerangka Multiple Intelligences. Setiap kombinasi menghasilkan profil yang deterministik dan konsisten.',
  },
  {
    q: 'Sebaiknya bagaimana saya memaknai hasilnya?',
    a: 'Hasil SAINTARA paling bermanfaat sebagai cermin refleksi dan titik awal pengembangan diri—bukan diagnosis klinis atau kebenaran mutlak. Gunakan untuk mengenali pola kekuatanmu dan merancang langkah nyata.',
  },
  {
    q: 'Apakah data saya aman?',
    a: 'Privasi adalah prioritas kami. Data kamu tidak kami jual atau bagikan ke pihak ketiga tanpa persetujuanmu, dan hanya digunakan untuk menyusun laporanmu.',
  },
  {
    q: 'Berapa lama proses analisisnya?',
    a: 'Sangat cepat. Setelah kamu mengonfirmasi data, laporan tersusun dalam hitungan detik dan langsung tersedia di dashboard.',
  },
  {
    q: 'Apakah ada versi gratis?',
    a: 'Ya. Kamu bisa mendaftar dan mencoba analisis dasar secara gratis. Untuk laporan lengkap dengan PDF premium dan action plan 30 hari, tersedia paket berbayar.',
  },
]

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border last:border-0">
      <button className="w-full py-5 text-left flex items-center justify-between gap-4 group" onClick={onToggle}>
        <span className="font-semibold text-primary text-[15px] leading-snug pr-4">{q}</span>
        <span className={cn('shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center transition-all duration-300', isOpen ? 'bg-ink border-ink rotate-45' : 'group-hover:border-slate-400')}>
          <Plus size={13} className={isOpen ? 'text-white' : 'text-primary'} />
        </span>
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', isOpen ? 'max-h-56 pb-5' : 'max-h-0')}>
        <p className="text-muted text-[15px] leading-relaxed pr-10">{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <Reveal>
            <span className="eyebrow mb-4">FAQ</span>
            <h2 className="section-title text-balance">Pertanyaan yang sering ditanyakan</h2>
            <p className="section-subtitle">
              Masih ada pertanyaan? Hubungi kami di{' '}
              <a href="mailto:support@saintara.id" className="text-primary font-medium underline underline-offset-4 decoration-slate-300 hover:decoration-primary">support@saintara.id</a>
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-3xl border border-border bg-white px-7 sm:px-8">
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
