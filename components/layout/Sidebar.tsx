'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { LayoutDashboard, Sparkles, LogOut, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Analisis Baru', href: '/assessment', icon: Sparkles },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const name = session?.user?.name || 'Pengguna'
  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-border min-h-screen sticky top-0">
      <div className="p-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
            <span className="text-gold font-display font-bold text-sm">S</span>
          </div>
          <span className="font-display font-bold text-lg text-primary tracking-tight">SAINTARA</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive ? 'bg-surface text-primary' : 'text-muted hover:text-primary hover:bg-surface/70'
              )}
            >
              <Icon size={18} strokeWidth={isActive ? 2.25 : 1.75} className={isActive ? 'text-primary' : ''} />
              <span>{item.label}</span>
            </Link>
          )
        })}

        {/* Upgrade promo */}
        <div className="mt-4 mx-1 rounded-2xl bg-ink p-4 overflow-hidden relative">
          <div className="absolute -bottom-8 -right-6 w-24 h-24 bg-gold/10 blur-2xl rounded-full" aria-hidden />
          <p className="relative text-white font-display font-semibold text-sm tracking-tight mb-1">Buka Premium</p>
          <p className="relative text-white/55 text-xs leading-relaxed mb-3">Laporan PDF & action plan 30 hari penuh.</p>
          <Link href="/assessment" className="relative inline-flex items-center gap-1 text-xs font-semibold text-gold hover:gap-1.5 transition-all">
            Mulai analisis <ArrowUpRight size={13} />
          </Link>
        </div>
      </nav>

      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2 mb-1">
          <span className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-semibold text-primary shrink-0">{initials}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary truncate">{name}</p>
            <p className="text-xs text-muted truncate">{session?.user?.email || '—'}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
        >
          <LogOut size={18} strokeWidth={1.75} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  )
}
