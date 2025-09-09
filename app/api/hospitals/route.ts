import { NextRequest, NextResponse } from 'next/server';
import { getHospitals } from 'entities/hospital';
import { isValidMedicalSpecialtyType } from 'shared/config';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

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

    return NextResponse.json({
      success: true,
      data: hospitalsData,
    });
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
