import { characterIcon, characterEssence } from '@/lib/character'
import { cn } from '@/lib/utils'

interface ProfileBadgeProps {
  characterType: string
  dominantIntelligence: string
  size?: 'sm' | 'md' | 'lg'
}

export default function ProfileBadge({ characterType, dominantIntelligence, size = 'md' }: ProfileBadgeProps) {
  const Icon = characterIcon(characterType)
  const sizes = {
    sm: { tile: 'w-14 h-14', icon: 24, title: 'text-lg' },
    md: { tile: 'w-20 h-20', icon: 32, title: 'text-2xl' },
    lg: { tile: 'w-24 h-24', icon: 40, title: 'text-3xl' },
  }
  const s = sizes[size]

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className={cn('rounded-3xl flex items-center justify-center bg-white/[0.06] border border-white/12', s.tile)}>
        <Icon size={s.icon} className="text-gold" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50 mb-1.5">{characterEssence(characterType)}</p>
        <p className={cn('font-display font-bold text-white tracking-tight', s.title)}>{characterType}</p>
        <p className="text-sm text-white/55 mt-1.5">
          Kecerdasan dominan · <span className="font-semibold text-white/80">{dominantIntelligence}</span>
        </p>
      </div>
    </div>
  )
}
