'use client'
export const dynamic = 'force-dynamic'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Brain, Plus, ArrowRight, TrendingUp, User, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface AssessmentSummary { id: string; name: string; characterType: string; profileEmoji: string; profileColor: string; createdAt: string }

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [assessments, setAssessments] = useState<AssessmentSummary[]>([])

  useEffect(() => { if (status === 'unauthenticated') router.push('/login') }, [status, router])
  useEffect(() => {
    const stored = sessionStorage.getItem('completed_assessments')
    if (stored) { try { setAssessments(JSON.parse(stored)) } catch { setAssessments([]) } }
  }, [])

  if (status === 'loading') return <div className="flex items-center justify-center h-screen"><div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" /></div>

  const userName = session?.user?.name?.split(' ')[0] || 'Pengguna'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Selamat Pagi' : hour < 17 ? 'Selamat Siang' : 'Selamat Malam'

  return (
    <div className="flex-1 p-5 max-w-2xl mx-auto w-full">
      <div className="mb-6 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted text-sm font-montserrat">{greeting},</p>
            <h1 className="font-cinzel text-2xl font-bold text-primary">{userName} 👋</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center"><User size={18} className="text-gold" /></div>
        </div>
      </div>

      <div className="bg-gradient-hero rounded-3xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
        <div className="relative">
          <Badge variant="gold" className="mb-3">Analisis Baru</Badge>
          <h2 className="font-cinzel font-bold text-xl text-white mb-2">Temukan Potensimu</h2>
          <p className="text-white/70 text-sm font-montserrat mb-4">Dapatkan laporan kecerdasan komprehensif dalam hitungan detik.</p>
          <Link href="/assessment"><Button variant="gold" size="md" className="shadow-gold"><Plus size={16} />Mulai Analisis</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[{ label: 'Total Analisis', value: String(assessments.length || 0), icon: Brain, color: 'text-gold' }, { label: 'Minggu Ini', value: '0', icon: TrendingUp, color: 'text-ai-blue' }, { label: 'Action Plan', value: '0%', icon: TrendingUp, color: 'text-emerald-600' }].map((stat, i) => {
          const Icon = stat.icon
          return (<Card key={i} padded={false} className="p-4 text-center"><Icon size={20} className={`${stat.color} mx-auto mb-2`} /><p className="font-cinzel font-bold text-xl text-primary">{stat.value}</p><p className="text-xs text-muted font-montserrat mt-0.5">{stat.label}</p></Card>)
        })}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-cinzel font-bold text-lg text-primary">Riwayat Analisis</h2>
        </div>
        {assessments.length === 0 ? (
          <Card bordered className="text-center py-10">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4"><Brain size={28} className="text-muted" /></div>
            <h3 className="font-cinzel font-bold text-primary mb-2">Belum Ada Analisis</h3>
            <p className="text-muted text-sm font-montserrat mb-5">Mulai analisis pertamamu dan temukan profil kecerdasan unikmu.</p>
            <Link href="/assessment"><Button variant="gold" size="md"><Plus size={16} />Mulai Sekarang</Button></Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {assessments.map((assessment) => (
              <Link key={assessment.id} href={`/assessment/result/${assessment.id}`}>
                <Card hover bordered className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${assessment.profileColor}15` }}>{assessment.profileEmoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-primary font-montserrat truncate">{assessment.name}</p>
                    <p className="text-sm font-medium font-montserrat" style={{ color: assessment.profileColor }}>{assessment.characterType}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="flex items-center gap-1 text-xs text-muted font-montserrat"><Clock size={11} /><span>{formatDate(assessment.createdAt)}</span></div>
                    <ArrowRight size={16} className="text-muted mt-1 ml-auto" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Card className="bg-gradient-to-br from-gold/10 to-transparent border-2 border-gold/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gold/20 rounded-2xl flex items-center justify-center flex-shrink-0"><TrendingUp size={18} className="text-gold" /></div>
          <div>
            <h3 className="font-cinzel font-bold text-primary mb-1">Action Plan Harian</h3>
            <p className="text-muted text-sm font-montserrat mb-3">Unlock 30 hari tantangan personal untuk mengembangkan kecerdasanmu.</p>
            <Badge variant="gold">Premium Feature</Badge>
          </div>
        </div>
      </Card>
    </div>
  )
}
