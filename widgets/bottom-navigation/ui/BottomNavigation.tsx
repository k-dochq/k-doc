'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openDrawer } from 'shared/lib/drawer';
import { LocaleLink } from 'shared/ui/locale-link';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';
import { MAX_MOBILE_WIDTH_CLASS, PROTECTED_ROUTES } from 'shared/config';
import { type BottomNavigationProps } from '../model/types';
import { navigationItems } from '../model/navigation-items';
import { type Dictionary } from 'shared/model/types';

interface BottomNavigationWithDictProps extends BottomNavigationProps {
  dict: Dictionary;
}

export function BottomNavigation({ currentLang, dict }: BottomNavigationWithDictProps) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const isActive = (href: string) => {
    const currentPath = (pathname || '').replace(`/${currentLang}`, '') || '/';
    return currentPath === href || (href === '/main' && currentPath === '/');
  };

  const handleNavigationClick = async (e: React.MouseEvent, href: string) => {
    // 보호된 경로인 경우 로그인 체크
    if (PROTECTED_ROUTES.includes(href as any) && !isAuthenticated) {
      e.preventDefault();
      await openDrawer({
        content: <LoginRequiredDrawer lang={currentLang} />,
      });
    }
  };

  return (
    <nav className='safe-area-pb fixed right-0 bottom-0 left-0 z-50 bg-[#f5f5f5]'>
      <div className={`mx-auto ${MAX_MOBILE_WIDTH_CLASS} border-t border-neutral-200 bg-white`}>
        <div className='flex items-center justify-around'>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <LocaleLink
                key={item.id}
                href={item.href}
                locale={currentLang}
                onClick={(e) => handleNavigationClick(e, item.href)}
                className={`flex min-w-0 flex-1 flex-col items-center justify-center py-3 transition-colors ${
                  active ? 'text-primary' : 'text-neutral-400 hover:text-gray-700'
                }`}
              >
                <Icon
                  className={`mb-1 h-5 w-5 ${active ? 'text-primary' : 'text-neutral-400'}`}
                  active={active}
                />
                <span
                  className={`truncate text-xs font-medium ${
                    active ? 'text-primary' : 'text-neutral-400'
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
