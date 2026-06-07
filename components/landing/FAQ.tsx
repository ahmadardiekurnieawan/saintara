'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Reveal from '@/components/ui/Reveal'

const faqs = [
  {
    q: 'Bagaimana cara kerja SAINTARA?',
    a: 'SAINTARA memetakan kombinasi unik dari nama lengkap, tanggal lahir, dan golongan darah menjadi profil kecerdasan enam dimensi berbasis kerangka Multiple Intelligences. Setiap kombinasi menghasilkan profil yang deterministik dan konsisten.',
  },
  {
    q: 'Sebaiknya bagaimana saya memaknai hasilnya?',
    a: 'Hasil SAINTARA paling bermanfaat sebagai cermin refleksi dan titik awal pengembangan diri — bukan sebagai diagnosis klinis atau kebenaran mutlak. Gunakan untuk mengenali pola kekuatanmu dan merancang langkah nyata.',
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
      <button className="w-full py-5 text-left flex items-start justify-between gap-4 group" onClick={onToggle}>
        <span className="font-semibold text-primary font-montserrat text-[15px] leading-snug pr-4 group-hover:text-gold transition-colors">{q}</span>
        <ChevronDown size={18} className={cn('text-muted flex-shrink-0 mt-0.5 transition-transform duration-300', isOpen && 'rotate-180 text-gold')} />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', isOpen ? 'max-h-56 pb-5' : 'max-h-0')}>
        <p className="text-muted text-sm leading-relaxed font-montserrat">{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <section id="faq" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow mb-4">FAQ</span>
          <h2 className="section-title text-balance">Pertanyaan yang sering ditanyakan</h2>
          <p className="section-subtitle">Masih ada pertanyaan? Hubungi kami di support@saintara.id</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-soft border border-border px-7 sm:px-9 py-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
