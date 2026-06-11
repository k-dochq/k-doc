'use client';

import { useState, useEffect } from 'react';
import { createClient } from 'shared/lib/supabase/client';
import { type KdocChatCategory, type KdocChatPhase } from '../lib/chat-constants';
import { useKdocThreads, useCreateKdocThread } from 'lib/queries/kdoc-chat';
import { getGuestSession, setGuestSession } from '../lib/guest-thread-storage';
import { checkBusinessHoursInKorea } from 'shared/lib/business-hours';
import { type CmsContent } from './useKdocCmsContent';

interface GuestInfo {
  name: string;
  email: string;
  nationality: string;
}

interface UseKdocChatFlowReturn {
  phase: KdocChatPhase;
  selectedCategory: KdocChatCategory | null;
  selectedCategoryLabel: string | null;
  freeInputMessage: string | null;
  threadId: string | null;
  isCreatingThread: boolean;
  guestInfo: GuestInfo;
  setGuestInfo: (info: Partial<GuestInfo>) => void;
  handleCategorySelect: (category: KdocChatCategory, label: string) => Promise<void>;
  handleFreeInputSubmit: (message: string) => Promise<void>;
  handleFaqConsult: () => Promise<void>;
  handleBackToMainMenu: () => void;
  handleGuestSubmit: () => Promise<void>;
  handleEditGuestInfo: () => void;
  transitionToChat: () => void;
}

const supabase = createClient();

export function useKdocChatFlow(cmsContent: CmsContent | null): UseKdocChatFlowReturn {
  const [phase, setPhase] = useState<KdocChatPhase>('main_menu');
  const [selectedCategory, setSelectedCategory] = useState<KdocChatCategory | null>(null);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState<string | null>(null);
  const [freeInputMessage, setFreeInputMessage] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
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
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const loggedIn = !!session?.user?.id && !session.user.is_anonymous;
      setIsLoggedIn(loggedIn);

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
  }, []);

  // 회원: DB에서 활성 thread 복원
  const { data: threads } = useKdocThreads({ enabled: isLoggedIn });

  useEffect(() => {
    if (!threads || threadId) return;
    const active = threads.find((t) => t.status === 'ACTIVE');
    if (active) {
      setThreadId(active.id);
      setPhase('chat');
    }
  }, [threads, threadId]);

  const { mutateAsync: createThread, isPending: isCreatingThread } = useCreateKdocThread();

  const createAndEnterThread = async (
    category: KdocChatCategory,
    firstMessage: string,
    guest?: Partial<GuestInfo>,
    categoryLabel?: string,
  ): Promise<void> => {
    try {
      const { isBusinessHours } = checkBusinessHoursInKorea();
      const autoReplyMessage = isBusinessHours
        ? cmsContent?.completionMessages.inHours
        : cmsContent?.completionMessages.outOfHours;

      const thread = await createThread({
        category,
        guestName: guest?.name,
        guestEmail: guest?.email,
        guestNationality: guest?.nationality,
        autoReplyMessage,
      });

      if (guest) {
        setGuestSession({
          threadId: thread.id,
          categoryLabel: categoryLabel ?? category,
          guestInfo: {
            name: guest.name ?? '',
            email: guest.email ?? '',
            nationality: guest.nationality ?? '',
          },
        });
      }

      await fetch(`/api/kdoc-chat/thread/${thread.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: firstMessage }),
      });

      setThreadId(thread.id);
      setPhase(guest ? 'guest_submitted' : 'chat');
    } catch (e) {
      console.error('thread 생성 실패', e);
    }
  };

  const handleCategorySelect = async (category: KdocChatCategory, label: string): Promise<void> => {
    if (selectedCategory) return;
    setSelectedCategory(category);
    setSelectedCategoryLabel(label);

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
      await createAndEnterThread(selectedCategory, trimmed, undefined, selectedCategoryLabel ?? undefined);
    }
  };

  const handleFaqConsult = async (): Promise<void> => {
    if (!selectedCategory) return;

    const { data: { session } } = await supabase.auth.getSession();
    const isGuest = !session?.user?.id || session.user.is_anonymous;

    if (isGuest) {
      setPhase('guest_form');
    } else {
      const label = selectedCategoryLabel ?? selectedCategory;
      await createAndEnterThread(selectedCategory, label, undefined, label);
    }
  };

  const handleBackToMainMenu = (): void => {
    setSelectedCategory(null);
    setSelectedCategoryLabel(null);
    setFreeInputMessage(null);
    setPhase('main_menu');
  };

  const handleGuestSubmit = async (): Promise<void> => {
    if (!guestInfo.name.trim() || !guestInfo.email.trim() || !guestInfo.nationality.trim()) return;
    if (!selectedCategory) return;

    const firstMessage = freeInputMessage ?? selectedCategoryLabel ?? selectedCategory;
    await createAndEnterThread(
      selectedCategory,
      firstMessage,
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
    threadId,
    isCreatingThread,
    guestInfo,
    setGuestInfo,
    handleCategorySelect,
    handleFreeInputSubmit,
    handleFaqConsult,
    handleBackToMainMenu,
    handleGuestSubmit,
    handleEditGuestInfo,
    transitionToChat,
  };
}
