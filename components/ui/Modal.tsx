'use client'
import { useEffect, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null
  const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative bg-white rounded-2xl shadow-xl w-full animate-slide-up', sizes[size])}>
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h3 className="font-cinzel text-lg font-bold text-primary">{title}</h3>
            <button onClick={onClose} className="p-1.5 rounded-xl text-muted hover:text-primary hover:bg-surface transition-colors"><X size={18} /></button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
