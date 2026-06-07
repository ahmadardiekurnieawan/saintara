import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full">
        {label && <label htmlFor={inputId} className="block text-sm font-semibold text-primary mb-2 font-montserrat">{label}</label>}
        <div className="relative">
          {leftIcon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">{leftIcon}</div>}
          <input ref={ref} id={inputId} className={cn('input-field', leftIcon && 'pl-11', rightIcon && 'pr-11', error && 'border-red-400 focus:ring-red-400', className)} {...props} />
          {rightIcon && <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">{rightIcon}</div>}
        </div>
        {error && <p className="mt-1.5 text-sm text-red-500 font-montserrat">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-xs text-muted font-montserrat">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
export default Input
