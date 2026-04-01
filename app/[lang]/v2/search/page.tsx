import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { QUICK_MENU_CATEGORIES } from 'features/quick-menu/model/categories';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { LocaleLink } from 'shared/ui/locale-link';

interface SearchV2PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function SearchV2Page({ params }: SearchV2PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='p-5'>
      <div className='flex flex-col gap-4'>
        <p className="font-['Pretendard'] text-base font-semibold leading-6 text-[#404040]">
          {dict.search?.categoryTitle}
        </p>
        <div className='flex flex-col gap-3'>
          {[0, 1, 2].map((rowIndex) => (
            <div key={rowIndex} className='flex items-start justify-between'>
              {QUICK_MENU_CATEGORIES.slice(rowIndex * 4, rowIndex * 4 + 4).map((category) => (
                <LocaleLink
                  key={category.type}
                  href={`/v2/search?category=${category.type}`}
                  className='flex w-[60px] flex-col items-center gap-1'
                >
                  <div className='flex size-[60px] items-center justify-center rounded-2xl border border-[#f8adff] bg-white'>
                    {category.iconSmall()}
                  </div>
                  <p className="w-full text-center font-['Pretendard'] text-xs font-medium leading-4 text-[#404040]">
                    {getLocalizedTextByLocale(category.labels, lang)}
                  </p>
                </LocaleLink>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
