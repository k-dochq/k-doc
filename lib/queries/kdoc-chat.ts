'use client';

import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type KdocChatCategory } from 'features/kdoc-consultation-chat/lib/chat-constants';
import { getGuestSession } from 'features/kdoc-consultation-chat/lib/guest-thread-storage';
import { createClient } from 'shared/lib/supabase/client';

// ────────────────────────────────────────────────────────────
// 타입
// ────────────────────────────────────────────────────────────

export interface KdocThread {
  id: string;
  status: 'ACTIVE' | 'PENDING' | 'CLOSED';
  category: KdocChatCategory;
  userId: string | null;
  guestName: string | null;
  guestEmail: string | null;
  guestNationality: string | null;
  createdAt: string;
  updatedAt: string;
  lastMessageContent: string | null;
  lastMessageDate: string | null;
  lastMessageSenderType: 'USER' | 'ADMIN' | null;
}

export interface KdocMessage {
  id: string;
  threadId: string;
  senderType: 'USER' | 'ADMIN';
  content: string;
  adminName: string | null;
  isRead: boolean | null;
  readAt: string | null;
  createdAt: string;
}

// ────────────────────────────────────────────────────────────
// Query Keys
// ────────────────────────────────────────────────────────────

export const kdocChatKeys = {
  all: ['kdoc-chat'] as const,
  threads: () => [...kdocChatKeys.all, 'threads'] as const,
  // 상담내역 페이지 전용 — useKdocThreads 캐시와 격리
  threadHistory: () => [...kdocChatKeys.all, 'thread-history'] as const,
  guestThreads: (ids: string[]) => [...kdocChatKeys.all, 'guest-threads', ids.join(',')] as const,
  messages: (threadId: string) => [...kdocChatKeys.all, 'messages', threadId] as const,
};

// ────────────────────────────────────────────────────────────
// Fetchers
// ────────────────────────────────────────────────────────────

async function fetchThreads(): Promise<KdocThread[]> {
  const res = await fetch('/api/kdoc-chat/thread');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'thread 조회 실패');
  return data.threads;
}

async function fetchGuestThreads(ids: string[]): Promise<KdocThread[]> {
  if (ids.length === 0) return [];
  const res = await fetch(`/api/kdoc-chat/thread?guestIds=${ids.join(',')}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || '게스트 thread 조회 실패');
  return data.threads;
}

async function checkIsLoggedIn(): Promise<boolean> {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return !!session?.user && !session.user.is_anonymous;
}

async function fetchMessages(threadId: string): Promise<KdocMessage[]> {
  const res = await fetch(`/api/kdoc-chat/thread/${threadId}/messages?limit=50`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || '메시지 조회 실패');
  return data.messages;
}

async function postCreateThread(params: {
  category: KdocChatCategory;
  guestName?: string;
  guestEmail?: string;
  guestNationality?: string;
}): Promise<KdocThread> {
  const res = await fetch('/api/kdoc-chat/thread', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'thread 생성 실패');
  return data.thread;
}

async function patchThread(params: {
  id: string;
  category?: KdocChatCategory;
  guestName?: string;
  guestEmail?: string;
  guestNationality?: string;
}): Promise<KdocThread> {
  const { id, ...body } = params;
  const res = await fetch(`/api/kdoc-chat/thread/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'thread 업데이트 실패');
  return data.thread;
}

async function postSendMessage(params: {
  threadId: string;
  content: string;
}): Promise<KdocMessage> {
  const res = await fetch(`/api/kdoc-chat/thread/${params.threadId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: params.content }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || '메시지 전송 실패');
  return data.message;
}

// ────────────────────────────────────────────────────────────
// Hooks
// ────────────────────────────────────────────────────────────

/** 현재 사용자의 thread 목록 조회 */
export function useKdocThreads({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: kdocChatKeys.threads(),
    queryFn: fetchThreads,
    enabled,
    staleTime: 0,
    retry: 2,
  });
}

/**
 * 상담내역 페이지용 훅.
 * - 로그인 유저: 서버에서 전체 thread 목록 조회
 * - 게스트: localStorage의 threadId로 해당 thread만 조회
 * 두 결과를 updatedAt 기준으로 합산 반환.
 */
export function useKdocThreadHistory() {
  const guestSession = typeof window !== 'undefined' ? getGuestSession() : null;
  const guestIds = guestSession?.threadId ? [guestSession.threadId] : [];

  const loggedInQuery = useQuery({
    queryKey: kdocChatKeys.threadHistory(),
    queryFn: async () => {
      const isLoggedIn = await checkIsLoggedIn();
      if (!isLoggedIn) return [];
      return fetchThreads();
    },
    staleTime: 0,
    retry: 2,
  });

  const guestQuery = useQuery({
    queryKey: kdocChatKeys.guestThreads(guestIds),
    queryFn: () => fetchGuestThreads(guestIds),
    enabled: guestIds.length > 0,
    staleTime: 0,
    retry: 2,
  });

  const threads = useMemo(() => {
    const all = [
      ...(loggedInQuery.data ?? []),
      ...(guestQuery.data ?? []),
    ];
    const seen = new Set<string>();
    return all
      .filter((t) => {
        if (seen.has(t.id)) return false;
        seen.add(t.id);
        return true;
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [loggedInQuery.data, guestQuery.data]);

  return {
    threads,
    isLoading: loggedInQuery.isLoading || guestQuery.isLoading,
    error: loggedInQuery.error || guestQuery.error,
  };
}

/** 특정 thread의 메시지 목록 조회 */
export function useKdocMessages(threadId: string | null) {
  return useQuery({
    queryKey: kdocChatKeys.messages(threadId ?? ''),
    queryFn: () => fetchMessages(threadId!),
    enabled: !!threadId,
    staleTime: 0,
    retry: 2,
  });
}

/** thread 생성 */
export function useCreateKdocThread() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCreateThread,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: kdocChatKeys.threads() });
    },
  });
}

/** thread 정보 업데이트 (category, 게스트 정보) */
export function useUpdateKdocThread() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchThread,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: kdocChatKeys.threads() });
      queryClient.invalidateQueries({ queryKey: kdocChatKeys.threadHistory() });
    },
  });
}

/** 메시지 전송 */
export function useSendKdocMessage(threadId: string | null) {
  return useMutation({
    mutationFn: (content: string) => postSendMessage({ threadId: threadId!, content }),
  });
}
