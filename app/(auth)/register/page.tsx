'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e: Record<string, string> = {}
    if (!formData.name.trim() || formData.name.trim().length < 2) e.name = 'Nama minimal 2 karakter'
    if (!formData.email.includes('@')) e.email = 'Email tidak valid'
    if (formData.password.length < 6) e.password = 'Password minimal 6 karakter'
    if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Password tidak cocok'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    router.push('/login')
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-primary tracking-tight mb-1.5">Buat akun</h1>
        <p className="text-muted text-sm">Mulai perjalanan mengenal diri terbaikmu.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Nama Lengkap" placeholder="Nama lengkap kamu" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={errors.name} leftIcon={<User size={16} />} autoComplete="name" />
        <Input label="Email" type="email" placeholder="nama@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={errors.email} leftIcon={<Mail size={16} />} autoComplete="email" />
        <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Minimal 6 karakter" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} error={errors.password} leftIcon={<Lock size={16} />} rightIcon={<button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-primary">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>} />
        <Input label="Konfirmasi Password" type={showConfirm ? 'text' : 'password'} placeholder="Ulangi password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} error={errors.confirmPassword} leftIcon={<Lock size={16} />} rightIcon={<button type="button" onClick={() => setShowConfirm(!showConfirm)} className="hover:text-primary">{showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}</button>} />
        <p className="text-xs text-muted leading-relaxed">
          Dengan mendaftar, kamu menyetujui{' '}
          <Link href="#" className="text-primary hover:underline underline-offset-2">Syarat &amp; Ketentuan</Link> dan{' '}
          <Link href="#" className="text-primary hover:underline underline-offset-2">Kebijakan Privasi</Link>.
        </p>
        <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} className="group mt-1">
          Buat akun
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Sudah punya akun?{' '}
        <Link href="/login" className="text-primary font-semibold hover:underline underline-offset-4">Masuk di sini</Link>
      </p>
    </div>
  )
}
