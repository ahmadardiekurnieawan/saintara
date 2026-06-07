import Link from 'next/link'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-hero px-6 sm:px-12 py-16 lg:py-20 text-center">
            <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50 pointer-events-none" aria-hidden />
            <div className="absolute -top-20 left-1/4 w-80 h-80 bg-gold/10 blur-[100px] rounded-full pointer-events-none" aria-hidden />
            <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-ai-blue/10 blur-[100px] rounded-full pointer-events-none" aria-hidden />

            <div className="relative max-w-2xl mx-auto">
              <span className="eyebrow mb-5">Mulai Hari Ini</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight text-balance mb-5">
                Siap menemukan{' '}
                <span className="gradient-text">versi terbaik dirimu?</span>
              </h2>
              <p className="text-white/60 text-lg font-montserrat max-w-xl mx-auto mb-10 text-pretty">
                Buat laporan kecerdasan personalmu sekarang. Gratis untuk memulai, tanpa kartu kredit.
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                <Link href="/register">
                  <Button variant="gold" size="xl" className="shadow-gold min-w-[200px] group">
                    Mulai gratis
                    <ArrowRight size={19} className="transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="ghost" size="xl" className="text-white border border-white/20 hover:bg-white/[0.07] min-w-[180px] backdrop-blur-sm">
                    Sudah punya akun?
                  </Button>
                </Link>
              </div>
              <p className="text-white/35 text-sm font-montserrat mt-8">
                Tanpa kartu kredit · Analisis dasar gratis · Garansi 7 hari
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
