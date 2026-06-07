import { AssessmentResult } from '@/lib/algorithm'
import Card from '@/components/ui/Card'
import { CheckCircle2, TrendingUp, Briefcase, Heart, Lock, Sparkles } from 'lucide-react'

function SectionHeader({ icon: Icon, title }: { icon: typeof Heart; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center">
        <Icon size={17} className="text-primary" strokeWidth={1.75} />
      </div>
      <h3 className="font-display font-semibold text-lg text-primary tracking-tight">{title}</h3>
    </div>
  )
}

export default function ResultCard({ result }: { result: AssessmentResult }) {
  return (
    <div className="space-y-4">
      <Card bordered>
        <h3 className="font-display font-semibold text-lg text-primary tracking-tight mb-3">Profil karakter</h3>
        <p className="text-muted text-[15px] leading-relaxed">{result.characterDescription}</p>
      </Card>

      <Card bordered>
        <SectionHeader icon={CheckCircle2} title="Kekuatan utama" />
        <div className="space-y-3">
          {result.strengths.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-0.5 w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              </span>
              <span className="text-[15px] text-primary">{s}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card bordered>
        <SectionHeader icon={TrendingUp} title="Area pengembangan" />
        <div className="space-y-3">
          {result.weaknesses.map((w, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-0.5 w-4 h-4 rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              </span>
              <span className="text-[15px] text-primary">{w}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card bordered>
        <SectionHeader icon={Briefcase} title="Rekomendasi karier" />
        <div className="space-y-2.5">
          {result.careerPaths.map((career, i) => (
            <div key={i} className="flex items-center gap-4 p-3.5 rounded-2xl bg-surface border border-border">
              <span className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center font-display font-bold text-primary text-sm shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[15px] text-primary leading-tight">{career.title}</p>
                <p className="text-xs text-muted mt-0.5">{career.description}</p>
              </div>
              <span className="rounded-full bg-ink text-white px-2.5 py-1 text-xs font-bold shrink-0">{career.match}%</span>
            </div>
          ))}
        </div>
      </Card>

      <Card bordered>
        <SectionHeader icon={Heart} title="Gaya relasi" />
        <p className="text-muted text-[15px] leading-relaxed">{result.relationshipStyle}</p>
      </Card>

      {/* Action plan — premium locked */}
      <Card bordered className="relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg text-primary tracking-tight">Action plan harian</h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-ink text-white px-2.5 py-1 text-[11px] font-bold">
            <Sparkles size={11} className="text-gold" /> Premium
          </span>
        </div>
        <div className="space-y-2.5">
          {result.dailyChallenges.map((challenge, i) => (
            <div key={i} className={`p-4 rounded-2xl border ${challenge.locked ? 'bg-surface border-border' : 'bg-white border-border'}`}>
              <div className="flex items-start gap-3">
                {challenge.locked
                  ? <Lock size={15} className="text-muted mt-0.5 shrink-0" />
                  : <span className="w-4 h-4 rounded-full border-2 border-gold mt-0.5 shrink-0" />}
                <div className={challenge.locked ? 'blur-[3px] select-none' : ''}>
                  <p className="text-xs font-semibold text-gold-dark mb-0.5">{challenge.day}</p>
                  <p className="text-[15px] font-semibold text-primary">{challenge.title}</p>
                  <p className="text-xs text-muted mt-1">{challenge.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted mt-3 text-center">Buka 30 hari action plan penuh dengan upgrade ke Premium.</p>
      </Card>
    </div>
  )
}
