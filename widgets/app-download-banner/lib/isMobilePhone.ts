/**
 * 모바일 "폰"에서만 true를 반환한다. 태블릿/데스크탑은 제외.
 *
 * - Android: UA에 "Android" 와 "Mobile"이 둘 다 있어야 폰으로 간주 (태블릿은 "Mobile" 없음)
 * - iOS: iPhone / iPod만 폰. iPad는 제외 (iPadOS 13+에서 "Macintosh"로 위장하는 케이스도 데스크톱 동작이라 제외)
 * - 기타 모바일 (BlackBerry, Opera Mini 등) 폴백 포함
 */
export function isMobilePhone(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;

  if (/iPhone|iPod/i.test(ua)) return true;

  if (/Android/i.test(ua)) {
    return /Mobile/i.test(ua);
  }

  return /webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}
