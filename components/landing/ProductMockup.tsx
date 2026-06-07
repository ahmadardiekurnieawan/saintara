import MiniRadar from './MiniRadar'
import { Sparkles, TrendingUp, ShieldCheck } from 'lucide-react'

/**
 * A realistic "app report" mockup used in the hero.
 * Built entirely with markup so it stays crisp at any resolution and on-brand.
 */
export default function ProductMockup() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      {/* Glow behind the card */}
      <div className="absolute -inset-6 bg-gold/10 blur-3xl rounded-[40px] pointer-events-none" aria-hidden />

      {/* Main report card */}
      <div className="relative rounded-3xl bg-white shadow-float border border-white/60 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-border bg-surface/70">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-[11px] font-montserrat text-muted tracking-wide">Laporan Kecerdasan</span>
        </div>

        <div className="p-6">
          {/* Profile header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0" style={{ backgroundColor: '#2563EB18', border: '2px solid #2563EB33' }}>
              🔭
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-montserrat uppercase tracking-widest text-muted">Tipe Karakter</p>
              <p className="font-cinzel font-bold text-lg text-primary leading-tight">Analis Strategis</p>
              <p className="text-xs font-montserrat text-ai-blue font-medium">Dominan · Logis-Matematis</p>
            </div>
          </div>

          {/* Radar */}
          <div className="rounded-2xl bg-surface/60 border border-border p-3 mb-5">
            <div className="aspect-square max-h-[200px] mx-auto">
              <MiniRadar scores={[72, 94, 81, 64, 58, 77]} size={220} />
            </div>
          </div>

          {/* Score chips */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Logis', value: 94 },
              { label: 'Spasial', value: 81 },
              { label: 'Interpers.', value: 77 },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-surface/70 border border-border py-2.5 text-center">
                <p className="font-cinzel font-bold text-primary text-base leading-none">{s.value}</p>
                <p className="text-[10px] text-muted font-montserrat mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating accent: insight chip */}
      <div className="absolute -left-6 sm:-left-10 top-24 hidden sm:flex items-center gap-2.5 rounded-2xl bg-white shadow-elevated border border-border px-3.5 py-2.5 animate-float">
        <span className="w-8 h-8 rounded-xl bg-gold/12 flex items-center justify-center">
          <TrendingUp size={15} className="text-gold" />
        </span>
        <div>
          <p className="text-[10px] font-montserrat text-muted leading-none mb-0.5">Potensi tertinggi</p>
          <p className="text-xs font-semibold font-montserrat text-primary leading-none">Berpikir Analitis</p>
        </div>
      </div>

      {/* Floating accent: status chip */}
      <div className="absolute -right-4 sm:-right-8 bottom-16 hidden sm:flex items-center gap-2.5 rounded-2xl bg-white shadow-elevated border border-border px-3.5 py-2.5 animate-float-slow">
        <span className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
          <ShieldCheck size={15} className="text-emerald-600" />
        </span>
        <div>
          <p className="text-[10px] font-montserrat text-muted leading-none mb-0.5">Laporan</p>
          <p className="text-xs font-semibold font-montserrat text-primary leading-none">Siap diunduh</p>
        </div>
      </div>

      {/* Floating accent: badge top-right */}
      <div className="absolute -right-3 -top-3 hidden md:flex items-center gap-1.5 rounded-full bg-gradient-gold text-white px-3 py-1.5 shadow-gold animate-float">
        <Sparkles size={12} />
        <span className="text-[11px] font-semibold font-montserrat">6 Dimensi</span>
      </div>
    </div>
  )
}
