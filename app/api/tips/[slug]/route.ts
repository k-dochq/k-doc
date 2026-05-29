import { NextRequest, NextResponse } from 'next/server';
import { getTipDetail } from 'entities/tip/api/use-cases/get-tip-detail';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { slug } = await params;

    const article = await getTipDetail(slug);

    if (!article) {
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error('Error fetching tip detail:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch article',
      },
      { status: 500 },
    );
  }
}
