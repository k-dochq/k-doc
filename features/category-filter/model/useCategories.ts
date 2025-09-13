'use client';

import { MedicalSpecialtyType } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { type LocalizedText } from 'shared/model/types/common';
import { queryKeys } from 'shared/lib/query-keys';

export interface Category {
  id: string;
  specialtyType: MedicalSpecialtyType;
  name: LocalizedText;
  order: number;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch('/api/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const result: CategoriesResponse = await response.json();
  return result.data || [];
}

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: fetchCategories,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
