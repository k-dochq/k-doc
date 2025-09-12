import { NextRequest, NextResponse } from 'next/server';
import { getBestHospitals } from 'entities/hospital/api/use-cases/get-best-hospitals';
import { isValidMedicalSpecialtyType } from 'shared/config';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);

    const { searchParams } = url;

    // 쿼리 파라미터 추출
    const category = searchParams.get('category') || 'ALL';
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    // category 검증
    const validCategory =
      category === 'ALL' || isValidMedicalSpecialtyType(category) ? category : 'ALL';

    // best hospitals 데이터 조회
    const hospitals = await getBestHospitals({
      category: validCategory,
      limit,
    });

    const response = NextResponse.json({
      success: true,
      data: hospitals,
    });

    return response;
  } catch (error) {
    console.error('Error fetching best hospitals:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch best hospitals',
      },
      { status: 500 },
    );
  }
}
