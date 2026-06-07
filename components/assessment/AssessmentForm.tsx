'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { User, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const BLOOD_TYPES = ['A', 'B', 'AB', 'O'] as const
type BloodType = (typeof BLOOD_TYPES)[number]

export default function AssessmentForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: '', birthDate: '', bloodType: '' as BloodType | '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!formData.name.trim() || formData.name.trim().length < 2) e.name = 'Nama lengkap minimal 2 karakter'
    if (!formData.birthDate) e.birthDate = 'Tanggal lahir wajib diisi'
    else {
      const birth = new Date(formData.birthDate)
      if (birth >= new Date()) e.birthDate = 'Tanggal lahir harus di masa lalu'
    }
    if (!formData.bloodType) e.bloodType = 'Pilih golongan darah'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    sessionStorage.setItem('assessment_draft', JSON.stringify(formData))
    router.push('/assessment/confirm')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input label="Nama Lengkap" placeholder="Masukkan nama lengkap sesuai KTP" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={errors.name} leftIcon={<User size={16} />} hint="Gunakan nama lengkap sesuai dokumen resmi" autoComplete="name" />
      <div>
        <label className="block text-sm font-semibold text-primary mb-2 font-montserrat">Tanggal Lahir</label>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"><Calendar size={16} /></div>
          <input type="date" className={cn('input-field pl-11', errors.birthDate && 'border-red-400')} value={formData.birthDate} onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })} max={new Date().toISOString().split('T')[0]} />
        </div>
        {errors.birthDate && <p className="mt-1.5 text-sm text-red-500 font-montserrat">{errors.birthDate}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold text-primary mb-3 font-montserrat">Golongan Darah</label>
        <div className="grid grid-cols-4 gap-3">
          {BLOOD_TYPES.map((type) => (
            <button key={type} type="button" onClick={() => setFormData({ ...formData, bloodType: type })} className={cn('py-3.5 rounded-xl border-2 font-cinzel font-bold text-lg transition-all duration-200', formData.bloodType === type ? 'border-gold bg-gold/10 text-gold shadow-gold' : 'border-border text-muted hover:border-gold/50')}>{type}</button>
          ))}
        </div>
        {errors.bloodType && <p className="mt-2 text-sm text-red-500 font-montserrat">{errors.bloodType}</p>}
      </div>
      <Button type="submit" variant="gold" size="lg" fullWidth>Lanjut ke Konfirmasi →</Button>
    </form>
  )
}
