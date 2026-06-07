'use client'
import { RadarChart as RechartsRadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { IntelligenceScores } from '@/lib/algorithm'

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { subject: string; value: number } }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-border rounded-xl p-3 shadow-card text-xs font-montserrat">
        <p className="font-semibold text-primary">{payload[0].payload.subject}</p>
        <p className="text-gold font-bold">{payload[0].payload.value}/100</p>
      </div>
    )
  }
  return null
}

export default function RadarChart({ scores }: { scores: IntelligenceScores }) {
  const data = [
    { subject: 'Linguistik', value: scores.linguistik, fullMark: 100 },
    { subject: 'Logis-Mat.', value: scores.logisMatematik, fullMark: 100 },
    { subject: 'Spasial', value: scores.spasial, fullMark: 100 },
    { subject: 'Kinestetik', value: scores.kinestetik, fullMark: 100 },
    { subject: 'Musikal', value: scores.musikal, fullMark: 100 },
    { subject: 'Interpersonal', value: scores.interpersonal, fullMark: 100 },
  ]
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RechartsRadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid stroke="#E5E7EB" strokeDasharray="4 4" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#374151', fontSize: 11, fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 9 }} tickCount={4} axisLine={false} />
        <Radar name="Kecerdasan" dataKey="value" stroke="#C59830" fill="#C59830" fillOpacity={0.15} strokeWidth={2} dot={{ r: 4, fill: '#C59830', strokeWidth: 2, stroke: '#fff' }} />
        <Tooltip content={<CustomTooltip />} />
      </RechartsRadarChart>
    </ResponsiveContainer>
  )
}
