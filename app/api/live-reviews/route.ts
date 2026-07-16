import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { type MedicalSpecialtyType } from '@prisma/client';

// 메인 페이지 Live Reviews - "Body" 탭 예외 하드코딩
// 화면에 노출되는 "Body" 탭은 MedicalSpecialtyType.BODY_LINE에 해당한다.
// (BODY는 isActive: false로 비활성화되어 있어 실제 탭에는 노출되지 않음)
// 요청에 따라 이 3개의 LiveReview를 지정된 순서로 고정 노출한다.
const BODY_TAB_CATEGORY: MedicalSpecialtyType = 'BODY_LINE';
const BODY_TAB_HARDCODED_LIVE_REVIEW_IDS = [
  'f9751708-70c2-4f30-933f-788e0af2efc3',
  '3c58074b-45c3-4fdd-8832-58ddad081bc7',
  'ee39ee96-db94-445e-88f9-bf2f5531c3bc',
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category') as MedicalSpecialtyType | 'ALL' | null;
    const hospitalId = searchParams.get('hospitalId');
    const limit = parseInt(searchParams.get('limit') || '3', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);

    const skip = (page - 1) * limit;

    const isBodyTabHardcoded = category === BODY_TAB_CATEGORY && !hospitalId;

    // 카테고리 및 병원 필터링 조건
    const whereCondition: {
      isActive: boolean;
      hospitalId?: string;
      MedicalSpecialty?: { specialtyType: MedicalSpecialtyType };
      id?: { in: string[] };
    } = {
      isActive: true,
    };

    if (isBodyTabHardcoded) {
      // Body 탭은 카테고리/병원 필터 대신 하드코딩된 ID 목록만 사용
      whereCondition.id = { in: BODY_TAB_HARDCODED_LIVE_REVIEW_IDS };
    } else {
      if (hospitalId) {
        whereCondition.hospitalId = hospitalId;
      }

      if (category && category !== 'ALL') {
        whereCondition.MedicalSpecialty = {
          specialtyType: category,
        };
      }
    }

    const liveReviews = await prisma.liveReview.findMany({
      where: whereCondition,
      select: {
        id: true,
        content: true,
        hospitalId: true,
        medicalSpecialtyId: true,
        detailLink: true,
        order: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        Hospital: {
          select: {
            id: true,
            name: true,
            address: true,
            displayLocationName: true,
          },
        },
        MedicalSpecialty: {
          select: {
            id: true,
            name: true,
            specialtyType: true,
          },
        },
        LiveReviewImage: {
          where: {
            isActive: true,
          },
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
          select: {
            id: true,
            imageUrl: true,
            alt: true,
            order: true,
          },
        },
      },
      orderBy: isBodyTabHardcoded
        ? undefined
        : [
            { order: 'asc' }, // order가 null이 아닌 경우 먼저 정렬
            { createdAt: 'desc' }, // order가 null인 경우 createdAt 내림차순
          ],
      skip: isBodyTabHardcoded ? undefined : skip,
      take: isBodyTabHardcoded ? undefined : limit,
    });

    // Body 탭 하드코딩: 지정된 ID 순서(1, 2, 3)대로 재정렬
    const sortedLiveReviews = isBodyTabHardcoded
      ? BODY_TAB_HARDCODED_LIVE_REVIEW_IDS.map((id) =>
          liveReviews.find((liveReview) => liveReview.id === id),
        ).filter(
          (liveReview): liveReview is (typeof liveReviews)[number] => liveReview !== undefined,
        )
      : liveReviews;

    return NextResponse.json({
      success: true,
      data: {
        liveReviews: sortedLiveReviews,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching live reviews:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch live reviews',
      },
      { status: 500 },
    );
  }
}
