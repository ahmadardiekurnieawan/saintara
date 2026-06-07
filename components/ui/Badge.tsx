import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'navy' | 'blue' | 'green' | 'red' | 'gray'
  size?: 'sm' | 'md'
}

export default function Badge({ className, variant = 'gold', size = 'md', children, ...props }: BadgeProps) {
  const variants = {
    gold: 'bg-gold/10 text-gold border border-gold/20',
    navy: 'bg-navy/10 text-navy border border-navy/20',
    blue: 'bg-ai-blue/10 text-ai-blue border border-ai-blue/20',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    red: 'bg-red-50 text-red-600 border border-red-200',
    gray: 'bg-surface text-muted border border-border',
  }
  const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-xs' }
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full font-semibold font-montserrat', variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  )
}
