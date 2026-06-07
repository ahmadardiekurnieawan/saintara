import { Brain, BarChart2, FileText, Zap, Shield, Globe } from 'lucide-react'
import Card from '@/components/ui/Card'
const features = [
  { icon: Brain, title: 'AI Assessment', description: 'Algoritma proprietary yang menganalisis kecerdasan multidimensi berdasarkan data unik Anda.', color: '#C59830', bg: 'bg-gold/10' },
  { icon: BarChart2, title: 'Radar Chart Interaktif', description: 'Visualisasi 6 dimensi kecerdasan dalam chart yang indah dan mudah dipahami.', color: '#2563EB', bg: 'bg-ai-blue/10' },
  { icon: FileText, title: 'Laporan PDF Premium', description: 'Unduh laporan lengkap 20+ halaman dengan analisis mendalam dan rekomendasi personal.', color: '#0F172A', bg: 'bg-navy/10' },
  { icon: Zap, title: 'Action Plan Harian', description: '30 hari tantangan personal yang dirancang khusus untuk mengoptimalkan potensimu.', color: '#059669', bg: 'bg-emerald-50' },
  { icon: Shield, title: 'Data Privasi Terjamin', description: 'Data Anda dienkripsi dan tidak pernah dibagikan kepada pihak ketiga tanpa izin.', color: '#7C3AED', bg: 'bg-purple-50' },
  { icon: Globe, title: 'Tersedia 4 Bahasa', description: 'Indonesia, English, Mandarin, dan Arab. Laporan tersedia dalam bahasa pilihanmu.', color: '#0891B2', bg: 'bg-cyan-50' },
]
export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="badge-gold mb-4 inline-block">Fitur Unggulan</span>
          <h2 className="section-title mb-4">Semuanya dalam Satu Platform</h2>
          <p className="section-subtitle max-w-2xl mx-auto">SAINTARA dirancang untuk memberikan insight terdalam dengan pengalaman yang paling elegan.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <Card key={i} hover bordered className="group">
                <div className={`w-12 h-12 ${feature.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={22} style={{ color: feature.color }} />
                </div>
                <h3 className="font-cinzel font-bold text-lg text-primary mb-2">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed font-montserrat">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
