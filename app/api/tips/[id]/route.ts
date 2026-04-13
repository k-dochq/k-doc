import { NextRequest, NextResponse } from 'next/server';
import { type Prisma } from '@prisma/client';
import { prisma } from '@/shared/lib/prisma';
import { getHospitalsByIds } from 'entities/hospital/api/use-cases/get-hospitals-by-ids';
import { getDoctorsByIds } from 'entities/hospital/api/use-cases/get-doctors-by-ids';

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
        hashtagsI18n: true,
        medicalSpecialtyIds: true,
        hospitalIds: true,
        doctorIds: true,
        recommendedArticleIds: true,
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
    const recommendedDoctors = await getDoctorsByIds(article.doctorIds);

    // 추천 아티클 + 각 아티클의 medicalSpecialties 함께 조회
    type RecommendedArticleSpecialty = { id: string; name: Prisma.JsonValue };
    let recommendedArticles: Array<{
      id: string;
      slug: string;
      title: Prisma.JsonValue;
      coverImage: string | null;
      publishedAt: Date | null;
      medicalSpecialties: RecommendedArticleSpecialty[];
    }> = [];

    if (article.recommendedArticleIds.length > 0) {
      const fetched = await prisma.insightArticle.findMany({
        where: {
          id: { in: article.recommendedArticleIds },
          status: 'PUBLISHED',
        },
        select: {
          id: true,
          slug: true,
          title: true,
          coverImage: true,
          publishedAt: true,
          medicalSpecialtyIds: true,
        },
      });

      // 입력 ID 순서대로 정렬
      const indexMap = new Map(article.recommendedArticleIds.map((id, i) => [id, i]));
      fetched.sort((a, b) => (indexMap.get(a.id) ?? 0) - (indexMap.get(b.id) ?? 0));

      const allRecommendedSpecialtyIds = [
        ...new Set(fetched.flatMap((a) => a.medicalSpecialtyIds)),
      ];
      const recommendedSpecialties =
        allRecommendedSpecialtyIds.length > 0
          ? await prisma.medicalSpecialty.findMany({
              where: { id: { in: allRecommendedSpecialtyIds } },
              select: { id: true, name: true },
            })
          : [];
      const recommendedSpecialtyMap = new Map(
        recommendedSpecialties.map((s) => [s.id, s]),
      );

      recommendedArticles = fetched.map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        coverImage: a.coverImage,
        publishedAt: a.publishedAt,
        medicalSpecialties: a.medicalSpecialtyIds
          .map((sid) => recommendedSpecialtyMap.get(sid))
          .filter((s): s is RecommendedArticleSpecialty => !!s),
      }));
    }

    return NextResponse.json({
      success: true,
      data: {
        ...article,
        medicalSpecialties,
        recommendedHospitals,
        recommendedDoctors,
        recommendedArticles,
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
