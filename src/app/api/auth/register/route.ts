import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, phone } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Field wajib diisi' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password minimal 8 karakter' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 400 })
    }

    // Check if there's any admin user already
    const adminExists = await prisma.user.findFirst({ where: { role: 'ADMIN' } })
    const role = adminExists ? 'USER' : 'ADMIN'

    const passwordHash = await hash(password, 12)
    const user = await prisma.user.create({
      data: { email, passwordHash, name, phone, role },
    })

    return NextResponse.json({ id: user.id, email: user.email, name: user.name, role: user.role })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
