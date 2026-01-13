import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { AuthService } from 'shared/lib/auth/server';
import { ReviewImageBlurService } from 'entities/review';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id: reviewId } = await params;

  try {
    // findFirst를 사용하여 isActive 조건 포함
    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        // isActive가 false인 리뷰는 제외 (null과 true는 포함)
        isActive: { not: false },
      },
      select: {
        id: true,
        MedicalSpecialty: {
          select: {
            specialtyType: true,
          },
        },
        ReviewImage: {
          select: {
            id: true,
            imageType: true,
            imageUrl: true,
            alt: true,
            order: true,
          },
          where: {
            isActive: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!review) {
      return NextResponse.json(
        {
          success: false,
          error: 'Review not found',
        },
        { status: 404 },
      );
    }

    const beforeImages = review.ReviewImage.filter((image) => image.imageType === 'BEFORE');
    const afterImages = review.ReviewImage.filter((image) => image.imageType === 'AFTER');

    let images = {
      before: beforeImages,
      after: afterImages,
    };

    const authService = new AuthService();
    const currentUser = await authService.getCurrentUserOrNull();

    // 가슴 카테고리인지 확인
    const isBreastReview = review.MedicalSpecialty.specialtyType === 'BREAST';
    // 로그인이 안되어 있고 가슴 카테고리인 경우 requiresLogin: true
    const requiresLogin = !currentUser && isBreastReview;

    if (!currentUser) {
      const blurService = new ReviewImageBlurService();
      images = blurService.applyBlurToReviewImages({
        reviewId: review.id,
        specialtyType: review.MedicalSpecialty.specialtyType,
        images,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        reviewId,
        images,
        requiresLogin,
      },
    });
  } catch (error) {
    console.error('Error fetching review images:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch review images',
      },
      { status: 500 },
    );
  }
}
