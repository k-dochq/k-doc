'use client';

import { useQuery } from '@tanstack/react-query';
import { type Prisma } from '@prisma/client';
import { type HospitalCardData } from 'shared/model/types';
import { queryKeys } from 'shared/lib/query-keys';

export type TipDetail = Prisma.InsightArticleGetPayload<{
  select: {
    id: true;
    slug: true;
    title: true;
    content: true;
    excerpt: true;
    coverImage: true;
    hashtags: true;
    medicalSpecialtyIds: true;
    hospitalIds: true;
    viewCount: true;
    publishedAt: true;
    status: true;
  };
}> & {
  medicalSpecialties: { id: string; name: Prisma.JsonValue }[];
  recommendedHospitals: HospitalCardData[];
};

interface TipDetailApiResponse {
  success: boolean;
  data: TipDetail;
  error?: string;
}

async function fetchTipDetail(id: string): Promise<TipDetail> {
  const response = await fetch(`/api/tips/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: TipDetailApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch tip detail');
  }

  return result.data;
}

export function useTipDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.tips.detail(id),
    queryFn: () => fetchTipDetail(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
