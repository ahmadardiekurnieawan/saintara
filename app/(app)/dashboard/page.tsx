'use client'
export const dynamic = 'force-dynamic'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Plus, ArrowRight, ArrowUpRight, BarChart3, CalendarClock, Sparkles, ChevronRight, FileText } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { ensureSeed, getHistory, type AssessmentSummary } from '@/lib/mock'
import { characterIcon, characterEssence } from '@/lib/character'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [assessments, setAssessments] = useState<AssessmentSummary[]>([])

  useEffect(() => { if (status === 'unauthenticated') router.push('/login') }, [status, router])
  useEffect(() => {
    ensureSeed()
    setAssessments(getHistory())
  }, [])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-7 h-7 border-2 border-ink border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const userName = session?.user?.name?.split(' ')[0] || 'Pengguna'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Selamat pagi' : hour < 17 ? 'Selamat siang' : 'Selamat malam'
  const thisWeek = assessments.filter((a) => Date.now() - new Date(a.createdAt).getTime() < 7 * 864e5).length

  const stats = [
    { label: 'Total analisis', value: String(assessments.length), icon: BarChart3 },
    { label: 'Minggu ini', value: String(thisWeek), icon: CalendarClock },
    { label: 'Action plan', value: '20%', icon: Sparkles },
  ]

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-5 sm:px-6 py-7">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <p className="text-muted text-sm">{greeting},</p>
          <h1 className="font-display text-2xl font-bold text-primary tracking-tight">{userName}</h1>
        </div>
        <p className="hidden sm:block text-sm text-muted">{formatDate(new Date())}</p>
      </div>

      {/* Primary CTA */}
      <div className="relative overflow-hidden rounded-3xl bg-ink p-7 sm:p-8 mb-6">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40 pointer-events-none" aria-hidden />
        <div className="absolute -top-10 -right-6 w-52 h-52 bg-gold/[0.08] blur-[90px] rounded-full pointer-events-none" aria-hidden />
        <div className="relative">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" /> Analisis Baru
          </span>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mb-2">Temukan potensimu</h2>
          <p className="text-white/55 text-sm max-w-md mb-5">Dapatkan laporan kecerdasan komprehensif yang personal dalam hitungan detik.</p>
          <Link href="/assessment">
            <Button variant="light" size="md" className="group">
              <Plus size={16} /> Mulai analisis
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} padded={false} bordered className="p-4 sm:p-5">
              <Icon size={18} className="text-muted mb-3" strokeWidth={1.75} />
              <p className="font-display font-bold text-2xl text-primary tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted mt-0.5">{stat.label}</p>
            </Card>
          )
        })}
      </div>

      {/* History */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-lg text-primary tracking-tight">Riwayat analisis</h2>
          {assessments.length > 0 && <span className="text-xs text-muted">{assessments.length} laporan</span>}
        </div>

        {assessments.length === 0 ? (
          <Card bordered className="text-center py-12">
            <div className="w-14 h-14 bg-surface border border-border rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-muted" strokeWidth={1.5} />
            </div>
            <h3 className="font-display font-semibold text-primary tracking-tight mb-1.5">Belum ada analisis</h3>
            <p className="text-muted text-sm mb-5 max-w-xs mx-auto">Mulai analisis pertamamu dan temukan profil kecerdasan unikmu.</p>
            <Link href="/assessment"><Button variant="primary" size="md"><Plus size={16} /> Mulai sekarang</Button></Link>
          </Card>
        ) : (
          <div className="space-y-2.5">
            {assessments.map((a) => {
              const Icon = characterIcon(a.characterType)
              return (
                <Link key={a.id} href={`/assessment/result/${a.id}`}>
                  <Card hover bordered padded={false} className="flex items-center gap-4 p-4">
                    <div className="w-11 h-11 rounded-2xl bg-ink flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-gold" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-primary truncate text-[15px]">{a.characterType}</p>
                      <p className="text-sm text-muted truncate">{a.name} · {characterEssence(a.characterType)}</p>
                    </div>
                    <div className="hidden sm:block text-right shrink-0">
                      <p className="text-xs text-muted">{formatDate(a.createdAt)}</p>
                    </div>
                    <ChevronRight size={18} className="text-muted shrink-0" />
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Action plan teaser */}
      <Card bordered className="flex items-start gap-4 bg-surface/50">
        <div className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center shrink-0">
          <Sparkles size={18} className="text-gold" strokeWidth={1.75} />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-primary tracking-tight mb-1">Action plan harian</h3>
          <p className="text-muted text-sm mb-3">Buka 30 hari tantangan personal untuk mengembangkan kecerdasanmu.</p>
          <Link href="/assessment" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-1.5 transition-all">
            Pelajari lebih lanjut <ArrowUpRight size={15} />
          </Link>
        </div>
      </Card>
    </div>
  )
}
