'use client';

import { useRef, useEffect, useCallback } from 'react';
import { type Locale } from 'shared/config';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type Dictionary } from 'shared/model/types';
import { type CmsContent } from './useKdocCmsContent';
import { useKdocChatFlow } from './useKdocChatFlow';
import { useKdocRealtimeChat } from './useKdocRealtimeChat';

interface UseKdocChatPageOptions {
  lang: Locale;
  dict: Dictionary;
  cmsContent: CmsContent | null;
  isCmsLoading: boolean;
  initialThreadId?: string | null;
}

export function useKdocChatPage({ lang: _lang, dict, cmsContent, isCmsLoading, initialThreadId = null }: UseKdocChatPageOptions) {
  const router = useLocalizedRouter();
  const bottomRef = useRef<HTMLDivElement>(null);
  const t = dict.kdocChat;

  const chatFlow = useKdocChatFlow(cmsContent, t.guestForm.infoMessage, initialThreadId);
  const { messages, isLoading: isMessagesLoading, sendMessage } = useKdocRealtimeChat({
    threadId: chatFlow.threadId,
  });

  // 빈 스레드 감지: 새 문의하기로 미리 생성된 스레드는 메시지가 없으므로 main_menu로 전환
  useEffect(() => {
    if (
      initialThreadId &&
      !isMessagesLoading &&
      messages.length === 0 &&
      chatFlow.phase === 'chat'
    ) {
      chatFlow.switchToMainMenuIfEmpty();
    }
  }, [initialThreadId, isMessagesLoading, messages.length, chatFlow.phase, chatFlow.switchToMainMenuIfEmpty]);

  const handleBack = useCallback(() => {
    const { phase, handleBackToMainMenu } = chatFlow;
    if (phase === 'main_menu' || phase === 'guest_submitted' || phase === 'chat') {
      // 히스토리 페이지에서 threadId를 지정해 진입한 경우 히스토리 페이지로 복귀
      if (initialThreadId) {
        router.push('/kdoc-consultation-history');
      } else {
        router.push('/');
      }
    } else {
      handleBackToMainMenu();
    }
  }, [chatFlow, router, initialThreadId]);

  const handleSend = useCallback(
    (text: string) => {
      const { phase, handleFreeInputSubmit, handleDirectMessageSubmit, transitionToChat } = chatFlow;
      if (phase === 'free_input') {
        handleFreeInputSubmit(text);
        return;
      }
      if (phase === 'main_menu' || phase === 'faq_subtree') {
        handleDirectMessageSubmit(text);
        return;
      }
      if (phase === 'guest_submitted') {
        transitionToChat();
      }
      sendMessage(text);
    },
    [chatFlow, sendMessage],
  );

  const handleMenu = useCallback(() => {
    router.push('/kdoc-consultation-history');
  }, [router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatFlow.phase]);

  const hasGuestInfo = !!(
    chatFlow.guestInfo.name ||
    chatFlow.guestInfo.email ||
    chatFlow.guestInfo.nationality
  );

  const welcomeText = cmsContent?.welcome ?? (isCmsLoading ? '' : t.welcome);

  const selectedCmsMenu = chatFlow.selectedCategory
    ? cmsContent?.menus.find((m) => m.key === chatFlow.selectedCategory) ?? null
    : null;

  const showInput =
    chatFlow.phase === 'chat' ||
    chatFlow.phase === 'guest_submitted' ||
    chatFlow.phase === 'free_input' ||
    chatFlow.phase === 'main_menu' ||
    chatFlow.phase === 'faq_subtree';

  return {
    bottomRef,
    t,
    chatFlow,
    messages,
    isMessagesLoading,
    hasGuestInfo,
    welcomeText,
    selectedCmsMenu,
    showInput,
    handleBack,
    handleSend,
    handleMenu,
  };
}
