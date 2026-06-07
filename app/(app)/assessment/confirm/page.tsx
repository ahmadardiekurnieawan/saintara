'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import AssessmentSteps from '@/components/assessment/AssessmentSteps'
import { User, Calendar, Droplet, ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface DraftData { name: string; birthDate: string; bloodType: string }

export default function ConfirmPage() {
  const router = useRouter()
  const [draft, setDraft] = useState<DraftData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('assessment_draft')
    if (!stored) { router.push('/assessment'); return }
    setDraft(JSON.parse(stored))
  }, [router])

  async function handleConfirm() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    router.push('/assessment/processing')
  }

  if (!draft) return null

  const rows = [
    { icon: User, label: 'Nama Lengkap', value: draft.name },
    { icon: Calendar, label: 'Tanggal Lahir', value: formatDate(draft.birthDate) },
    { icon: Droplet, label: 'Golongan Darah', value: draft.bloodType },
  ]

  return (
    <div className="flex-1 w-full max-w-lg mx-auto px-5 sm:px-6 py-8">
      <AssessmentSteps current={1} />

      <div className="mt-10 mb-7">
        <Link href="/assessment" className="inline-flex items-center gap-1.5 text-muted hover:text-primary text-sm mb-4 transition-colors">
          <ArrowLeft size={15} /> Kembali
        </Link>
        <h1 className="font-display text-2xl font-bold text-primary tracking-tight mb-2">Konfirmasi data</h1>
        <p className="text-muted text-[15px]">Periksa kembali data kamu sebelum memulai analisis.</p>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-soft p-2 mb-5">
        {rows.map(({ icon: Icon, label, value }, i) => (
          <div key={label} className={`flex items-center gap-4 p-4 ${i < rows.length - 1 ? 'border-b border-border' : ''}`}>
            <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
              <Icon size={17} className="text-primary" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">{label}</p>
              <p className="font-semibold text-primary">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-2xl bg-amber-50 border border-amber-200/70 p-4 mb-6">
        <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-amber-800 text-xs leading-relaxed">
          Data <strong>tidak dapat diedit</strong> setelah pemrosesan dimulai. Pastikan nama, tanggal lahir, dan golongan darah sudah benar.
        </p>
      </div>

      <Button variant="primary" size="xl" fullWidth loading={loading} onClick={handleConfirm} className="group">
        Konfirmasi &amp; mulai analisis
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
      </Button>
    </div>
  )
}
