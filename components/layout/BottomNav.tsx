'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Brain, FileText, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Beranda', href: '/dashboard', icon: Home },
  { label: 'Analisis', href: '/assessment', icon: Brain },
  { label: 'Laporan', href: '/dashboard', icon: FileText },
  { label: 'Profil', href: '/dashboard', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-border">
      <div className="flex items-stretch">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link key={item.label} href={item.href} className={cn('flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium font-montserrat transition-colors min-h-[56px]', isActive ? 'text-gold' : 'text-muted hover:text-primary')}>
              <div className={cn('p-1.5 rounded-xl transition-colors', isActive && 'bg-gold/10')}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.75} />
              </div>
              <span className={cn('text-[10px]', isActive && 'font-semibold')}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
