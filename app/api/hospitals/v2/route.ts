import { NextRequest, NextResponse } from 'next/server';
import { getHospitalsV2 } from 'entities/hospital/api/use-cases/get-hospitals-v2';
import {
  convertToDbQueryParams,
  validateHospitalQueryParams,
} from 'shared/lib/hospital-query-utils';

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
    const dbParams = convertToDbQueryParams(parsedParams);

    // 병원 데이터 조회
    const hospitalsData = await getHospitalsV2(dbParams);

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
