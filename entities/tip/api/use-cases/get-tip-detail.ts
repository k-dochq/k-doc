import { type Prisma } from '@prisma/client';
import { prisma } from '@/shared/lib/prisma';
import { getHospitalsByIds } from 'entities/hospital/api/use-cases/get-hospitals-by-ids';
import { getDoctorsByIds } from 'entities/hospital/api/use-cases/get-doctors-by-ids';
import { type HospitalCardData } from 'shared/model/types';
import { type HospitalDoctor } from 'entities/hospital/api/entities/types';

type RecommendedArticleSpecialty = { id: string; name: Prisma.JsonValue };

interface RecommendedTipArticle {
  id: string;
  slug: string;
  title: Prisma.JsonValue;
  coverImage: string | null;
  publishedAt: Date | null;
  medicalSpecialties: RecommendedArticleSpecialty[];
}

type InsightArticleDetail = Prisma.InsightArticleGetPayload<{
  select: {
    id: true;
    slug: true;
    title: true;
    content: true;
    excerpt: true;
    coverImage: true;
    hashtagsI18n: true;
    medicalSpecialtyIds: true;
    hospitalIds: true;
    doctorIds: true;
    recommendedArticleIds: true;
    viewCount: true;
    publishedAt: true;
    status: true;
  };
}>;

export type TipDetailResult = InsightArticleDetail & {
  medicalSpecialties: { id: string; name: Prisma.JsonValue }[];
  recommendedHospitals: HospitalCardData[];
  recommendedDoctors: HospitalDoctor[];
  recommendedArticles: RecommendedTipArticle[];
};

/**
 * slug에 해당하는 Tips 아티클 상세를 추천 병원/의사/아티클까지 조립해 반환.
 * 없으면 null.
 */
export async function getTipDetail(slug: string): Promise<TipDetailResult | null> {
  const article = await prisma.insightArticle.findUnique({
    where: { slug },
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

  if (!article) return null;

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
    .filter((s): s is { id: string; name: Prisma.JsonValue } => !!s);

  const recommendedHospitals = await getHospitalsByIds(article.hospitalIds);
  const recommendedDoctors = await getDoctorsByIds(article.doctorIds);

  const recommendedArticles = await getRecommendedArticles(article.recommendedArticleIds);

  return {
    ...article,
    medicalSpecialties,
    recommendedHospitals,
    recommendedDoctors,
    recommendedArticles,
  };
}

async function getRecommendedArticles(
  recommendedArticleIds: string[],
): Promise<RecommendedTipArticle[]> {
  if (recommendedArticleIds.length === 0) return [];

  const fetched = await prisma.insightArticle.findMany({
    where: {
      id: { in: recommendedArticleIds },
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
  const indexMap = new Map(recommendedArticleIds.map((id, i) => [id, i]));
  fetched.sort((a, b) => (indexMap.get(a.id) ?? 0) - (indexMap.get(b.id) ?? 0));

  const allRecommendedSpecialtyIds = [...new Set(fetched.flatMap((a) => a.medicalSpecialtyIds))];
  const recommendedSpecialties =
    allRecommendedSpecialtyIds.length > 0
      ? await prisma.medicalSpecialty.findMany({
          where: { id: { in: allRecommendedSpecialtyIds } },
          select: { id: true, name: true },
        })
      : [];
  const recommendedSpecialtyMap = new Map(recommendedSpecialties.map((s) => [s.id, s]));

  return fetched.map((a) => ({
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
