'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

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
    else setError('Email atau password tidak valid. Coba demo@saintara.id / demo1234')
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="font-cinzel text-2xl font-bold text-primary mb-2">Selamat Datang</h1>
        <p className="text-muted text-sm font-montserrat">Masuk ke akun SAINTARA Anda</p>
      </div>
      <div className="bg-white rounded-3xl shadow-card border border-border p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Email" type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail size={16} />} autoComplete="email" required />
          <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} leftIcon={<Lock size={16} />} rightIcon={<button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>} autoComplete="current-password" required />
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-montserrat">{error}</div>}
          <Button type="submit" variant="gold" size="lg" fullWidth loading={loading}>Masuk</Button>
        </form>
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted font-montserrat">Belum punya akun?{' '}<Link href="/register" className="text-gold font-semibold hover:underline">Daftar sekarang</Link></p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-gold/10 border border-gold/20 rounded-2xl text-center">
        <p className="text-xs text-gold font-montserrat font-medium">Demo: demo@saintara.id / demo1234</p>
      </div>
    </div>
  )
}
