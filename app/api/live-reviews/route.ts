import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { type MedicalSpecialtyType } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category') as MedicalSpecialtyType | 'ALL' | null;
    const hospitalId = searchParams.get('hospitalId');
    const limit = parseInt(searchParams.get('limit') || '3', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);

    const skip = (page - 1) * limit;

    // 카테고리 및 병원 필터링 조건
    const whereCondition: {
      isActive: boolean;
      hospitalId?: string;
      MedicalSpecialty?: { specialtyType: MedicalSpecialtyType };
    } = {
      isActive: true,
    };

    if (hospitalId) {
      whereCondition.hospitalId = hospitalId;
    }

    if (category && category !== 'ALL') {
      whereCondition.MedicalSpecialty = {
        specialtyType: category,
      };
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
      orderBy: [
        { order: 'asc' }, // order가 null이 아닌 경우 먼저 정렬
        { createdAt: 'desc' }, // order가 null인 경우 createdAt 내림차순
      ],
      skip,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: {
        liveReviews,
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
