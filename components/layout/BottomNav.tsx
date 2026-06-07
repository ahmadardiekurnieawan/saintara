'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Sparkles, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Analisis', href: '/assessment', icon: Sparkles },
  { label: 'Akun', href: '/dashboard', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-xl border-t border-border">
      <div className="flex items-stretch">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-colors min-h-[58px]',
                isActive ? 'text-primary' : 'text-muted'
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2.25 : 1.75} />
              <span className={cn('text-[10px]', isActive && 'font-semibold')}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
