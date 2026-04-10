import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { getHospitalsByIds } from 'entities/hospital/api/use-cases/get-hospitals-by-ids';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { id } = await params;

    const article = await prisma.insightArticle.findUnique({
      where: { id },
      select: {
        id: true,
        slug: true,
        title: true,
        content: true,
        excerpt: true,
        coverImage: true,
        hashtags: true,
        medicalSpecialtyIds: true,
        hospitalIds: true,
        viewCount: true,
        publishedAt: true,
        status: true,
      },
    });

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 },
      );
    }

    const specialties =
      article.medicalSpecialtyIds.length > 0
        ? await prisma.medicalSpecialty.findMany({
            where: { id: { in: article.medicalSpecialtyIds } },
            select: { id: true, name: true },
          })
        : [];

    const specialtyMap = new Map(specialties.map((s) => [s.id, s]));
    const medicalSpecialties = article.medicalSpecialtyIds
      .map((specialtyId) => specialtyMap.get(specialtyId))
      .filter(Boolean);

    const recommendedHospitals = await getHospitalsByIds(article.hospitalIds);

    return NextResponse.json({
      success: true,
      data: {
        ...article,
        medicalSpecialties,
        recommendedHospitals,
      },
    });
  } catch (error) {
    console.error('Error fetching tip detail:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch article',
      },
      { status: 500 },
    );
  }
}
