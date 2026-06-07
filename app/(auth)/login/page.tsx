'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (result?.ok) router.push('/dashboard')
    else setError('Email atau password tidak valid. Coba kredensial demo di bawah.')
  }

  function fillDemo() {
    setEmail('demo@saintara.id')
    setPassword('demo1234')
    setError('')
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-primary tracking-tight mb-1.5">Selamat datang kembali</h1>
        <p className="text-muted text-sm">Masuk untuk melanjutkan ke dashboard kamu.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Email" type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail size={16} />} autoComplete="email" required />
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-primary">Password</label>
            <Link href="#" className="text-xs text-muted hover:text-primary">Lupa password?</Link>
          </div>
          <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} leftIcon={<Lock size={16} />} rightIcon={<button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-primary">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>} autoComplete="current-password" required />
        </div>
        {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
        <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} className="group">
          Masuk
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
        </Button>
      </form>

      <button onClick={fillDemo} className="mt-4 w-full rounded-xl border border-dashed border-border bg-surface/60 px-4 py-3 text-left hover:border-slate-300 transition-colors">
        <p className="text-xs font-semibold text-primary">Coba akun demo</p>
        <p className="text-xs text-muted mt-0.5">demo@saintara.id · demo1234 — klik untuk isi otomatis</p>
      </button>

      <p className="mt-6 text-center text-sm text-muted">
        Belum punya akun?{' '}
        <Link href="/register" className="text-primary font-semibold hover:underline underline-offset-4">Daftar gratis</Link>
      </p>
    </div>
  )
}
