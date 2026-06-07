import { AssessmentResult } from '@/lib/algorithm'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { CheckCircle, AlertCircle, Briefcase, Heart, Lock } from 'lucide-react'

export default function ResultCard({ result }: { result: AssessmentResult }) {
  return (
    <div className="space-y-5">
      <Card>
        <h3 className="font-cinzel font-bold text-lg text-primary mb-3">Profil Karakter</h3>
        <p className="text-muted text-sm leading-relaxed font-montserrat">{result.characterDescription}</p>
      </Card>
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-emerald-50 rounded-xl"><CheckCircle size={18} className="text-emerald-600" /></div>
          <h3 className="font-cinzel font-bold text-lg text-primary">Kekuatan Utama</h3>
        </div>
        <div className="space-y-2.5">
          {result.strengths.map((s, i) => <div key={i} className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-gold mt-1.5 flex-shrink-0" /><span className="text-sm text-primary font-montserrat">{s}</span></div>)}
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-amber-50 rounded-xl"><AlertCircle size={18} className="text-amber-600" /></div>
          <h3 className="font-cinzel font-bold text-lg text-primary">Area Pengembangan</h3>
        </div>
        <div className="space-y-2.5">
          {result.weaknesses.map((w, i) => <div key={i} className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" /><span className="text-sm text-primary font-montserrat">{w}</span></div>)}
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-50 rounded-xl"><Briefcase size={18} className="text-ai-blue" /></div>
          <h3 className="font-cinzel font-bold text-lg text-primary">Rekomendasi Karier</h3>
        </div>
        <div className="space-y-3">
          {result.careerPaths.map((career, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-surface">
              <div className="flex-shrink-0 w-8 h-8 bg-navy/10 rounded-full flex items-center justify-center"><span className="font-cinzel font-bold text-navy text-sm">{i + 1}</span></div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-primary font-montserrat">{career.title}</p>
                <p className="text-xs text-muted font-montserrat">{career.description}</p>
              </div>
              <Badge variant="gold" size="sm">{career.match}%</Badge>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-pink-50 rounded-xl"><Heart size={18} className="text-pink-500" /></div>
          <h3 className="font-cinzel font-bold text-lg text-primary">Gaya Relasi</h3>
        </div>
        <p className="text-sm text-muted leading-relaxed font-montserrat">{result.relationshipStyle}</p>
      </Card>
      <Card className="border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-transparent">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-cinzel font-bold text-lg text-primary">Action Plan Harian</h3>
          <Badge variant="gold">Premium</Badge>
        </div>
        <div className="space-y-3">
          {result.dailyChallenges.map((challenge, i) => (
            <div key={i} className={`p-4 rounded-xl border ${challenge.locked ? 'bg-surface border-border' : 'bg-white border-gold/30'}`}>
              <div className="flex items-start gap-3">
                {challenge.locked ? <Lock size={16} className="text-muted mt-0.5 flex-shrink-0" /> : <div className="w-4 h-4 rounded-full bg-gold/20 border-2 border-gold mt-0.5 flex-shrink-0" />}
                <div className={challenge.locked ? 'blur-sm select-none' : ''}>
                  <p className="text-xs font-semibold text-gold font-montserrat mb-0.5">{challenge.day}</p>
                  <p className="text-sm font-semibold text-primary font-montserrat">{challenge.title}</p>
                  <p className="text-xs text-muted font-montserrat mt-1">{challenge.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted mt-3 text-center font-montserrat">Unlock 30 hari action plan dengan upgrade ke Premium</p>
      </Card>
    </div>
  )
}
