'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { fetchBestHospitals } from 'entities/hospital/api/queries/get-best-hospitals';

interface UsePrefetchHospitalCategoriesParams {
  medicalSpecialties: MedicalSpecialtyWithTranslations[];
  selectedCategory: MedicalSpecialtyType | 'ALL';
}

export function usePrefetchHospitalCategories({
  medicalSpecialties,
  selectedCategory,
}: UsePrefetchHospitalCategoriesParams) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const prefetchAllCategories = async () => {
      // 현재 선택된 카테고리를 제외한 모든 카테고리에 대해 prefetch
      const categoriesToPrefetch = medicalSpecialties
        .map((specialty) => specialty.specialtyType)
        .filter((category) => category !== selectedCategory);

      // 병렬로 모든 카테고리 prefetch
      const prefetchPromises = categoriesToPrefetch.map((category) =>
        queryClient.prefetchQuery({
          queryKey: ['best-hospitals', category, 2],
          queryFn: () => fetchBestHospitals({ category, limit: 2 }),
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 10 * 60 * 1000, // 10 minutes
        }),
      );

      try {
        await Promise.all(prefetchPromises);
      } catch (error) {
        console.error('Error prefetching categories:', error);
      }
    };

    if (medicalSpecialties.length > 0) {
      prefetchAllCategories();
    }
  }, [medicalSpecialties, selectedCategory, queryClient]);
}
