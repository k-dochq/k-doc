'use client';

import { useState, useEffect } from 'react';
import { createClient } from 'shared/lib/supabase/client';
import { type KdocChatCategory, type KdocChatPhase } from '../lib/chat-constants';
import { useKdocThreads, useCreateKdocThread, useUpdateKdocThread } from 'lib/queries/kdoc-chat';
import { getGuestSession, setGuestSession } from '../lib/guest-thread-storage';
import { checkBusinessHoursInKorea } from 'shared/lib/business-hours';
import { type CmsContent } from './useKdocCmsContent';
import { type GuestInfo } from '../ui/KdocGuestInfoForm';

type ChatMessage = { content: string; senderType: 'USER' | 'ADMIN' };

export type FaqSelectedItem = {
  title: string;
  content: string;
  consultLabel: string;
  mainMenuLabel: string;
  showConsultButton: boolean;
  showMenuButton: boolean;
};

export type MainMenuHistory = {
  categoryLabel: string;
  faqItem: FaqSelectedItem;
  returnLabel: string;
};

interface UseKdocChatFlowReturn {
  phase: KdocChatPhase;
  selectedCategory: KdocChatCategory | null;
  selectedCategoryLabel: string | null;
  freeInputMessage: string | null;
  faqSelectedItem: FaqSelectedItem | null;
  mainMenuHistory: MainMenuHistory | null;
  threadId: string | null;
  isCreatingThread: boolean;
  guestInfo: GuestInfo;
  setGuestInfo: (info: Partial<GuestInfo>) => void;
  handleCategorySelect: (category: KdocChatCategory, label: string) => Promise<void>;
  handleFreeInputSubmit: (message: string) => Promise<void>;
  handleDirectMessageSubmit: (message: string) => Promise<void>;
  handleFaqConsult: (item: FaqSelectedItem) => Promise<void>;
  handleReturnToMainMenu: (context: { faqItem: FaqSelectedItem | null; returnLabel: string }) => void;
  handleBackToMainMenu: () => void;
  handleGuestSubmit: () => Promise<void>;
  handleEditGuestInfo: () => void;
  transitionToChat: () => void;
  switchToMainMenuIfEmpty: () => void;
}

const supabase = createClient();

