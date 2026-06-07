'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'

interface NavbarProps { transparent?: boolean }

export default function Navbar({ transparent = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 ${transparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md border-b border-border'}`}>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center">
              <span className="text-white font-cinzel font-bold text-sm">S</span>
            </div>
            <span className={`font-cinzel font-bold text-lg ${transparent ? 'text-white' : 'text-primary'}`}>SAINTARA</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {[{ label: 'Fitur', href: '#features' }, { label: 'Cara Kerja', href: '#how-it-works' }, { label: 'Harga', href: '#pricing' }, { label: 'FAQ', href: '#faq' }].map((item) => (
              <Link key={item.href} href={item.href} className={`text-sm font-medium font-montserrat transition-colors ${transparent ? 'text-white/80 hover:text-white' : 'text-muted hover:text-primary'}`}>{item.label}</Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login"><Button variant="ghost" size="sm" className={transparent ? 'text-white hover:bg-white/10' : ''}>Masuk</Button></Link>
            <Link href="/register"><Button variant="gold" size="sm">Mulai Gratis</Button></Link>
          </div>
          <button className={`md:hidden p-2 rounded-xl ${transparent ? 'text-white' : 'text-primary'}`} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {[{ label: 'Fitur', href: '#features' }, { label: 'Cara Kerja', href: '#how-it-works' }, { label: 'Harga', href: '#pricing' }, { label: 'FAQ', href: '#faq' }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-primary hover:bg-surface rounded-xl font-montserrat">{item.label}</Link>
            ))}
            <div className="pt-3 border-t border-border flex gap-3">
              <Link href="/login" className="flex-1"><Button variant="outline" size="sm" fullWidth>Masuk</Button></Link>
              <Link href="/register" className="flex-1"><Button variant="gold" size="sm" fullWidth>Mulai Gratis</Button></Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
