'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { AssessmentResult } from '@/lib/algorithm'
import { getResult } from '@/lib/mock'
import ProfileBadge from '@/components/assessment/ProfileBadge'
import ResultCard from '@/components/assessment/ResultCard'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { Download, Share2, ArrowLeft, BarChart3, Hexagon, Check } from 'lucide-react'

const RadarChart = dynamic(() => import('@/components/charts/RadarChart'), { ssr: false })
const BarChart = dynamic(() => import('@/components/charts/BarChart'), { ssr: false })

export default function ResultPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPayModal, setShowPayModal] = useState(false)
  const [activeChart, setActiveChart] = useState<'radar' | 'bar'>('radar')

  useEffect(() => {
    const r = getResult(id)
    if (!r) { router.push('/assessment'); return }
    setResult(r)
    setLoading(false)
  }, [id, router])

  function handleShare() {
    const shareData = { title: `Profil SAINTARA — ${result?.characterType}`, text: `Saya menemukan profil kecerdasan saya di SAINTARA: ${result?.characterType}!`, url: window.location.href }
    if (navigator.share) navigator.share(shareData).catch(() => {})
    else { navigator.clipboard.writeText(window.location.href); alert('Link disalin!') }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><div className="w-7 h-7 border-2 border-ink border-t-transparent rounded-full animate-spin" /></div>
  }
  if (!result) return null

  const scoreLabels: Record<string, string> = { linguistik: 'Linguistik', logisMatematik: 'Logis-Mat.', spasial: 'Spasial', kinestetik: 'Kinestetik', musikal: 'Musikal', interpersonal: 'Interpers.' }

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="relative bg-ink px-5 sm:px-6 pt-7 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40 pointer-events-none" aria-hidden />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-56 bg-gold/[0.07] blur-[100px] rounded-full pointer-events-none" aria-hidden />
        <div className="relative flex items-center justify-between mb-8">
          <Link href="/dashboard">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-white/80 text-sm hover:bg-white/10 transition-colors">
              <ArrowLeft size={16} /> Dashboard
            </button>
          </Link>
          <div className="flex gap-2">
            <button onClick={handleShare} className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/80 hover:bg-white/10 transition-colors" aria-label="Bagikan"><Share2 size={17} /></button>
            <button onClick={() => setShowPayModal(true)} className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white text-ink text-sm font-semibold hover:bg-slate-100 transition-colors"><Download size={15} /> PDF</button>
          </div>
        </div>
        <div className="relative">
          <ProfileBadge characterType={result.characterType} dominantIntelligence={result.dominantIntelligence} size="lg" />
        </div>
      </div>

      {/* Chart */}
      <div className="px-5 sm:px-6 py-6 bg-white border-b border-border">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-lg text-primary tracking-tight">Profil kecerdasan</h2>
          <div className="flex gap-1 p-1 bg-surface border border-border rounded-xl">
            <button onClick={() => setActiveChart('radar')} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeChart === 'radar' ? 'bg-white text-primary shadow-sm' : 'text-muted'}`}><Hexagon size={12} /> Radar</button>
            <button onClick={() => setActiveChart('bar')} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeChart === 'bar' ? 'bg-white text-primary shadow-sm' : 'text-muted'}`}><BarChart3 size={12} /> Bar</button>
          </div>
        </div>
        {activeChart === 'radar' ? <RadarChart scores={result.intelligenceScores} /> : <BarChart scores={result.intelligenceScores} />}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {(Object.entries(result.intelligenceScores) as [string, number][]).map(([key, value]) => (
            <div key={key} className="bg-surface border border-border rounded-xl p-3 text-center">
              <p className="font-display font-bold text-primary text-lg tracking-tight">{value}</p>
              <p className="text-[10px] text-muted mt-0.5">{scoreLabels[key]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 sm:px-6 py-6"><ResultCard result={result} /></div>

      {/* Sticky CTA */}
      <div className="sticky bottom-16 md:bottom-0 px-5 sm:px-6 py-4 bg-white/90 backdrop-blur-xl border-t border-border">
        <Button variant="primary" size="lg" fullWidth onClick={() => setShowPayModal(true)}>
          <Download size={18} /> Download laporan PDF lengkap
        </Button>
      </div>

      <Modal isOpen={showPayModal} onClose={() => setShowPayModal(false)} title="Buka laporan lengkap">
        <p className="text-muted text-sm leading-relaxed mb-6">
          Dapatkan laporan PDF 20+ halaman dengan analisis mendalam, action plan 30 hari, dan insight karier premium.
        </p>
        <div className="rounded-2xl bg-surface border border-border p-5 mb-6">
          <div className="flex items-baseline justify-between mb-4">
            <span className="font-display font-bold text-3xl text-primary tracking-tight">Rp 199.000</span>
            <span className="text-xs text-muted">per laporan</span>
          </div>
          <ul className="space-y-2.5">
            {['PDF 20+ halaman', 'Action plan 30 hari', 'Analisis kepemimpinan', 'Insight relasi mendalam', 'Update tahunan'].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-primary">
                <span className="w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center shrink-0"><Check size={11} className="text-gold-dark" /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Button variant="primary" fullWidth size="lg" className="mb-2.5">Bayar Rp 199.000</Button>
        <button onClick={() => setShowPayModal(false)} className="w-full text-sm text-muted hover:text-primary transition-colors py-1">Nanti saja</button>
      </Modal>
    </div>
  )
}
