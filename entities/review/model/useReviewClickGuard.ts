'use client';

import { type MouseEvent, useCallback } from 'react';
import { type Dictionary } from 'shared/model/types';

const FALLBACK_LINE1_KO = '해당 병원의 리뷰 상세는 현재 준비 중입니다.';
const FALLBACK_LINE2_KO = '준비가 완료되는 대로 제공될 예정입니다.';
const FALLBACK_LINE1_EN = 'Detailed reviews for this clinic are currently being prepared.';
const FALLBACK_LINE2_EN = 'They will be available once preparation is complete.';

/**
 * dict.review.reviewDetailPreparing 에서 2줄 메시지를 읽어 \n 으로 합친 문자열 반환.
 * 키가 없을 경우 한/영 fallback 사용.
 */
export function buildReviewPreparingMessage(dict: Dictionary): string {
  const line1 =
    dict.review?.reviewDetailPreparing?.line1 ?? FALLBACK_LINE1_KO;
  const line2 =
    dict.review?.reviewDetailPreparing?.line2 ?? FALLBACK_LINE2_KO;
  return `${line1}\n${line2}`;
}

/**
 * REJECTED 병원 리뷰 카드 클릭 시 리뷰 상세로 이동만 막기 위한 onClick 핸들러를 반환.
 * approvalStatusType === 'REJECTED' 이고 message 가 있으면 preventDefault.
 */
export function useReviewClickGuard(
  approvalStatusType: 'PENDING' | 'APPROVED' | 'REJECTED' | null | undefined,
  message: string | undefined,
): (e: MouseEvent<HTMLAnchorElement>) => void {
  return useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (approvalStatusType === 'REJECTED' && message) {
        e.preventDefault();
      }
    },
    [approvalStatusType, message],
  );
}
