import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function ensureUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  while (await prisma.store.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const { name, description, address, city, phone, logo } = body;
    
    if (!name || !address || !city || !phone) {
      return NextResponse.json(
        { error: 'Field wajib diisi: name, address, city, phone' },
        { status: 400 }
      );
    }
    
    const existingStore = await prisma.store.findUnique({
      where: { userId: session.user.id },
    });
    
    if (existingStore) {
      return NextResponse.json(
        { error: 'User sudah memiliki toko' },
        { status: 400 }
      );
    }
    
    const baseSlug = generateSlug(name);
    const slug = await ensureUniqueSlug(baseSlug);
    
    const store = await prisma.store.create({
      data: {
        userId: session.user.id,
        name,
        slug,
        description,
        address,
        city,
        phone,
        logo,
        status: 'PENDING',
      },
    });
    
    if (session.user.role !== 'SELLER') {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { role: 'SELLER' },
      });
    }
    
    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.error('Create store error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    
    const stores = await prisma.store.findMany({
      where: { status: 'ACTIVE' },
      take: limit,
      orderBy: [{ rating: 'desc' }, { totalSales: 'desc' }],
      include: {
        _count: {
          select: {
            products: {
              where: { isActive: true },
            },
          },
        },
      },
    });
    
    return NextResponse.json(stores);
  } catch (error) {
    console.error('Get stores error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}