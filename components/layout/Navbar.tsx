'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface NavbarProps { transparent?: boolean }

const navLinks = [
  { label: 'Fitur', href: '#features' },
  { label: 'Cara Kerja', href: '#how-it-works' },
  { label: 'Contoh', href: '#sample' },
  { label: 'Harga', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar({ transparent = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // "Light mode" navbar = solid white bar with dark text
  const solid = scrolled || !transparent || menuOpen

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        solid ? 'bg-white/85 backdrop-blur-xl border-b border-border shadow-soft' : 'bg-transparent'
      )}
    >
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <div className={cn('flex items-center justify-between transition-all duration-300', scrolled ? 'h-14' : 'h-16')}>
          <Link href="/" className="flex items-center gap-2.5">
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center border transition-colors', solid ? 'bg-ink border-ink' : 'bg-white/[0.06] border-white/15')}>
              <span className="text-gold font-display font-bold text-sm">S</span>
            </div>
            <span className={cn('font-display font-bold text-lg tracking-tight transition-colors', solid ? 'text-primary' : 'text-white')}>
              SAINTARA
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium font-montserrat transition-colors',
                  solid ? 'text-muted hover:text-primary' : 'text-white/75 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2.5">
            <Link href="/login">
              <Button variant="ghost" size="sm" className={solid ? '' : 'text-white hover:bg-white/10'}>
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button variant={solid ? 'primary' : 'light'} size="sm">Mulai gratis</Button>
            </Link>
          </div>

          <button
            className={cn('md:hidden p-2 rounded-xl transition-colors', solid ? 'text-primary' : 'text-white')}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-primary hover:bg-surface rounded-xl font-montserrat"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border flex gap-3">
              <Link href="/login" className="flex-1" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" size="sm" fullWidth>Masuk</Button>
              </Link>
              <Link href="/register" className="flex-1" onClick={() => setMenuOpen(false)}>
                <Button variant="primary" size="sm" fullWidth>Mulai gratis</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
