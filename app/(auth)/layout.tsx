import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="py-5 px-6 border-b border-border bg-white">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center">
            <span className="text-white font-cinzel font-bold text-sm">S</span>
          </div>
          <span className="font-cinzel font-bold text-lg text-primary">SAINTARA</span>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">{children}</div>
      <div className="py-4 text-center text-xs text-muted font-montserrat">
        © 2024 SAINTARA · <Link href="#" className="hover:text-primary">Privasi</Link> · <Link href="#" className="hover:text-primary">Syarat</Link>
      </div>
    </div>
  )
}
