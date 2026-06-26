'use client';

import { useQuery } from '@tanstack/react-query';

async function fetchThumbnails(ids: string[]): Promise<Record<string, string | null>> {
  if (ids.length === 0) return {};
  const res = await fetch(`/api/hospitals/thumbnails?ids=${ids.join(',')}`);
  if (!res.ok) return {};
  return res.json();
}

export function useHospitalThumbnails(ids: string[]): Record<string, string | null> {
  const { data } = useQuery({
    queryKey: ['hospital-thumbnails', ids],
    queryFn: () => fetchThumbnails(ids),
    staleTime: 5 * 60 * 1000,
  });
  return data ?? {};
}
