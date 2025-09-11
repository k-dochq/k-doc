'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

// 병원 좋아요 상태 조회 함수
async function fetchHospitalLikeStatus(hospitalId: string): Promise<GetHospitalLikeStatusResponse> {
  const response = await fetch(`/api/hospitals/${hospitalId}/like`);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('로그인이 필요합니다');
    }
    throw new Error('좋아요 상태를 불러오는 중 오류가 발생했습니다');
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
      throw new Error('로그인이 필요합니다');
    }
    if (response.status === 404) {
      throw new Error('병원을 찾을 수 없습니다');
    }
    throw new Error('좋아요 처리 중 오류가 발생했습니다');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || '좋아요 처리 중 오류가 발생했습니다');
  }

  return result.data;
}

export function useHospitalLike({ hospitalId, enabled = true }: UseHospitalLikeOptions) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<HospitalLikeError | null>(null);

  // 좋아요 상태 조회 쿼리
  const {
    data: likeStatus,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ['hospital-like', hospitalId],
    queryFn: () => fetchHospitalLikeStatus(hospitalId),
    enabled: enabled && !!hospitalId,
    staleTime: 30 * 1000, // 30초
    gcTime: 5 * 60 * 1000, // 5분
    retry: (failureCount, error) => {
      // 401 에러는 재시도하지 않음
      if (error.message.includes('로그인이 필요합니다')) {
        return false;
      }
      return failureCount < 2;
    },
  });

  // 좋아요 토글 뮤테이션
  const toggleMutation = useMutation({
    mutationFn: () => toggleHospitalLike(hospitalId),
    onSuccess: (data) => {
      // 캐시 업데이트
      queryClient.setQueryData(['hospital-like', hospitalId], data);
      setError(null);
    },
    onError: (error: Error) => {
      setError({
        message: error.message,
        status: error.message.includes('로그인이 필요합니다') ? 401 : undefined,
      });
    },
  });

  // 에러 상태 동기화
  useEffect(() => {
    if (queryError) {
      setError({
        message: queryError.message,
        status: queryError.message.includes('로그인이 필요합니다') ? 401 : undefined,
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
