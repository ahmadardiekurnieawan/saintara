'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { AlertTriangle, User, Calendar, Droplets, ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

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
    await new Promise((r) => setTimeout(r, 500))
    router.push('/assessment/processing')
  }

  if (!draft) return null

  return (
    <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
      <div className="mb-6">
        <Link href="/assessment" className="inline-flex items-center gap-2 text-muted hover:text-primary text-sm font-montserrat mb-4"><ArrowLeft size={16} /> Kembali</Link>
        <h1 className="font-cinzel text-2xl font-bold text-primary mb-2">Konfirmasi Data</h1>
        <p className="text-muted text-sm font-montserrat">Periksa kembali data yang Anda masukkan sebelum memulai analisis.</p>
      </div>
      <div className="bg-white rounded-3xl shadow-card border border-border p-6 mb-5">
        <h3 className="font-cinzel font-bold text-base text-primary mb-5">Data Analisis</h3>
        <div className="space-y-4">
          {[{ icon: User, label: 'Nama Lengkap', value: draft.name, color: 'gold', bg: 'bg-gold/10' }, { icon: Calendar, label: 'Tanggal Lahir', value: formatDate(draft.birthDate), color: 'ai-blue', bg: 'bg-ai-blue/10' }, { icon: Droplets, label: 'Golongan Darah', value: draft.bloodType, color: 'red', bg: 'bg-red-50' }].map(({ icon: Icon, label, value, bg }, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-surface rounded-2xl">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}><Icon size={18} className="text-muted" /></div>
              <div><p className="text-xs text-muted font-montserrat mb-0.5">{label}</p><p className="font-bold text-primary font-montserrat">{value}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 font-montserrat text-sm mb-1">Perhatian Penting</p>
            <p className="text-amber-700 text-xs font-montserrat leading-relaxed">Data <strong>tidak dapat diedit</strong> setelah pemrosesan dimulai. Pastikan nama, tanggal lahir, dan golongan darah sesuai dengan dokumen resmi Anda.</p>
          </div>
        </div>
      </div>
      <Button variant="gold" size="xl" fullWidth loading={loading} onClick={handleConfirm} className="shadow-gold">Konfirmasi &amp; Mulai Analisis →</Button>
      <p className="text-xs text-muted text-center mt-4 font-montserrat">Dengan melanjutkan, Anda menyetujui bahwa data yang dimasukkan adalah benar.</p>
    </div>
  )
}
