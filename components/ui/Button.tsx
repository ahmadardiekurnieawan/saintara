'use client'
import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, fullWidth, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold font-montserrat rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2'
    const variants = {
      primary: 'bg-primary text-white hover:bg-navy focus:ring-primary shadow-sm',
      gold: 'bg-gold text-white hover:bg-gold-light focus:ring-gold shadow-sm hover:shadow-gold',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary bg-transparent',
      ghost: 'text-primary hover:bg-surface focus:ring-primary bg-transparent',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    }
    const sizes = { sm: 'px-4 py-2 text-sm gap-1.5', md: 'px-5 py-2.5 text-sm gap-2', lg: 'px-6 py-3 text-base gap-2', xl: 'px-8 py-4 text-lg gap-2.5' }
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)} disabled={disabled || loading} {...props}>
        {loading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'xl' ? 20 : 16} />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
