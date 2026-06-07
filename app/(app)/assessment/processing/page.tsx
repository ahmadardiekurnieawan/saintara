'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { runAssessment } from '@/lib/algorithm'

const MESSAGES = ['Menganalisis pola karakter...', 'Memproses kecerdasan alami...', 'Menyusun profil kepribadian...', 'Menghitung dimensi kecerdasan...', 'Mengidentifikasi potensi terpendam...', 'Menyesuaikan rekomendasi karier...', 'Merancang action plan personal...', 'Finalisasi laporan...']

export default function ProcessingPage() {
  const router = useRouter()
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const msgInterval = setInterval(() => setMessageIndex((prev) => (prev + 1) % MESSAGES.length), 600)
    const progressInterval = setInterval(() => setProgress((prev) => prev >= 100 ? 100 : prev + Math.random() * 8 + 3), 250)

    const run = async () => {
      const stored = sessionStorage.getItem('assessment_draft')
      if (!stored) { router.push('/assessment'); return }
      const draft = JSON.parse(stored)
      const result = runAssessment({ name: draft.name, birthDate: draft.birthDate, bloodType: draft.bloodType })
      sessionStorage.setItem(`result_${result.id}`, JSON.stringify(result))
      const history = JSON.parse(sessionStorage.getItem('completed_assessments') || '[]')
      history.unshift({ id: result.id, name: draft.name, characterType: result.characterType, profileEmoji: result.profileEmoji, profileColor: result.profileColor, createdAt: new Date().toISOString() })
      sessionStorage.setItem('completed_assessments', JSON.stringify(history.slice(0, 10)))
      await new Promise((r) => setTimeout(r, 3500))
      router.push(`/assessment/result/${result.id}`)
    }
    run()

    return () => { clearInterval(msgInterval); clearInterval(progressInterval) }
  }, [router])

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-hero">
      <div className="text-center px-8 max-w-sm mx-auto">
        <div className="relative mx-auto mb-8 w-28 h-28">
          <div className="absolute inset-0 rounded-full border-4 border-gold/20 animate-spin-slow" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold animate-spin" style={{ animationDuration: '1.5s' }} />
          <div className="absolute inset-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"><span className="text-3xl">🧠</span></div>
        </div>
        <h2 className="font-cinzel text-2xl font-bold text-white mb-2">Menganalisis</h2>
        <p className="text-white/60 text-sm font-montserrat mb-8">Mohon tunggu sebentar...</p>
        <div className="bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
          <div className="h-full bg-gradient-gold rounded-full transition-all duration-500" style={{ width: `${Math.min(progress, 95)}%` }} />
        </div>
        <p className="text-gold text-sm font-montserrat font-medium h-5">{MESSAGES[messageIndex]}</p>
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => <div key={i} className="w-2 h-2 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
        </div>
      </div>
    </div>
  )
}
