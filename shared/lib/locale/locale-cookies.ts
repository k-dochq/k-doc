'use client';

import { type Locale } from 'shared/config';

const LOCALE_COOKIE_NAME = 'locale';

export const localeCookies = {
  get(): Locale | null {
    if (typeof document === 'undefined') return null;

    const cookies = document.cookie.split(';');
    const localeCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${LOCALE_COOKIE_NAME}=`),
    );

    if (!localeCookie) return null;

    const value = localeCookie.split('=')[1];
    return value as Locale;
  },

  set(locale: Locale): void {
    if (typeof document === 'undefined') return;

    // 쿠키 만료일을 1년으로 설정
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  },

  remove(): void {
    if (typeof document === 'undefined') return;

    document.cookie = `${LOCALE_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
};
