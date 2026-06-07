import Link from 'next/link'
import { ShieldCheck, Sparkles, LineChart } from 'lucide-react'

const highlights = [
  { icon: LineChart, text: 'Profil kecerdasan 6 dimensi yang jernih' },
  { icon: Sparkles, text: 'Rekomendasi karier & action plan personal' },
  { icon: ShieldCheck, text: 'Privasi terjaga, data tidak dijual' },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-ink p-12 xl:p-16">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40 pointer-events-none" aria-hidden />
        <div className="absolute top-[-15%] left-1/3 w-[34rem] h-[28rem] bg-white/[0.05] blur-[130px] rounded-full pointer-events-none" aria-hidden />
        <div className="absolute bottom-[-10%] right-0 w-72 h-72 bg-gold/[0.07] blur-[110px] rounded-full pointer-events-none" aria-hidden />

        <Link href="/" className="relative flex items-center gap-2.5 w-fit">
          <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center">
            <span className="text-gold font-display font-bold text-sm">S</span>
          </div>
          <span className="font-display font-bold text-xl text-white tracking-tight">SAINTARA</span>
        </Link>

        <div className="relative max-w-md">
          <h2 className="font-display font-bold text-3xl xl:text-4xl text-white leading-[1.1] tracking-tight mb-8 text-balance">
            Pahami cara kerja pikiranmu—dalam hitungan menit.
          </h2>
          <ul className="space-y-4">
            {highlights.map((h) => {
              const Icon = h.icon
              return (
                <li key={h.text} className="flex items-center gap-3.5 text-white/70">
                  <span className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-gold" strokeWidth={1.75} />
                  </span>
                  <span className="text-[15px]">{h.text}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <p className="relative text-white/35 text-xs">© 2026 SAINTARA. All rights reserved.</p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col">
        <div className="lg:hidden px-6 py-5 border-b border-border">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
              <span className="text-gold font-display font-bold text-sm">S</span>
            </div>
            <span className="font-display font-bold text-lg text-primary tracking-tight">SAINTARA</span>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8">{children}</div>
      </div>
    </div>
  )
}
