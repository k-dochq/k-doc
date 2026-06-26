'use client';

import { useState } from 'react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useCreateKdocThread } from 'lib/queries/kdoc-chat';

/**
 * 상담내역 페이지의 "새 문의하기" 버튼 로직.
 * 즉시 빈 스레드를 생성하고 해당 threadId로 kdoc-chat 페이지로 이동한다.
 * kdoc-chat 페이지에서 빈 스레드임을 감지하면 main_menu(초기 플로우)로 전환된다.
 */
export function useNewInquiry() {
  const router = useLocalizedRouter();
  const { mutateAsync: createThread } = useCreateKdocThread();
  const [isCreating, setIsCreating] = useState(false);

  const handleNewInquiry = async () => {
    if (isCreating) return;
    setIsCreating(true);
    try {
      // 카테고리는 OTHER_INQUIRY로 초기화; kdoc-chat에서 사용자가 선택하면 PATCH로 업데이트됨
      const thread = await createThread({ category: 'OTHER_INQUIRY' });
      router.push(`/kdoc-chat?threadId=${thread.id}`);
    } catch (e) {
      console.error('새 문의 스레드 생성 실패', e);
    } finally {
      setIsCreating(false);
    }
  };

  return { handleNewInquiry, isCreating };
}
