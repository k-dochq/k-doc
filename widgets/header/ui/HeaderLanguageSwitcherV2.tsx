'use client';

import { ALL_LOCALE_LABELS, isComingSoonLocale, type Locale, type AllLocale } from 'shared/config';
import { localeCookies } from 'shared/lib';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { initFlowbite } from 'flowbite';
import { useAuth } from 'shared/lib/auth/useAuth';

interface HeaderLanguageSwitcherV2Props {
  currentLang?: Locale;
}

export function HeaderLanguageSwitcherV2({ currentLang = 'ko' }: HeaderLanguageSwitcherV2Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // 클라이언트 사이드 렌더링 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 현재 경로에서 locale 부분을 제거하고 나머지 경로만 추출
  const getPathWithoutLocale = (path: string) => {
    const pathSegments = path.split('/');
    // 첫 번째 세그먼트가 locale인 경우 제거 (지원되는 언어 + coming soon 언어 모두 체크)
    if (pathSegments.length > 1 && Object.keys(ALL_LOCALE_LABELS).includes(pathSegments[1])) {
      return '/' + pathSegments.slice(2).join('/');
    }
    return path;
  };

  const pathWithoutLocale = getPathWithoutLocale(pathname || '');

  // k-doc.kr 도메인 사용자인지 확인 (클라이언트에서만)
  const isKdocUser = isClient ? user?.email?.endsWith('@k-doc.kr') || false : false;

  // 표시할 언어 옵션 필터링 (Hydration-safe)
  // 지원되는 언어 + coming soon 언어 모두 표시
  const availableLocales = Object.entries(ALL_LOCALE_LABELS).filter(([localeKey]) => {
    // 클라이언트에서만 필터링 적용
    if (!isClient) {
      return true; // 서버에서는 모든 언어 표시
    }
    // k-doc.kr 사용자가 아니면 한국어 제외
    if (!isKdocUser && localeKey === 'ko') {
      return false;
    }
    return true;
  });

  // 지원되는 locale에 대해서만 prefetch 수행 (coming soon 언어는 제외)
  useEffect(() => {
    if (isClient) {
      availableLocales.forEach(([locale]) => {
        // 지원되는 언어에 대해서만 prefetch (coming soon 언어는 실제 라우트가 없을 수 있음)
        if (!isComingSoonLocale(locale)) {
          const prefetchPath = `/${locale}${pathWithoutLocale}`;
          router.prefetch(prefetchPath);
        }
      });
    }
  }, [router, pathWithoutLocale, availableLocales, isClient]);

  // Flowbite 초기화
  useEffect(() => {
    if (isClient) {
      initFlowbite();
    }
  }, [isClient]);

  // 언어 선택 시 쿠키에 저장하고 페이지 이동하는 핸들러
  const handleLanguageChange = (locale: AllLocale) => {
    // Coming soon 언어 또는 중국어 번체인 경우 알림 표시
    if (isComingSoonLocale(locale) || locale === 'zh-Hant') {
      const localeLabel = ALL_LOCALE_LABELS[locale];
      window.alert(`${localeLabel} is coming soon.`);
      return;
    }

    // 지원되는 언어인 경우에만 언어 변경
    localeCookies.set(locale as Locale);
    const newPath = `/${locale}${pathWithoutLocale}`;

    // 태국어로 변경하거나 태국어에서 다른 언어로 변경할 때는 새로고침
    if (locale === 'th' || currentLang === 'th') {
      window.location.href = newPath;
    } else {
      router.replace(newPath);
    }
  };

  return (
    <>
      <button
        id='languageDropdownButtonV2'
        data-dropdown-toggle='languageDropdownV2'
        className='rounded-lg text-neutral-900'
        aria-label='언어 선택'
        type='button'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
        >
          <path
            d='M21.25 12C21.25 9.54675 20.2754 7.19397 18.5407 5.45926C16.806 3.72455 14.4533 2.75 12 2.75M21.25 12H2.75M21.25 12C21.25 14.4533 20.2754 16.806 18.5407 18.5407C16.806 20.2754 14.4533 21.25 12 21.25M12 2.75C9.54675 2.75 7.19397 3.72455 5.45926 5.45926C3.72455 7.19397 2.75 9.54675 2.75 12M12 2.75C11.5 2.75 8 6.891 8 12C8 17.109 11.5 21.25 12 21.25M12 2.75C12.5 2.75 16 6.891 16 12C16 17.109 12.5 21.25 12 21.25M2.75 12C2.75 14.4533 3.72455 16.806 5.45926 18.5407C7.19397 20.2754 9.54675 21.25 12 21.25'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      <div
        id='languageDropdownV2'
        className='border-primary/20 z-20 hidden w-32 rounded-md border bg-white shadow-lg'
        style={{ position: 'absolute', right: 0, top: '100%', marginTop: '4px' }}
      >
        <ul className='py-1'>
          {availableLocales.map(([localeKey, label]) => {
            const isCurrentLang = currentLang === localeKey;

            return (
              <li key={localeKey}>
                <button
                  className={[
                    'w-full cursor-pointer px-4 py-2 text-left text-sm transition-colors',
                    isCurrentLang
                      ? 'bg-primary/10 text-primary-900 font-semibold'
                      : 'hover:bg-primary/5 hover:text-primary-900 text-neutral-900',
                  ].join(' ')}
                  onClick={() => handleLanguageChange(localeKey as AllLocale)}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
