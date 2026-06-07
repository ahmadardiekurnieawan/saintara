import { ClipboardList, Cpu, FileText } from 'lucide-react'
const steps = [
  { step: '01', icon: ClipboardList, title: 'Input Data', description: 'Masukkan nama lengkap, tanggal lahir, dan golongan darahmu. Hanya membutuhkan 2 menit.', color: '#C59830' },
  { step: '02', icon: Cpu, title: 'Analisis AI', description: 'Algoritma kami memproses data secara real-time, menganalisis 6 dimensi kecerdasan berdasarkan pola unikmu.', color: '#2563EB' },
  { step: '03', icon: FileText, title: 'Terima Laporan', description: 'Laporan komprehensif siap dalam hitungan detik. Visualisasikan profil kecerdasan dan mulai action plan personalmu.', color: '#0F172A' },
]
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-surface">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="badge-blue mb-4 inline-block">Cara Kerja</span>
          <h2 className="section-title mb-4">Tiga Langkah Sederhana</h2>
          <p className="section-subtitle max-w-2xl mx-auto">Dari input data hingga laporan lengkap, semua selesai dalam hitungan menit.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="flex flex-col items-center text-center relative">
                <div className="relative z-10 mb-5">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-card mb-3 mx-auto" style={{ backgroundColor: `${step.color}15`, border: `2px solid ${step.color}25` }}>
                    <Icon size={30} style={{ color: step.color }} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-montserrat text-white shadow-sm" style={{ backgroundColor: step.color }}>{step.step}</div>
                </div>
                <h3 className="font-cinzel font-bold text-xl text-primary mb-3">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed font-montserrat">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
