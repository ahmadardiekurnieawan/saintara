import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowRight, Star } from 'lucide-react'
export default function CTA() {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-ai-blue/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-gold fill-gold" />)}
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Siap Menemukan<br /><span className="gradient-text">Versi Terbaik Dirimu?</span>
        </h2>
        <p className="text-white/70 text-lg font-montserrat max-w-xl mx-auto mb-10">Bergabunglah dengan ribuan individu yang telah menggunakan SAINTARA untuk memaksimalkan potensi mereka.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register"><Button variant="gold" size="xl" className="shadow-gold min-w-[220px]">Mulai Analisis Gratis<ArrowRight size={20} /></Button></Link>
          <Link href="/login"><Button variant="ghost" size="xl" className="text-white border-2 border-white/30 hover:bg-white/10 min-w-[180px]">Sudah punya akun?</Button></Link>
        </div>
        <p className="text-white/40 text-sm font-montserrat mt-8">Tidak perlu kartu kredit · Analisis dasar gratis · Garansi 7 hari</p>
      </div>
    </section>
  )
}
