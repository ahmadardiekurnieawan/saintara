import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  bordered?: boolean
  padded?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, bordered = false, padded = true, children, ...props }, ref) => (
    <div ref={ref} className={cn('bg-white rounded-2xl shadow-card', padded && 'p-6', hover && 'hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer', bordered && 'border border-border', className)} {...props}>
      {children}
    </div>
  )
)
Card.displayName = 'Card'
export default Card
