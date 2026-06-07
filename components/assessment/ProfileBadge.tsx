import { cn } from '@/lib/utils'

interface ProfileBadgeProps {
  emoji: string
  characterType: string
  name: string
  color: string
  dominantIntelligence: string
  size?: 'sm' | 'md' | 'lg'
}

export default function ProfileBadge({ emoji, characterType, name, color, dominantIntelligence, size = 'md' }: ProfileBadgeProps) {
  const sizes = {
    sm: { emoji: 'text-3xl', circle: 'w-16 h-16', name: 'text-base', type: 'text-xs' },
    md: { emoji: 'text-5xl', circle: 'w-24 h-24', name: 'text-xl', type: 'text-sm' },
    lg: { emoji: 'text-6xl', circle: 'w-32 h-32', name: 'text-2xl', type: 'text-base' },
  }
  const s = sizes[size]
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className={cn('rounded-full flex items-center justify-center shadow-lg', s.circle)} style={{ backgroundColor: `${color}15`, border: `3px solid ${color}30` }}>
        <span className={s.emoji}>{emoji}</span>
      </div>
      <div>
        <p className={cn('font-cinzel font-bold text-white', s.name)}>{name}</p>
        <p className={cn('font-medium font-montserrat mt-0.5', s.type)} style={{ color: '#C59830' }}>{characterType}</p>
        <p className="text-xs text-white/60 font-montserrat mt-1">Kecerdasan Dominan: <span className="font-semibold text-white">{dominantIntelligence}</span></p>
      </div>
    </div>
  )
}
