'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { useLocalizedRouter } from 'shared/model/hooks';
import type {
  GetHospitalLikeStatusResponse,
  HospitalLikeToggleResponse,
} from 'entities/hospital-like';

interface UseHospitalLikeOptions {
  hospitalId: string;
  enabled?: boolean;
}

interface HospitalLikeError {
  message: string;
  status?: number;
}

class HospitalLikeApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'HospitalLikeApiError';
    this.status = status;
  }
}

// 병원 좋아요 상태 조회 함수
async function fetchHospitalLikeStatus(hospitalId: string): Promise<GetHospitalLikeStatusResponse> {
  const response = await fetch(`/api/hospitals/${hospitalId}/like`);

  if (!response.ok) {
    if (response.status === 401) {
      throw new HospitalLikeApiError('로그인이 필요합니다', 401);
    }
    throw new HospitalLikeApiError(
      '좋아요 상태를 불러오는 중 오류가 발생했습니다',
      response.status,
    );
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || '좋아요 상태를 불러오는 중 오류가 발생했습니다');
  }

  return result.data;
}

// 병원 좋아요 토글 함수
async function toggleHospitalLike(hospitalId: string): Promise<HospitalLikeToggleResponse> {
  const response = await fetch(`/api/hospitals/${hospitalId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new HospitalLikeApiError('로그인이 필요합니다', 401);
    }
    if (response.status === 404) {
      throw new HospitalLikeApiError('병원을 찾을 수 없습니다', 404);
    }
    throw new HospitalLikeApiError('좋아요 처리 중 오류가 발생했습니다', response.status);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || '좋아요 처리 중 오류가 발생했습니다');
  }

  return result.data;
}

export function useHospitalLike({ hospitalId, enabled = true }: UseHospitalLikeOptions) {
  const queryClient = useQueryClient();
  const router = useLocalizedRouter();
  const [error, setError] = useState<HospitalLikeError | null>(null);

  // 좋아요 상태 조회 쿼리 (캐싱 없이 매번 요청)
  const {
    data: likeStatus,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: queryKeys.hospitalLike.status(hospitalId),
    queryFn: () => fetchHospitalLikeStatus(hospitalId),
    enabled: enabled && !!hospitalId,
    staleTime: 0, // 캐싱하지 않음 - 매번 요청
    gcTime: 0, // 가비지 컬렉션 시간도 0으로 설정
    retry: (failureCount, error) => {
      // 401 에러는 재시도하지 않음
      if (error instanceof HospitalLikeApiError && error.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });

  // 좋아요 토글 뮤테이션
  const toggleMutation = useMutation({
    mutationFn: () => toggleHospitalLike(hospitalId),
    onSuccess: (data) => {
      // 현재 병원의 좋아요 상태 캐시 업데이트
      queryClient.setQueryData(queryKeys.hospitalLike.status(hospitalId), data);

      // 병원 관련 모든 쿼리 invalidate (리스트, 상세, 좋아요한 병원 등)
      queryClient.invalidateQueries({
        queryKey: queryKeys.hospitals.all,
        exact: false, // 모든 hospitals 관련 쿼리를 invalidate
      });

      // 좋아요한 병원 리스트 쿼리도 별도로 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.hospitals.liked.all(),
        exact: false, // 모든 liked hospitals 쿼리를 invalidate
      });

      setError(null);
    },
    onError: (error: Error) => {
      // 401 에러인 경우 로그인 페이지로 리다이렉트
      if (error instanceof HospitalLikeApiError && error.status === 401) {
        router.push('/auth/login');
      }

      setError({
        message: error.message,
        status: error instanceof HospitalLikeApiError ? error.status : undefined,
      });
    },
  });

  // 에러 상태 동기화
  useEffect(() => {
    if (queryError) {
      setError({
        message: queryError.message,
        status: queryError instanceof HospitalLikeApiError ? queryError.status : undefined,
      });
    } else {
      setError(null);
    }
  }, [queryError]);

  const toggleLike = () => {
    if (!hospitalId) return;
    toggleMutation.mutate();
  };

  return {
    // 상태
    isLiked: likeStatus?.isLiked ?? false,
    likeCount: likeStatus?.likeCount ?? 0,

    // 로딩 상태
    isLoading,
    isToggling: toggleMutation.isPending,

    // 에러 상태
    error,

    // 액션
    toggleLike,

    // 유틸리티
    clearError: () => setError(null),
  };
}
