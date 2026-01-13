import { NextRequest, NextResponse } from 'next/server';
import {
  transformDoctorReviewToCardData,
  type ReviewCardData,
  ReviewImageBlurService,
} from 'entities/review';
import { transformDoctorDetailResponse, getDoctorDetail } from 'entities/doctor/api';
import { AuthService } from 'shared/lib/auth/server';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // 의사 상세 정보 조회
    const { doctor } = await getDoctorDetail({ id });

    // 리뷰 데이터를 ReviewCardData 형식으로 변환 (닉네임 생성 포함)
    const reviewPromises = doctor.Hospital.Review.map((review) =>
      transformDoctorReviewToCardData(review, doctor.Hospital),
    );
    let reviews: ReviewCardData[] = await Promise.all(reviewPromises);

    // 로그인 상태 확인 (이미지 블러 처리용)
    const authService = new AuthService();
    const currentUser = await authService.getCurrentUserOrNull();

    // 로그인이 안되어 있으면 이미지 URL을 blur 이미지로 교체
    if (!currentUser) {
      const blurService = new ReviewImageBlurService();
      reviews = blurService.replaceReviewImagesWithBlur(reviews);
    }

    // 응답 데이터 구성
    const response = transformDoctorDetailResponse(doctor, reviews);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching doctor detail:', error);

    if ((error as Error).message.includes('Doctor not found')) {
      return NextResponse.json({ error: '의사를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(
      { error: '의사 정보를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
