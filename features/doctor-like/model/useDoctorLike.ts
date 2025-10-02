'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import type {
  GetDoctorLikeStatusResponse,
  DoctorLikeToggleResponse,
  DoctorLikeError,
  UseDoctorLikeOptions,
} from '../api/entities/types';

/**
 * 의사 좋아요 상태 조회 함수
 */
async function fetchDoctorLikeStatus(doctorId: string): Promise<GetDoctorLikeStatusResponse> {
  const response = await fetch(`/api/doctors/${doctorId}/like`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('의사를 찾을 수 없습니다');
    }
    throw new Error('좋아요 상태 조회 중 오류가 발생했습니다');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || '좋아요 상태 조회 중 오류가 발생했습니다');
  }

  return result.data;
}

/**
 * 의사 좋아요 토글 함수
 */
async function toggleDoctorLike(doctorId: string): Promise<DoctorLikeToggleResponse> {
  const response = await fetch(`/api/doctors/${doctorId}/like`, {
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
      throw new Error('의사를 찾을 수 없습니다');
    }
    throw new Error('좋아요 처리 중 오류가 발생했습니다');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || '좋아요 처리 중 오류가 발생했습니다');
  }

  return result.data;
}

/**
 * 의사 좋아요 훅
 */
export function useDoctorLike({ doctorId, enabled = true }: UseDoctorLikeOptions) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<DoctorLikeError | null>(null);

  // 좋아요 상태 조회 쿼리
  const {
    data: likeStatus,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: queryKeys.doctorLike.status(doctorId),
    queryFn: () => fetchDoctorLikeStatus(doctorId),
    enabled: enabled && !!doctorId,
    staleTime: 30 * 1000, // 30초
    gcTime: 5 * 60 * 1000, // 5분
    retry: (failureCount, error) => {
      // 일반적인 네트워크 에러만 재시도
      return failureCount < 2;
    },
  });

  // 좋아요 토글 뮤테이션
  const toggleMutation = useMutation({
    mutationFn: () => toggleDoctorLike(doctorId),
    onSuccess: (data) => {
      // 현재 의사의 좋아요 상태 캐시 업데이트
      queryClient.setQueryData(queryKeys.doctorLike.status(doctorId), data);

      // 좋아요한 의사 리스트 쿼리 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.doctors.liked.all(),
        exact: false, // 모든 liked doctors 쿼리를 invalidate
      });

      // 의사 리스트도 invalidate (likeCount 업데이트를 위해)
      queryClient.invalidateQueries({
        queryKey: queryKeys.doctors.all,
        exact: false,
      });

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
        status: undefined,
      });
    } else {
      setError(null);
    }
  }, [queryError]);

  const toggleLike = () => {
    if (!doctorId) return;
    toggleMutation.mutate();
  };

  return {
    // 상태
    isLiked: likeStatus?.isLiked ?? false,
    likeCount: likeStatus?.likeCount ?? 0,
    isLoading,
    isToggling: toggleMutation.isPending,
    error,

    // 액션
    toggleLike,

    // 유틸리티
    refetch: () => queryClient.invalidateQueries({ queryKey: queryKeys.doctorLike.status(doctorId) }),
  };
}
