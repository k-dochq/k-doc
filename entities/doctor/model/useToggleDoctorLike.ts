'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';

interface UseToggleDoctorLikeParams {
  queryParams?: {
    hospitalId?: string;
    [key: string]: unknown;
  };
}

/**
 * 의사 좋아요 토글 뮤테이션 훅
 */
export function useToggleDoctorLike({ queryParams }: UseToggleDoctorLikeParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (doctorId: string) => {
      // API 호출
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

      return result;
    },
    onSuccess: () => {
      // 의사 관련 모든 쿼리 invalidate (리스트, 상세, 좋아요한 의사 등)
      queryClient.invalidateQueries({
        queryKey: queryKeys.doctors.all,
        exact: false, // 모든 doctors 관련 쿼리를 invalidate
      });

      // 좋아요한 의사 리스트 쿼리도 별도로 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.doctors.liked.all(),
        exact: false, // 모든 liked doctors 쿼리를 invalidate
      });

      // 의사 좋아요 상태 쿼리도 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.doctorLike.all,
        exact: false, // 모든 doctor-like 쿼리를 invalidate
      });

      // 병원 상세 페이지의 의사 목록도 업데이트
      if (queryParams?.hospitalId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.doctors.hospital(queryParams.hospitalId),
          exact: false,
        });
      }
    },
    onError: (error: Error) => {
      console.error('좋아요 처리 중 오류:', error.message);
      // alert 대신 에러를 상위 컴포넌트에서 처리하도록 함
      // 401 에러는 상위 컴포넌트에서 LoginRequiredModal로 처리됨
    },
  });
}
