'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  { q: 'Bagaimana cara kerja algoritma SAINTARA?', a: 'SAINTARA menggunakan algoritma proprietary yang menganalisis kombinasi unik nama lengkap, tanggal lahir, dan golongan darah untuk menghasilkan profil kecerdasan. Setiap kombinasi menghasilkan profil yang deterministik dan unik.' },
  { q: 'Apakah hasilnya akurat?', a: 'SAINTARA mengklaim akurasi 98% berdasarkan validasi dengan 10.000+ pengguna. Hasil terbaik diperoleh ketika Anda menggunakannya sebagai cermin refleksi, bukan sebagai kebenaran mutlak.' },
  { q: 'Data saya aman?', a: 'Keamanan data adalah prioritas utama kami. Semua data dienkripsi menggunakan standar enterprise AES-256. Kami tidak menjual atau membagikan data Anda tanpa persetujuan eksplisit Anda.' },
  { q: 'Berapa lama proses analisis?', a: 'Proses analisis selesai dalam hitungan detik setelah Anda mengkonfirmasi data. Laporan langsung tersedia di dashboard Anda.' },
  { q: 'Apakah ada versi trial gratis?', a: 'Ya! Anda bisa mendaftar dan mencoba analisis dasar secara gratis. Untuk laporan lengkap dengan PDF premium dan action plan 30 hari, tersedia paket berbayar.' },
]

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border last:border-0">
      <button className="w-full py-5 text-left flex items-start justify-between gap-4" onClick={onToggle}>
        <span className="font-semibold text-primary font-montserrat text-sm leading-snug pr-4">{q}</span>
        <ChevronDown size={18} className={cn('text-muted flex-shrink-0 mt-0.5 transition-transform duration-200', isOpen && 'rotate-180 text-gold')} />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', isOpen ? 'max-h-48 pb-5' : 'max-h-0')}>
        <p className="text-muted text-sm leading-relaxed font-montserrat">{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <section id="faq" className="py-20 bg-surface">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="badge-navy mb-4 inline-block">FAQ</span>
          <h2 className="section-title mb-4">Pertanyaan yang Sering Ditanyakan</h2>
          <p className="section-subtitle">Punya pertanyaan lain? Hubungi tim kami di support@saintara.id</p>
        </div>
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-card border border-border p-8">
          {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />)}
        </div>
      </div>
    </section>
  )
}
