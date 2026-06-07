import Link from 'next/link'

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Fitur', href: '#features' },
      { label: 'Cara Kerja', href: '#how-it-works' },
      { label: 'Contoh Laporan', href: '#sample' },
      { label: 'Harga', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { label: 'Tentang', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Karier', href: '#' },
      { label: 'Hubungi Kami', href: '#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Kebijakan Privasi', href: '#' },
      { label: 'Syarat & Ketentuan', href: '#' },
      { label: 'Keamanan Data', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white/55 pt-16 pb-10 border-t border-white/[0.06]">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-gold rounded-xl flex items-center justify-center shadow-gold">
                <span className="text-white font-cinzel font-bold text-sm">S</span>
              </div>
              <span className="font-cinzel font-bold text-xl text-white">SAINTARA</span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs font-montserrat text-white/50">
              Petakan profil kecerdasan multidimensimu ke dalam laporan personal yang jernih dan dapat ditindaklanjuti.
            </p>
            <div className="flex items-center gap-3">
              {['Instagram', 'LinkedIn', 'X'].map((s) => (
                <Link
                  key={s}
                  href="#"
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-montserrat text-white/60 hover:text-gold hover:border-gold/30 transition-colors"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-montserrat font-semibold text-white text-xs uppercase tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-2.5 text-sm font-montserrat">
                {col.links.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-white/55 hover:text-gold transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-montserrat text-white/40">© 2026 SAINTARA. All rights reserved.</p>
          <p className="text-xs font-montserrat text-white/40">Dibuat dengan ❤️ di Indonesia</p>
        </div>
      </div>
    </footer>
  )
}