const postMessage = async (threadId: string, content: string, senderType: 'USER' | 'ADMIN' = 'USER') => {
  await fetch(`/api/kdoc-chat/thread/${threadId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, senderType }),
  });
};

export function useKdocChatFlow(
  cmsContent: CmsContent | null,
  infoMessage: string,
  initialThreadId: string | null = null,
): UseKdocChatFlowReturn {
  // initialThreadId가 있으면 chat 단계로 시작 (빈 스레드면 useKdocChatPage에서 main_menu로 전환)
  const [phase, setPhase] = useState<KdocChatPhase>(initialThreadId ? 'chat' : 'main_menu');
  const [selectedCategory, setSelectedCategory] = useState<KdocChatCategory | null>(null);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState<string | null>(null);
  const [freeInputMessage, setFreeInputMessage] = useState<string | null>(null);
  const [faqSelectedItem, setFaqSelectedItem] = useState<FaqSelectedItem | null>(null);
  const [mainMenuHistory, setMainMenuHistory] = useState<MainMenuHistory | null>(null);
  const [threadId, setThreadId] = useState<string | null>(initialThreadId);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guestInfo, setGuestInfoState] = useState<GuestInfo>({
    name: '',
    email: '',
    nationality: '',
  });

  const setGuestInfo = (partial: Partial<GuestInfo>) => {
    setGuestInfoState((prev) => ({ ...prev, ...partial }));
  };

  // 세션 확인 + 기존 thread 복원
  // initialThreadId가 있으면 특정 스레드로 진입 — 복원 skip
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const loggedIn = !!session?.user?.id && !session.user.is_anonymous;
      setIsLoggedIn(loggedIn);

      if (initialThreadId) return;

      if (!loggedIn) {
        const saved = getGuestSession();
        if (saved) {
          setThreadId(saved.threadId);
          setSelectedCategoryLabel(saved.categoryLabel);
          setGuestInfoState(saved.guestInfo);
          setPhase('chat');
        }
      }
    });
  }, [initialThreadId]);

  // 회원: DB에서 최신 활성 thread 복원 (initialThreadId 없을 때만)
  const { data: threads } = useKdocThreads({ enabled: isLoggedIn && !initialThreadId });

  useEffect(() => {
    if (initialThreadId) return;
    if (!threads || threadId) return;

    // 최신 활성 스레드를 우선 복원
    const latest = [...threads]
      .filter((t) => t.status === 'ACTIVE')
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];

    if (latest) {
      setThreadId(latest.id);
      setPhase('chat');
    }
  }, [threads, threadId, initialThreadId]);

  const { mutateAsync: createThread, isPending: isCreatingThread } = useCreateKdocThread();
  const { mutateAsync: updateThread } = useUpdateKdocThread();

  const getAutoReplyMessage = () => {
    const { isBusinessHours } = checkBusinessHoursInKorea();
    return isBusinessHours
      ? cmsContent?.completionMessages.inHours
      : cmsContent?.completionMessages.outOfHours;
  };

  /**
   * thread를 생성(또는 기존 thread 재사용)하고 messages를 순서대로 DB에 저장한 뒤 phase를 전환한다.
   * threadId가 이미 설정되어 있으면 (새 문의하기로 미리 생성된 경우) 스레드 생성을 건너뛴다.
   */
  const createAndEnterThread = async (
    category: KdocChatCategory,
    messages: ChatMessage[],
    guest?: Partial<GuestInfo>,
    categoryLabel?: string,
  ): Promise<void> => {
    try {
      let tid = threadId;

      if (!tid) {
        // 새 스레드 생성
        const thread = await createThread({
          category,
          guestName: guest?.name,
          guestEmail: guest?.email,
          guestNationality: guest?.nationality,
        });
        tid = thread.id;
        setThreadId(tid);
      } else {
        // 기존 스레드 업데이트 (새 문의하기로 미리 생성된 스레드)
        await updateThread({
          id: tid,
          category,
          ...(guest?.name !== undefined && { guestName: guest.name }),
          ...(guest?.email !== undefined && { guestEmail: guest.email }),
          ...(guest?.nationality !== undefined && { guestNationality: guest.nationality }),
        });
      }

      if (guest) {
        setGuestSession({
          threadId: tid,
          categoryLabel: categoryLabel ?? category,
          guestInfo: {
            name: guest.name ?? '',
            email: guest.email ?? '',
            nationality: guest.nationality ?? '',
          },
        });
      }

      // 순서대로 순차 저장 (병렬 금지 — DB 저장 순서 = 시간순)
      for (const msg of messages) {
        await postMessage(tid, msg.content, msg.senderType);
      }

      setPhase(guest ? 'guest_submitted' : 'chat');
    } catch (e) {
      console.error('thread 생성/업데이트 실패', e);
    }
  };

  const handleCategorySelect = async (category: KdocChatCategory, label: string): Promise<void> => {
    if (selectedCategory) return;
    setSelectedCategory(category);
    setSelectedCategoryLabel(label);

    // 미리 생성된 스레드가 있으면 카테고리 업데이트
    if (threadId) {
      updateThread({ id: threadId, category }).catch(console.error);
    }

    const cmsMenu = cmsContent?.menus.find((m) => m.key === category);
    const nextPhase: KdocChatPhase = cmsMenu?.hasSubMenu ? 'faq_subtree' : 'free_input';
    setPhase(nextPhase);
  };

  const handleFreeInputSubmit = async (message: string): Promise<void> => {
    if (!message.trim() || !selectedCategory) return;
    const trimmed = message.trim();
    setFreeInputMessage(trimmed);

    const { data: { session } } = await supabase.auth.getSession();
    const isGuest = !session?.user?.id || session.user.is_anonymous;

    if (isGuest) {
      setPhase('guest_form');
    } else {
      const cmsMenu = cmsContent?.menus.find((m) => m.key === selectedCategory);
      const autoReply = getAutoReplyMessage();
      const messages: ChatMessage[] = [
        ...(selectedCategoryLabel ? [{ content: selectedCategoryLabel, senderType: 'USER' as const }] : []),
        ...(cmsMenu?.prompt ? [{ content: cmsMenu.prompt, senderType: 'ADMIN' as const }] : []),
        { content: trimmed, senderType: 'USER' },
        ...(autoReply ? [{ content: autoReply, senderType: 'ADMIN' as const }] : []),
      ];
      await createAndEnterThread(selectedCategory, messages, undefined, selectedCategoryLabel ?? undefined);
    }
  };

  /**
   * main_menu / faq_subtree 단계에서 사용자가 직접 텍스트를 입력했을 때 처리.
   * - 카테고리 미선택 시 OTHER_INQUIRY 기본 사용
   * - 비회원 + 정보 미입력: guest_form으로 전환
   * - 비회원 + 정보 기입력(동일 세션) 또는 기존 thread: 바로 thread 생성/전송
   * - 회원: 바로 thread 생성
   */
  const handleDirectMessageSubmit = async (message: string): Promise<void> => {
    if (!message.trim()) return;
    const trimmed = message.trim();

    const category = selectedCategory ?? 'OTHER_INQUIRY';
    const label = selectedCategoryLabel ?? undefined;

    if (!selectedCategory) {
      setSelectedCategory('OTHER_INQUIRY');
    }
    setFreeInputMessage(trimmed);

    const { data: { session } } = await supabase.auth.getSession();
    const isGuest = !session?.user?.id || session.user.is_anonymous;

    if (!isGuest) {
      const autoReply = getAutoReplyMessage();
      const messages: ChatMessage[] = [
        ...(label ? [{ content: label, senderType: 'USER' as const }] : []),
        { content: trimmed, senderType: 'USER' },
        ...(autoReply ? [{ content: autoReply, senderType: 'ADMIN' as const }] : []),
      ];
      await createAndEnterThread(category, messages, undefined, label);
      return;
    }

    // 비회원: 기존 thread가 있으면 해당 thread에 메시지만 추가
    if (threadId) {
      await postMessage(threadId, trimmed, 'USER');
      setPhase('chat');
      return;
    }

    const hasGuestInfo =
      guestInfo.name.trim() && guestInfo.email.trim() && guestInfo.nationality.trim();

    if (hasGuestInfo) {
      const autoReply = getAutoReplyMessage();
      const messages: ChatMessage[] = [
        ...(label ? [{ content: label, senderType: 'USER' as const }] : []),
        { content: trimmed, senderType: 'USER' },
        { content: infoMessage, senderType: 'ADMIN' },
        ...(autoReply ? [{ content: autoReply, senderType: 'ADMIN' as const }] : []),
      ];
      await createAndEnterThread(
        category,
        messages,
        { name: guestInfo.name.trim(), email: guestInfo.email.trim(), nationality: guestInfo.nationality.trim() },
        label,
      );
    } else {
      setPhase('guest_form');
    }
  };

  const handleFaqConsult = async (item: FaqSelectedItem): Promise<void> => {
    if (!selectedCategory) return;

    const { data: { session } } = await supabase.auth.getSession();
    const isGuest = !session?.user?.id || session.user.is_anonymous;

    if (isGuest) {
      setFaqSelectedItem(item);
      setPhase('guest_form');
    } else {
      const label = selectedCategoryLabel ?? selectedCategory;
      const autoReply = getAutoReplyMessage();
      const messages: ChatMessage[] = [
        { content: label, senderType: 'USER' },
        { content: item.title, senderType: 'USER' },
        { content: item.content, senderType: 'ADMIN' },
        { content: item.consultLabel, senderType: 'USER' },
        ...(autoReply ? [{ content: autoReply, senderType: 'ADMIN' as const }] : []),
      ];
      await createAndEnterThread(selectedCategory, messages, undefined, label);
    }
  };

  /**
   * "메인 메뉴" 버튼 클릭 — 이전 대화 이력을 mainMenuHistory에 보존한 뒤 메인 메뉴로 복귀.
   */
  const handleReturnToMainMenu = (context: { faqItem: FaqSelectedItem | null; returnLabel: string }): void => {
    if (context.faqItem && selectedCategoryLabel) {
      setMainMenuHistory({
        categoryLabel: selectedCategoryLabel,
        faqItem: context.faqItem,
        returnLabel: context.returnLabel,
      });
    }
    setSelectedCategory(null);
    setSelectedCategoryLabel(null);
    setFreeInputMessage(null);
    setFaqSelectedItem(null);
    setPhase('main_menu');
  };

  /** GNB 뒤로 버튼 — 모든 선택 상태 초기화 (threadId는 유지) */
  const handleBackToMainMenu = (): void => {
    setSelectedCategory(null);
    setSelectedCategoryLabel(null);
    setFreeInputMessage(null);
    setFaqSelectedItem(null);
    setMainMenuHistory(null);
    setPhase('main_menu');
  };

  /**
   * 외부(useKdocChatPage)에서 빈 스레드 감지 시 호출.
   * chat 단계이지만 메시지가 없으면 main_menu로 전환.
   */
  const switchToMainMenuIfEmpty = (): void => {
    setPhase('main_menu');
  };

  const handleGuestSubmit = async (): Promise<void> => {
    if (!guestInfo.name.trim() || !guestInfo.email.trim() || !guestInfo.nationality.trim()) return;
    if (!selectedCategory) return;

    const cmsMenu = cmsContent?.menus.find((m) => m.key === selectedCategory);
    const autoReply = getAutoReplyMessage();

    const messages: ChatMessage[] = [
      ...(selectedCategoryLabel ? [{ content: selectedCategoryLabel, senderType: 'USER' as const }] : []),
      ...(faqSelectedItem ? [
        { content: faqSelectedItem.title, senderType: 'USER' as const },
        { content: faqSelectedItem.content, senderType: 'ADMIN' as const },
        { content: faqSelectedItem.consultLabel, senderType: 'USER' as const },
      ] : []),
      ...(!faqSelectedItem && cmsMenu?.prompt ? [{ content: cmsMenu.prompt, senderType: 'ADMIN' as const }] : []),
      ...(!faqSelectedItem && freeInputMessage ? [{ content: freeInputMessage, senderType: 'USER' as const }] : []),
      { content: infoMessage, senderType: 'ADMIN' },
      ...(autoReply ? [{ content: autoReply, senderType: 'ADMIN' as const }] : []),
    ];

    await createAndEnterThread(
      selectedCategory,
      messages,
      { name: guestInfo.name.trim(), email: guestInfo.email.trim(), nationality: guestInfo.nationality.trim() },
      selectedCategoryLabel ?? undefined,
    );
  };

  const handleEditGuestInfo = (): void => {
    setPhase('guest_form');
  };

  const transitionToChat = (): void => {
    setPhase('chat');
  };

  return {
    phase,
    selectedCategory,
    selectedCategoryLabel,
    freeInputMessage,
    faqSelectedItem,
    mainMenuHistory,
    threadId,
    isCreatingThread,
    guestInfo,
    setGuestInfo,
    handleCategorySelect,
    handleFreeInputSubmit,
    handleDirectMessageSubmit,
    handleFaqConsult,
    handleReturnToMainMenu,
    handleBackToMainMenu,
    handleGuestSubmit,
    handleEditGuestInfo,
    transitionToChat,
    switchToMainMenuIfEmpty,
  };
}
