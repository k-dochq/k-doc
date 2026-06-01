'use client';

import { useState } from 'react';
import { createClient } from 'shared/lib/supabase/client';
import { type KdocChatCategory, type KdocChatPhase } from '../lib/chat-constants';

interface GuestInfo {
  name: string;
  email: string;
  nationality: string;
}

interface UseKdocChatFlowReturn {
  phase: KdocChatPhase;
  selectedCategory: KdocChatCategory | null;
  threadId: string | null;
  isCreatingThread: boolean;
  guestInfo: GuestInfo;
  setGuestInfo: (info: Partial<GuestInfo>) => void;
  handleCategorySelect: (category: KdocChatCategory) => Promise<void>;
  handleGuestSubmit: () => Promise<void>;
}

const supabase = createClient();

export function useKdocChatFlow(): UseKdocChatFlowReturn {
  const [phase, setPhase] = useState<KdocChatPhase>('category');
  const [selectedCategory, setSelectedCategory] = useState<KdocChatCategory | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isCreatingThread, setIsCreatingThread] = useState(false);
  const [guestInfo, setGuestInfoState] = useState<GuestInfo>({
    name: '',
    email: '',
    nationality: '',
  });

  const setGuestInfo = (partial: Partial<GuestInfo>) => {
    setGuestInfoState((prev) => ({ ...prev, ...partial }));
  };

  const createThread = async (
    category: KdocChatCategory,
    guest?: Partial<GuestInfo>,
  ): Promise<void> => {
    setIsCreatingThread(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) {
        await supabase.auth.signInAnonymously();
      }

      const res = await fetch('/api/kdoc-chat/thread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          guestName: guest?.name,
          guestEmail: guest?.email,
          guestNationality: guest?.nationality,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setThreadId(data.thread.id);
        setPhase('chat');
      }
    } catch (e) {
      console.error('thread 생성 실패', e);
    } finally {
      setIsCreatingThread(false);
    }
  };

  const handleCategorySelect = async (category: KdocChatCategory): Promise<void> => {
    if (selectedCategory) return;
    setSelectedCategory(category);

    const { data: { session } } = await supabase.auth.getSession();
    const isAnonymous = session?.user?.is_anonymous ?? true;

    if (isAnonymous) {
      setPhase('guest_form');
    } else {
      await createThread(category);
    }
  };

  const handleGuestSubmit = async (): Promise<void> => {
    if (!guestInfo.name.trim() || !guestInfo.email.trim() || !guestInfo.nationality.trim()) return;
    if (!selectedCategory) return;
    await createThread(selectedCategory, {
      name: guestInfo.name.trim(),
      email: guestInfo.email.trim(),
      nationality: guestInfo.nationality.trim(),
    });
  };

  return {
    phase,
    selectedCategory,
    threadId,
    isCreatingThread,
    guestInfo,
    setGuestInfo,
    handleCategorySelect,
    handleGuestSubmit,
  };
}
