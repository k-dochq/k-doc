import { NextRequest, NextResponse } from 'next/server';
import { getHospitals } from 'entities/hospital';
import { isValidMedicalSpecialtyType } from 'shared/config';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const queryString = url.search;

    // 캐시 확인용 로그 (쿼리 파라미터 포함)
    console.log(`[${new Date().toISOString()}] API 호출: /api/hospitals${queryString}`);

    const { searchParams } = url;

    // 쿼리 파라미터 추출
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sortBy = searchParams.get('sortBy') || 'rating';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const specialtyType = searchParams.get('specialtyType');
    const minRating = parseFloat(searchParams.get('minRating') || '0');

    // specialtyType 검증
    const validSpecialtyType =
      specialtyType && isValidMedicalSpecialtyType(specialtyType) ? specialtyType : undefined;

    // 병원 데이터 조회
    const hospitalsData = await getHospitals({
      page,
      limit,
      sortBy: sortBy as 'rating' | 'reviewCount' | 'createdAt',
      sortOrder: sortOrder as 'asc' | 'desc',
      specialtyType: validSpecialtyType,
      minRating,
    });

    const response = NextResponse.json({
      success: true,
      data: hospitalsData,
    });

    // Vercel Edge 캐시 설정 (브라우저 캐시 제외)
    response.headers.set(
      'Cache-Control',
      'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
    );

    return response;
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch hospitals',
      },
      { status: 500 },
    );
  }
}
