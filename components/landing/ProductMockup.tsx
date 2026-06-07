import MiniRadar from './MiniRadar'
import { Target, ArrowUpRight, Check } from 'lucide-react'

/**
 * A realistic "app report" mockup used in the hero.
 * Built entirely with markup so it stays crisp at any resolution and on-brand.
 */
export default function ProductMockup() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      {/* Soft neutral glow behind the card */}
      <div className="absolute -inset-8 bg-white/[0.04] blur-3xl rounded-[40px] pointer-events-none" aria-hidden />

      {/* Main report card */}
      <div className="relative rounded-3xl bg-white shadow-float border border-white/10 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-border bg-surface/70">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="ml-3 text-[11px] font-medium text-muted tracking-wide">saintara.id/laporan</span>
        </div>

        <div className="p-6">
          {/* Profile header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-ink">
              <Target size={20} className="text-gold" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">Tipe Karakter</p>
              <p className="font-display font-bold text-lg text-primary leading-tight tracking-tight">Analis Strategis</p>
              <p className="text-xs text-muted font-medium">Dominan · Logis-Matematis</p>
            </div>
          </div>

          {/* Radar */}
          <div className="rounded-2xl bg-surface border border-border p-3 mb-5">
            <div className="aspect-square max-h-[200px] mx-auto">
              <MiniRadar scores={[88, 52, 74, 41, 63, 92]} size={220} />
            </div>
          </div>

          {/* Score chips */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Interpers.', value: 92 },
              { label: 'Logis', value: 88 },
              { label: 'Spasial', value: 74 },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-surface border border-border py-2.5 text-center">
                <p className="font-display font-bold text-primary text-base leading-none">{s.value}</p>
                <p className="text-[10px] text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating accent: insight chip (bottom-left, clear of the card header) */}
      <div className="absolute -left-5 sm:-left-9 bottom-20 hidden sm:flex items-center gap-2.5 rounded-2xl bg-white shadow-elevated border border-border px-3.5 py-2.5 animate-float">
        <span className="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center">
          <ArrowUpRight size={15} className="text-gold-dark" />
        </span>
        <div>
          <p className="text-[10px] text-muted leading-none mb-1">Potensi tertinggi</p>
          <p className="text-xs font-semibold text-primary leading-none">Berpikir Analitis</p>
        </div>
      </div>

      {/* Floating accent: status chip (bottom-right) */}
      <div className="absolute -right-4 sm:-right-7 -bottom-4 hidden sm:flex items-center gap-2.5 rounded-2xl bg-ink shadow-elevated px-3.5 py-2.5 animate-float-slow">
        <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
          <Check size={14} className="text-white" />
        </span>
        <div>
          <p className="text-[10px] text-white/50 leading-none mb-1">Laporan</p>
          <p className="text-xs font-semibold text-white leading-none">Siap diunduh</p>
        </div>
      </div>
    </div>
  )
}
