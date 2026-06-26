const STORAGE_KEY = 'kdoc_chat_floating_dismissed_at';
const COOLDOWN_MS = 3 * 60 * 60 * 1000; // 3시간

export function isDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  return Date.now() - Number(raw) < COOLDOWN_MS;
}

export function dismiss(): void {
  localStorage.setItem(STORAGE_KEY, String(Date.now()));
}
