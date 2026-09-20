import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function findStoreByIdOrSlug(identifier: string) {
  return prisma.store.findFirst({
    where: {
      OR: [{ id: identifier }, { slug: identifier }],
    },
    include: {
      products: {
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const store = await findStoreByIdOrSlug(id);
    
    if (!store) {
      return NextResponse.json(
        { error: 'Toko tidak ditemukan' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(store);
  } catch (error) {
    console.error('Get store detail error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = await params;
    
    const store = await findStoreByIdOrSlug(id);
    
    if (!store) {
      return NextResponse.json(
        { error: 'Toko tidak ditemukan' },
        { status: 404 }
      );
    }
    
    if (store.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Tidak memiliki akses untuk mengedit toko ini' },
        { status: 403 }
      );
    }
    
    const body = await req.json();
    const { name, description, address, city, phone, logo } = body;
    
    const updateData: Record<string, any> = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (phone !== undefined) updateData.phone = phone;
    if (logo !== undefined) updateData.logo = logo;
    
    const updatedStore = await prisma.store.update({
      where: { id: store.id },
      data: updateData,
    });
    
    return NextResponse.json(updatedStore);
  } catch (error) {
    console.error('Update store error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}