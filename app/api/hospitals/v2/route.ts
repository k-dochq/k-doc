import { NextRequest, NextResponse } from 'next/server';
import { getHospitalsV2 } from 'entities/hospital/api/use-cases/get-hospitals-v2';
import { type GetHospitalsRequestV2 } from 'entities/hospital/api/entities/types';
import { validateHospitalQueryParams } from 'shared/lib/hospital-query-utils';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const queryString = url.search;

    // 캐시 확인용 로그 (쿼리 파라미터 포함)
    console.log(`[${new Date().toISOString()}] API 호출: /api/hospitals/v2${queryString}`);

    const { searchParams } = url;

    // 타입 안전한 쿼리 파라미터 유효성 검증
    const validationResult = validateHospitalQueryParams(searchParams);

    if (!validationResult.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid query parameters',
          details: validationResult.errors,
        },
        { status: 400 },
      );
    }

    // 타입 안전한 파라미터 파싱 및 변환
    const parsedParams = validationResult.params!;

    // GetHospitalsRequestV2로 변환
    const requestV2: GetHospitalsRequestV2 = {
      page: parsedParams.page,
      limit: parsedParams.limit,
      sortBy: parsedParams.sort,
      sortOrder: parsedParams.sortOrder,
      category: parsedParams.category,
      minRating: parsedParams.minRating,
      search: parsedParams.search,
      districtIds: parsedParams.districtIds,
      // category가 RECOMMEND가 아닌 MedicalSpecialtyType인 경우에만 specialtyType으로 변환
      specialtyType:
        parsedParams.category && parsedParams.category !== 'RECOMMEND'
          ? (parsedParams.category as GetHospitalsRequestV2['specialtyType'])
          : undefined,
    };

    // 병원 데이터 조회
    const hospitalsData = await getHospitalsV2(requestV2);

    const response = NextResponse.json({
      success: true,
      data: hospitalsData,
    });

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
