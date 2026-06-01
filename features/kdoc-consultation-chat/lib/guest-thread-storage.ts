const STORAGE_KEY = 'kdoc_guest_thread_id';

export function getGuestThreadId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function setGuestThreadId(threadId: string): void {
  localStorage.setItem(STORAGE_KEY, threadId);
}

export function clearGuestThreadId(): void {
  localStorage.removeItem(STORAGE_KEY);
}
