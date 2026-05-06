const STORAGE_KEY = 'appDownloadBannerDismissedDate';

export function getTodayKey(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDismissedDate(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setDismissedToday(now: Date = new Date()): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, getTodayKey(now));
  } catch {
    // localStorage 사용 불가(시크릿 모드 등) — 같은 세션에서만 닫혀도 OK
  }
}

export function isDismissedToday(now: Date = new Date()): boolean {
  return getDismissedDate() === getTodayKey(now);
}
