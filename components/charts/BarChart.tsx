'use client'
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { IntelligenceScores } from '@/lib/algorithm'

const LABELS: Record<keyof IntelligenceScores, string> = { linguistik: 'Linguistik', logisMatematik: 'Logis-Mat.', spasial: 'Spasial', kinestetik: 'Kinestetik', musikal: 'Musikal', interpersonal: 'Interpers.' }

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-border rounded-xl p-3 shadow-card text-xs font-montserrat">
        <p className="font-semibold text-primary">{label}</p>
        <p className="text-gold font-bold">{payload[0].value}/100</p>
      </div>
    )
  }
  return null
}

export default function BarChart({ scores }: { scores: IntelligenceScores }) {
  const data = (Object.entries(scores) as [keyof IntelligenceScores, number][]).map(([key, value]) => ({ name: LABELS[key], value }))
  const maxValue = Math.max(...data.map((d) => d.value))
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 10, fontFamily: 'Montserrat, sans-serif' }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(197,152,48,0.05)' }} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
          {data.map((entry, index) => <Cell key={index} fill={entry.value === maxValue ? '#C59830' : '#E5E7EB'} />)}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
