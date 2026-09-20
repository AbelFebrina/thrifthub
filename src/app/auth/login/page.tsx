'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    })

    setLoading(false)

    if (res?.error) {
      setError('Email atau password salah')
    } else {
      router.push(callbackUrl)
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-bold text-neutral-900">Masuk</h1>
          <p className="mt-1 text-neutral-500 text-sm">Masuk ke akun ThriftHub kamu</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#E17100] py-3 text-white font-medium text-sm hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Belum punya akun?{' '}
          <Link href="/auth/register" className="font-semibold text-[#E17100] hover:text-orange-600 transition-colors">
            Daftar
          </Link>
        </p>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-neutral-500 hover:text-[#E17100] transition-colors">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
