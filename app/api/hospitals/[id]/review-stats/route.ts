import { NextRequest, NextResponse } from 'next/server';
import { getHospitalReviewStats } from 'entities/review/api/use-cases/get-hospital-review-stats';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id: hospitalId } = await params;

    const stats = await getHospitalReviewStats({ hospitalId });

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching hospital review stats:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch hospital review stats',
      },
      { status: 500 },
    );
  }
}
