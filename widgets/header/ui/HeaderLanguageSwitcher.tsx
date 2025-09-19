'use client';

import { LOCALE_LABELS, type Locale } from 'shared/config';
import { localeCookies } from 'shared/lib';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'shared/ui/dropdown-menu';

interface HeaderLanguageSwitcherProps {
  currentLang?: Locale;
}

export function HeaderLanguageSwitcher({ currentLang = 'ko' }: HeaderLanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  // 현재 경로에서 locale 부분을 제거하고 나머지 경로만 추출
  const getPathWithoutLocale = (path: string) => {
    const pathSegments = path.split('/');
    // 첫 번째 세그먼트가 locale인 경우 제거
    if (pathSegments.length > 1 && Object.keys(LOCALE_LABELS).includes(pathSegments[1])) {
      return '/' + pathSegments.slice(2).join('/');
    }
    return path;
  };

  const pathWithoutLocale = getPathWithoutLocale(pathname || '');

  // 모든 locale에 대해 prefetch 수행
  useEffect(() => {
    Object.keys(LOCALE_LABELS).forEach((locale) => {
      const prefetchPath = `/${locale}${pathWithoutLocale}`;
      router.prefetch(prefetchPath);
    });
  }, [router, pathWithoutLocale]);

  // 언어 선택 시 쿠키에 저장하고 페이지 이동하는 핸들러
  const handleLanguageChange = (locale: Locale) => {
    localeCookies.set(locale);
    const newPath = `/${locale}${pathWithoutLocale}`;

    // 태국어로 변경하거나 태국어에서 다른 언어로 변경할 때는 새로고침
    if (locale === 'th' || currentLang === 'th') {
      window.location.href = newPath;
    } else {
      router.replace(newPath);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='hover:bg-primary/10 hover:text-primary rounded-lg p-2 text-gray-700 transition-colors'
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
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='border-primary/20 w-32 border bg-white shadow-lg'>
        {Object.entries(LOCALE_LABELS).map(([localeKey, label]) => (
          <DropdownMenuItem
            key={localeKey}
            // 선택된 언어에 스타일 적용
            className={[
              'cursor-pointer px-4 py-2 text-sm transition-colors',
              currentLang === localeKey
                ? 'bg-primary/10 text-primary font-semibold'
                : 'hover:bg-primary/5 hover:text-primary text-gray-700',
            ].join(' ')}
            onClick={() => handleLanguageChange(localeKey as Locale)}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
