import { NextRequest, NextResponse } from 'next/server';
import { getReviewDetail } from 'entities/review/api/use-cases/get-review-detail';
import { ReviewImageBlurService } from 'entities/review';
import { AuthService } from 'shared/lib/auth/server';
import { routeErrorLogger } from 'shared/lib';
import { createClient } from 'shared/lib/supabase/server';
import { prisma } from 'shared/lib/prisma';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * 리뷰 상세 정보 조회 API Route Handler
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id: reviewId } = await params;
  const endpoint = `/api/reviews/${reviewId}`;
  const method = 'GET';

  try {
    const url = new URL(request.url);
    const queryString = url.search;

    // 캐시 확인용 로그 (쿼리 파라미터 포함)
    console.log(`[${new Date().toISOString()}] API 호출: ${endpoint}${queryString}`);

    // 리뷰 상세 정보 조회
    let reviewData = await getReviewDetail({ reviewId });

    // 로그인 상태 확인 (이미지 블러 처리용)
    const authService = new AuthService();
    const currentUser = await authService.getCurrentUserOrNull();

    // 로그인이 안되어 있으면 이미지 URL을 blur 이미지로 교체
    if (!currentUser) {
      const blurService = new ReviewImageBlurService();
      reviewData = {
        ...reviewData,
        review: blurService.replaceReviewImagesWithBlur([reviewData.review])[0],
      };
    }

    return NextResponse.json({
      success: true,
      data: reviewData,
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    if ((error as Error).message.includes('리뷰를 찾을 수 없습니다')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Review not found',
          requestId,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch review detail',
        requestId,
      },
      { status: 500 },
    );
  }
}

/**
 * 리뷰 삭제 API Route Handler
 * 작성자 본인만 삭제 가능
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const endpoint = `/api/reviews/${id}`;
  const method = 'DELETE';

  try {
    // Supabase 인증 확인
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    // 리뷰 존재 확인
    const existingReview = await prisma.review.findUnique({
      where: { id },
      include: {
        ReviewImage: true,
      },
    });

    if (!existingReview) {
      return NextResponse.json(
        {
          success: false,
          error: 'Review not found',
        },
        { status: 404 },
      );
    }

    // 작성자 본인 확인
    if (existingReview.userId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Forbidden: Only the review author can delete this review',
        },
        { status: 403 },
      );
    }

    // 트랜잭션으로 리뷰와 관련 이미지 삭제
    await prisma.$transaction(async (tx) => {
      // 리뷰 이미지 삭제 (CASCADE로 자동 삭제되지만 명시적으로 처리)
      await tx.reviewImage.deleteMany({
        where: { reviewId: id },
      });

      // 리뷰 삭제
      await tx.review.delete({
        where: { id },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete review',
        requestId,
      },
      { status: 500 },
    );
  }
}
