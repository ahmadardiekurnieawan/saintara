import AssessmentForm from '@/components/assessment/AssessmentForm'
import { Brain } from 'lucide-react'

const steps = ['Input Data', 'Konfirmasi', 'Proses', 'Hasil']

export default function AssessmentPage() {
  return (
    <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-montserrat transition-all ${i === 0 ? 'bg-gold text-white shadow-gold' : 'bg-surface border-2 border-border text-muted'}`}>
                  {i + 1}
                </div>
                <span className={`text-[10px] mt-1 font-montserrat font-medium ${i === 0 ? 'text-gold' : 'text-muted'}`}>{step}</span>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-px mx-2 mb-4 ${i < 0 ? 'bg-gold' : 'bg-border'}`} style={{ minWidth: 20 }} />}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-gradient-hero rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Brain size={28} className="text-white" />
        </div>
        <h1 className="font-cinzel text-2xl font-bold text-primary mb-2">Mulai Analisis</h1>
        <p className="text-muted text-sm font-montserrat leading-relaxed max-w-xs mx-auto">Masukkan data diri sesuai dokumen resmi untuk menganalisis profil kecerdasanmu.</p>
      </div>
      <div className="bg-white rounded-3xl shadow-card border border-border p-6">
        <AssessmentForm />
      </div>
      <p className="text-xs text-muted text-center mt-5 font-montserrat">🔒 Data Anda dienkripsi dan aman. Kami tidak membagikan informasi kepada pihak ketiga.</p>
    </div>
  )
}
