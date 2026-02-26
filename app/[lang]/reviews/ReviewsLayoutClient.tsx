'use client';

import { usePathname } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { BottomNavigationV2 } from 'widgets/bottom-navigation';
import { HeaderV2 } from '@/widgets/header/ui/HeaderV2';
import { PageHeaderV2 } from 'shared/ui/page-header';

interface ReviewsLayoutClientProps {
  lang: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}

export function ReviewsLayoutClient({ lang, dict, children }: ReviewsLayoutClientProps) {
  const pathname = usePathname();
  const isSelectHospital = pathname?.includes('/select-hospital');

  return (
    <div className='min-h-screen bg-white'>
      {isSelectHospital ? (
        <PageHeaderV2
          title={dict.reviewWrite?.selectHospital?.headerTitle || '후기'}
          fallbackUrl={`/${lang}/reviews`}
        />
      ) : (
        <HeaderV2 currentLang={lang} dict={dict} />
      )}
      <main className={isSelectHospital ? 'pt-[58px]' : ''}>{children}</main>
      <div className='h-16' />
      <BottomNavigationV2 currentLang={lang} dict={dict} />
    </div>
  );
}
