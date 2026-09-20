import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status } = body as { status: 'ACTIVE' | 'SUSPENDED' };

    if (!['ACTIVE', 'SUSPENDED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Use "ACTIVE" or "SUSPENDED"' },
        { status: 400 }
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent suspending other admins
    if (targetUser.role === 'ADMIN' && targetUser.id !== session.user.id) {
      return NextResponse.json(
        { error: 'Cannot change status of other admins' },
        { status: 403 }
      );
    }

    // Prevent self-suspension
    if (targetUser.id === session.user.id && status === 'SUSPENDED') {
      return NextResponse.json(
        { error: 'Cannot suspend yourself' },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Update user status error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}