'use client'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ProductMockup from './ProductMockup'
import { ArrowRight, Star } from 'lucide-react'

const avatars = ['AP', 'RM', 'SW', 'DK', 'NF']

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Ambient background — clean, mostly monochrome */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] bg-white/[0.05] rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-[-10%] w-[28rem] h-[28rem] bg-gold/[0.06] rounded-full blur-[130px] animate-aurora" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative max-w-container mx-auto px-5 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-12 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-xs font-medium tracking-wide mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Berbasis kerangka Multiple Intelligences
            </div>

            <h1 className="font-display text-[2.6rem] leading-[1.04] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold text-white tracking-tight text-balance mb-6 animate-slide-up">
              Pahami cara kerja pikiranmu.
            </h1>

            <p className="text-white/60 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9 text-pretty animate-slide-up" style={{ animationDelay: '80ms' }}>
              SAINTARA memetakan profil kecerdasan multidimensimu menjadi laporan personal yang jernih, terukur, dan dapat langsung kamu tindak lanjuti.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center mb-12 animate-slide-up" style={{ animationDelay: '160ms' }}>
              <Link href="/register">
                <Button variant="light" size="xl" className="min-w-[190px] group">
                  Mulai gratis
                  <ArrowRight size={19} className="transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link href="#sample">
                <Button variant="ghost" size="xl" className="min-w-[190px] text-white border border-white/15 hover:bg-white/[0.06]">
                  Lihat contoh laporan
                </Button>
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '240ms' }}>
              <div className="flex -space-x-2.5">
                {avatars.map((a) => (
                  <div key={a} className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[10px] font-semibold text-white/80">
                    {a}
                  </div>
                ))}
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-gold fill-gold" />
                  ))}
                  <span className="ml-1.5 text-white/80 text-sm font-semibold">4.9</span>
                </div>
                <p className="text-white/50 text-sm">Dipercaya individu &amp; tim lintas industri</p>
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
