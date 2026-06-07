import Link from 'next/link'
export default function Footer() {
  return (
    <footer className="bg-primary text-white/60 py-12">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center">
                <span className="text-white font-cinzel font-bold text-sm">S</span>
              </div>
              <span className="font-cinzel font-bold text-xl text-white">SAINTARA</span>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-xs font-montserrat">Platform penilaian kecerdasan manusia berbasis AI. Kenali potensi terdalammu.</p>
            <p className="text-xs font-montserrat">© 2024 SAINTARA. All rights reserved.</p>
          </div>
          <div>
            <h4 className="font-cinzel font-bold text-white text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm font-montserrat">
              {['Fitur', 'Harga', 'Cara Kerja', 'FAQ', 'Blog'].map((item) => <li key={item}><Link href="#" className="hover:text-gold transition-colors">{item}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-cinzel font-bold text-white text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm font-montserrat">
              {['Kebijakan Privasi', 'Syarat & Ketentuan', 'Hubungi Kami'].map((item) => <li key={item}><Link href="#" className="hover:text-gold transition-colors">{item}</Link></li>)}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-montserrat">Dibuat dengan ❤️ di Indonesia</p>
          <div className="flex items-center gap-4 text-xs font-montserrat">
            {['Instagram', 'LinkedIn', 'Twitter'].map((s) => <Link key={s} href="#" className="hover:text-gold transition-colors">{s}</Link>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
