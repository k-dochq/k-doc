import type { RealtimeChannel } from '@supabase/supabase-js';

export type RealtimeConnectionStatus =
  | 'CONNECTING'
  | 'SUBSCRIBED'
  | 'RECONNECTING'
  | 'FAILED'
  | 'CLOSED';

export interface RealtimeStatusEvent {
  status: RealtimeConnectionStatus;
  attempt: number;
  maxAttempts: number;
  reason?: string;
}

export interface SubscribeWithRetryOptions {
  channelFactory: () => RealtimeChannel;
  onChannel?: (channel: RealtimeChannel) => void;
  onStatusChange?: (event: RealtimeStatusEvent) => void;
  timeoutMs?: number;
  maxAttempts?: number;
  backoffMs?: number[];
}

export interface SubscribeWithRetryHandle {
  cleanup: () => void;
}

const DEFAULT_BACKOFF_MS = [2000, 5000, 10000, 20000, 30000];

export function subscribeWithRetry({
  channelFactory,
  onChannel,
  onStatusChange,
  timeoutMs = 60000,
  maxAttempts = 5,
  backoffMs = DEFAULT_BACKOFF_MS,
}: SubscribeWithRetryOptions): SubscribeWithRetryHandle {
  let cancelled = false;
  let attempt = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let currentChannel: RealtimeChannel | null = null;

  const emit = (status: RealtimeConnectionStatus, reason?: string) => {
    if (cancelled) return;
    onStatusChange?.({ status, attempt, maxAttempts, reason });
  };

  const scheduleRetry = (reason: string) => {
    if (cancelled) return;
    if (attempt >= maxAttempts) {
      emit('FAILED', reason);
      return;
    }
    const delay = backoffMs[Math.min(attempt - 1, backoffMs.length - 1)];
    emit('RECONNECTING', reason);
    timer = setTimeout(() => {
      timer = null;
      run();
    }, delay);
  };

  const run = () => {
    if (cancelled) return;
    attempt += 1;

    const channel = channelFactory();
    currentChannel = channel;
    onChannel?.(channel);

    emit(attempt === 1 ? 'CONNECTING' : 'RECONNECTING');

    channel.subscribe((status) => {
      if (cancelled) return;
      if (status === 'SUBSCRIBED') {
        attempt = 0;
        emit('SUBSCRIBED');
      } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        void channel.unsubscribe();
        scheduleRetry(status);
      } else if (status === 'CLOSED') {
        emit('CLOSED');
      }
    }, timeoutMs);
  };

  run();

  return {
    cleanup: () => {
      cancelled = true;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (currentChannel) {
        void currentChannel.unsubscribe();
        currentChannel = null;
      }
    },
  };
}
