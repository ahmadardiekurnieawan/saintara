'use client'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ProductMockup from './ProductMockup'
import { ArrowRight, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
        <div className="absolute -top-32 -left-24 w-[36rem] h-[36rem] bg-gold/10 rounded-full blur-[120px] animate-aurora" />
        <div className="absolute top-1/3 -right-24 w-[34rem] h-[34rem] bg-ai-blue/10 rounded-full blur-[120px] animate-aurora" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 noise opacity-[0.035] mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink/40" />
      </div>

      <div className="relative max-w-container mx-auto px-5 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm text-white/75 text-xs font-montserrat tracking-wide mb-7 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Berbasis kerangka Multiple Intelligences
            </div>

            <h1 className="font-cinzel text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold text-white tracking-tight text-balance mb-6 animate-slide-up">
              Petakan{' '}
              <span className="gradient-text">kecerdasan unikmu</span>
              {' '}dengan jernih.
            </h1>

            <p className="text-white/65 text-lg sm:text-xl font-montserrat leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9 text-pretty animate-slide-up" style={{ animationDelay: '80ms' }}>
              SAINTARA menerjemahkan profil kecerdasan multidimensimu menjadi laporan personal yang elegan, mudah dipahami, dan dapat langsung kamu tindak lanjuti.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start items-center mb-10 animate-slide-up" style={{ animationDelay: '160ms' }}>
              <Link href="/register">
                <Button variant="gold" size="xl" className="min-w-[200px] shadow-gold group">
                  Mulai gratis
                  <ArrowRight size={19} className="transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link href="#sample">
                <Button variant="ghost" size="xl" className="min-w-[200px] text-white border border-white/20 hover:bg-white/[0.07] backdrop-blur-sm">
                  Lihat contoh laporan
                </Button>
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-5 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '240ms' }}>
              <div className="flex -space-x-2.5">
                {['🧑‍💼', '👩‍🔬', '👨‍🎨', '👩‍💻', '🧑‍🏫'].map((emoji, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-sm flex items-center justify-center text-sm">
                    {emoji}
                  </div>
                ))}
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-white/55 text-sm font-montserrat">
                  Dipercaya oleh ribuan individu &amp; tim
                </p>
              </div>
            </div>
          </div>

          {/* Product mockup */}
          <div className="relative animate-slide-up lg:pl-6" style={{ animationDelay: '120ms' }}>
            <ProductMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
