'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { runAssessment } from '@/lib/algorithm'
import { saveResult } from '@/lib/mock'

const MESSAGES = [
  'Menganalisis pola karakter…',
  'Memproses dimensi kecerdasan…',
  'Menyusun profil kepribadian…',
  'Mengidentifikasi potensi terpendam…',
  'Menyesuaikan rekomendasi karier…',
  'Merancang action plan personal…',
  'Finalisasi laporan…',
]

export default function ProcessingPage() {
  const router = useRouter()
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const msgInterval = setInterval(() => setMessageIndex((prev) => (prev + 1) % MESSAGES.length), 650)
    const progressInterval = setInterval(() => setProgress((prev) => (prev >= 100 ? 100 : prev + Math.random() * 8 + 3)), 250)

    const run = async () => {
      const stored = sessionStorage.getItem('assessment_draft')
      if (!stored) { router.push('/assessment'); return }
      const draft = JSON.parse(stored)
      const result = runAssessment({ name: draft.name, birthDate: draft.birthDate, bloodType: draft.bloodType })
      saveResult(result, draft.name)
      await new Promise((r) => setTimeout(r, 3400))
      router.push(`/assessment/result/${result.id}`)
    }
    run()

    return () => { clearInterval(msgInterval); clearInterval(progressInterval) }
  }, [router])

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-ink relative overflow-hidden">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40 pointer-events-none" aria-hidden />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[30rem] h-[24rem] bg-gold/[0.06] blur-[120px] rounded-full pointer-events-none" aria-hidden />

      <div className="relative text-center px-8 max-w-sm mx-auto">
        <div className="relative mx-auto mb-9 w-24 h-24">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" style={{ animationDuration: '1.1s' }} />
          <div className="absolute inset-4 rounded-full border border-white/10 flex items-center justify-center">
            <span className="font-display font-bold text-xl text-white tabular-nums">{Math.min(Math.round(progress), 99)}%</span>
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold text-white tracking-tight mb-2">Menganalisis</h2>
        <p className="text-white/45 text-sm mb-8">Mohon tunggu sebentar…</p>

        <div className="bg-white/10 rounded-full h-1.5 mb-4 overflow-hidden">
          <div className="h-full bg-gold rounded-full transition-all duration-500" style={{ width: `${Math.min(progress, 96)}%` }} />
        </div>
        <p className="text-white/70 text-sm h-5">{MESSAGES[messageIndex]}</p>
      </div>
    </div>
  )
}
