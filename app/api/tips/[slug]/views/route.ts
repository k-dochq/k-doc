import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function POST(_request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { slug } = await params;

    const updated = await prisma.insightArticle.update({
      where: { slug },
      data: { viewCount: { increment: 1 } },
      select: { id: true, slug: true, viewCount: true },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error incrementing tip view count:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to increment view count',
      },
      { status: 500 },
    );
  }
}
