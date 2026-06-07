'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Brain, FileText, User, Settings, LogOut, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Analisis Baru', href: '/assessment', icon: Brain },
  { label: 'Laporan Saya', href: '/dashboard', icon: FileText },
  { label: 'Profil', href: '/dashboard', icon: User },
  { label: 'Pengaturan', href: '/dashboard', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-border min-h-screen">
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-gold to-gold-light rounded-xl flex items-center justify-center shadow-gold">
            <span className="text-white font-cinzel font-bold text-sm">S</span>
          </div>
          <span className="font-cinzel font-bold text-lg text-primary">SAINTARA</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.label} href={item.href} className={cn('flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium font-montserrat transition-all duration-200', isActive ? 'bg-gold/10 text-gold' : 'text-muted hover:text-primary hover:bg-surface')}>
              <Icon size={18} strokeWidth={isActive ? 2.5 : 1.75} />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight size={14} />}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted hover:text-red-500 hover:bg-red-50 transition-all duration-200 w-full font-montserrat">
          <LogOut size={18} /><span>Keluar</span>
        </button>
      </div>
    </aside>
  )
}
