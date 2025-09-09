'use client';

import { usePathname } from 'next/navigation';
import { LocaleLink } from 'shared/ui/locale-link';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';
import { type BottomNavigationProps } from '../model/types';
import { navigationItems } from '../model/navigation-items';

export function BottomNavigation({ currentLang }: BottomNavigationProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // 현재 경로에서 locale 부분을 제거하고 비교
    const currentPath = pathname.replace(`/${currentLang}`, '') || '/';
    return currentPath === href || (href === '/main' && currentPath === '/');
  };

  return (
    <nav className='safe-area-pb fixed right-0 bottom-0 left-0 z-50 bg-white'>
      <div className={`mx-auto ${MAX_MOBILE_WIDTH_CLASS} border-t border-gray-200`}>
        <div className='flex items-center justify-around py-2'>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <LocaleLink
                key={item.id}
                href={item.href}
                locale={currentLang}
                className={`flex min-w-0 flex-1 flex-col items-center justify-center px-1 py-2 transition-colors ${
                  active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`mb-1 h-5 w-5 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                <span
                  className={`truncate text-xs font-medium ${
                    active ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {item.label[currentLang]}
                </span>
              </LocaleLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
