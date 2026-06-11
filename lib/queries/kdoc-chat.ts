'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type KdocChatCategory } from 'features/kdoc-consultation-chat/lib/chat-constants';

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
  autoReplyMessage?: string;
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

/** 메시지 전송 */
export function useSendKdocMessage(threadId: string | null) {
  return useMutation({
    mutationFn: (content: string) => postSendMessage({ threadId: threadId!, content }),
  });
}
