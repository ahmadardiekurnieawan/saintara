import AssessmentForm from '@/components/assessment/AssessmentForm'
import AssessmentSteps from '@/components/assessment/AssessmentSteps'
import { ShieldCheck } from 'lucide-react'

export default function AssessmentPage() {
  return (
    <div className="flex-1 w-full max-w-lg mx-auto px-5 sm:px-6 py-8">
      <AssessmentSteps current={0} />

      <div className="mt-10 mb-8">
        <h1 className="font-display text-2xl font-bold text-primary tracking-tight mb-2">Mulai analisis</h1>
        <p className="text-muted text-[15px] leading-relaxed">
          Masukkan data diri sesuai dokumen resmi untuk memetakan profil kecerdasanmu.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-7">
        <AssessmentForm />
      </div>

      <p className="flex items-center justify-center gap-2 text-xs text-muted text-center mt-5">
        <ShieldCheck size={14} className="text-muted" />
        Data kamu aman &amp; tidak dibagikan ke pihak ketiga.
      </p>
    </div>
  )
}
