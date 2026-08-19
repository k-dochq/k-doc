import { type Locale } from 'shared/config';

/**
 * 비로그인 상태에서 상담 버튼을 누른 경우, 보낼 메시지를 로그인 이후까지 들고 있어야 한다.
 * 로그인 화면을 거치면서 컴포넌트 상태가 날아가므로 sessionStorage 에 맡긴다.
 */
export interface PendingConsult {
  content: string;
  lang: Locale;
}

export function savePendingConsult(storageKey: string, pending: PendingConsult): void {
  sessionStorage.setItem(storageKey, JSON.stringify(pending));
}

/** 한 번 꺼내면 지운다 — 다음 로그인 때 옛 메시지가 다시 발송되면 안 된다. */
export function takePendingConsult(storageKey: string): PendingConsult | null {
  const raw = sessionStorage.getItem(storageKey);
  if (!raw) return null;

  sessionStorage.removeItem(storageKey);

  try {
    return JSON.parse(raw) as PendingConsult;
  } catch {
    return null;
  }
}
