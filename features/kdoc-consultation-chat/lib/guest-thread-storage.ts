const STORAGE_KEY = 'kdoc_guest_session';

interface StoredGuestSession {
  threadId: string;
  categoryLabel: string;
  guestInfo: {
    name: string;
    email: string;
    nationality: string;
  };
}

export function getGuestSession(): StoredGuestSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredGuestSession) : null;
  } catch {
    return null;
  }
}

export function setGuestSession(session: StoredGuestSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearGuestSession(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// 하위 호환 — threadId만 필요한 곳에서 사용
export function getGuestThreadId(): string | null {
  return getGuestSession()?.threadId ?? null;
}
