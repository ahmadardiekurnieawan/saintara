'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AssessmentResult } from '@/lib/algorithm'
import ProfileBadge from '@/components/assessment/ProfileBadge'
import ResultCard from '@/components/assessment/ResultCard'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import dynamic from 'next/dynamic'
import { Download, Share2, Home, BarChart2 } from 'lucide-react'
import Link from 'next/link'

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
    const stored = sessionStorage.getItem(`result_${id}`)
    if (!stored) { router.push('/assessment'); return }
    setResult(JSON.parse(stored))
    setLoading(false)
  }, [id, router])

  function handleShare() {
    if (navigator.share) navigator.share({ title: `Profil SAINTARA - ${result?.characterType}`, text: `Saya menemukan profil kecerdasan saya di SAINTARA: ${result?.characterType}!`, url: window.location.href })
    else { navigator.clipboard.writeText(window.location.href); alert('Link disalin!') }
  }

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" /></div>
  if (!result) return null

  const scoreLabels: Record<string, string> = { linguistik: 'Linguistik', logisMatematik: 'Logis-Mat.', spasial: 'Spasial', kinestetik: 'Kinestetik', musikal: 'Musikal', interpersonal: 'Interpers.' }

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full">
      <div className="bg-gradient-hero px-5 pt-8 pb-10 relative overflow-hidden">
        <div className="relative flex justify-between items-center mb-6">
          <Link href="/dashboard"><button className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20"><Home size={18} /></button></Link>
          <div className="flex gap-2">
            <button onClick={handleShare} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20"><Share2 size={18} /></button>
            <button onClick={() => setShowPayModal(true)} className="px-4 py-2 rounded-xl bg-gold text-white text-sm font-semibold font-montserrat flex items-center gap-2"><Download size={15} />PDF</button>
          </div>
        </div>
        <ProfileBadge emoji={result.profileEmoji} characterType={result.characterType} name="Profil Kecerdasan" color={result.profileColor} dominantIntelligence={result.dominantIntelligence} size="lg" />
      </div>

      <div className="px-5 py-6 bg-white border-b border-border">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-cinzel font-bold text-lg text-primary">Profil Kecerdasan</h2>
          <div className="flex gap-1 p-1 bg-surface rounded-xl">
            <button onClick={() => setActiveChart('radar')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-montserrat transition-all ${activeChart === 'radar' ? 'bg-white text-primary shadow-sm' : 'text-muted'}`}>Radar</button>
            <button onClick={() => setActiveChart('bar')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-montserrat transition-all ${activeChart === 'bar' ? 'bg-white text-primary shadow-sm' : 'text-muted'}`}><BarChart2 size={12} className="inline mr-1" />Bar</button>
          </div>
        </div>
        {activeChart === 'radar' ? <RadarChart scores={result.intelligenceScores} /> : <BarChart scores={result.intelligenceScores} />}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {(Object.entries(result.intelligenceScores) as [string, number][]).map(([key, value]) => (
            <div key={key} className="bg-surface rounded-xl p-3 text-center">
              <p className="font-cinzel font-bold text-primary text-lg">{value}</p>
              <p className="text-[10px] text-muted font-montserrat mt-0.5">{scoreLabels[key]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-6"><ResultCard result={result} /></div>

      <div className="sticky bottom-16 md:bottom-0 px-5 py-4 bg-white/95 backdrop-blur-md border-t border-border">
        <Button variant="gold" size="lg" fullWidth onClick={() => setShowPayModal(true)} className="shadow-gold"><Download size={18} />Download Laporan PDF Lengkap</Button>
      </div>

      <Modal isOpen={showPayModal} onClose={() => setShowPayModal(false)} title="Unlock Laporan Lengkap">
        <div className="text-center">
          <div className="text-5xl mb-4">🔓</div>
          <h3 className="font-cinzel font-bold text-lg text-primary mb-2">Laporan PDF Premium</h3>
          <p className="text-muted text-sm font-montserrat mb-6 leading-relaxed">Dapatkan laporan 20+ halaman dengan analisis mendalam, action plan 30 hari, dan insight karier premium.</p>
          <div className="bg-surface rounded-2xl p-5 mb-6 text-left">
            <div className="flex items-center justify-between mb-4">
              <span className="font-cinzel font-bold text-2xl text-gold">Rp 199.000</span>
              <span className="text-xs text-muted font-montserrat">per laporan</span>
            </div>
            <ul className="space-y-2">
              {['PDF 20+ halaman', 'Action Plan 30 hari', 'Analisis kepemimpinan', 'Insight relasi mendalam', 'Update tahunan'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-montserrat text-primary"><span className="text-gold">✓</span> {item}</li>
              ))}
            </ul>
          </div>
          <Button variant="gold" fullWidth size="lg" className="shadow-gold mb-3">Bayar Rp 199.000</Button>
          <button onClick={() => setShowPayModal(false)} className="text-sm text-muted font-montserrat hover:text-primary">Nanti saja</button>
        </div>
      </Modal>
    </div>
  )
}
