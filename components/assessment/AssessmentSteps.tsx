import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = ['Input', 'Konfirmasi', 'Proses', 'Hasil']

export default function AssessmentSteps({ current }: { current: number }) {
  return (
    <div className="flex items-center">
      {STEPS.map((step, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                  done && 'bg-ink text-white',
                  active && 'bg-ink text-white ring-4 ring-ink/10',
                  !done && !active && 'bg-white border border-border text-muted'
                )}
              >
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span className={cn('text-[11px] font-medium', active || done ? 'text-primary' : 'text-muted')}>{step}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn('flex-1 h-px mx-2 mb-5', done ? 'bg-ink' : 'bg-border')} style={{ minWidth: 16 }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
