'use client';

import { useQuery } from '@tanstack/react-query';
import { type Locale } from 'shared/config';
import { queryKeys } from 'shared/lib/query-keys';

async function fetchHospitalSuggestions(query: string, lang: Locale): Promise<string[]> {
  const response = await fetch(
    `/api/hospitals/suggestions?q=${encodeURIComponent(query)}&lang=${lang}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch hospital suggestions');
  }

  const data = (await response.json()) as { suggestions: string[] };
  return data.suggestions;
}

export function useHospitalSuggestions(query: string, lang: Locale) {
  return useQuery({
    queryKey: queryKeys.hospitals.suggestions(query, lang),
    queryFn: () => fetchHospitalSuggestions(query, lang),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
}
