'use client'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ai-blue/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
      <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/80 text-sm font-montserrat mb-8">
          <Sparkles size={14} className="text-gold" />
          <span>Platform Penilaian Kecerdasan Manusia #1 di Indonesia</span>
        </div>
        <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Kenali Potensi{' '}<span className="gradient-text">Terdalammu</span>
        </h1>
        <p className="text-white/70 text-lg sm:text-xl font-montserrat max-w-2xl mx-auto mb-10 leading-relaxed">
          Dengan analisis berbasis AI yang menggabungkan nama, tanggal lahir, dan golongan darah, SAINTARA mengungkap profil kecerdasan unikmu dalam hitungan detik.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link href="/register"><Button variant="gold" size="xl" className="min-w-[220px] shadow-gold">Mulai Analisis Gratis<ArrowRight size={20} /></Button></Link>
          <Link href="#sample"><Button variant="ghost" size="xl" className="min-w-[220px] text-white border-2 border-white/30 hover:bg-white/10">Lihat Contoh Laporan</Button></Link>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-white/50 text-sm font-montserrat">
          <div className="flex -space-x-2">
            {['🧑‍💼', '👩‍🔬', '👨‍🎨', '👩‍💻', '🧑‍🏫'].map((emoji, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm">{emoji}</div>
            ))}
          </div>
          <span>Bergabung dengan <strong className="text-white">10,000+</strong> individu yang telah menemukan diri mereka</span>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
        <span className="text-xs font-montserrat">Scroll</span>
        <div className="w-px h-8 bg-white/20" />
      </div>
    </section>
  )
}
