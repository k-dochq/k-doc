import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { PageHeader } from 'shared/ui/page-header';

interface PackagePageProps {
  params: Promise<{ lang: Locale }>;
}

function getMainImagePath(lang: Locale): string {
  const imageMap: Record<Locale, string> = {
    ko: '/images/event/package/main_ko.png',
    en: '/images/event/package/main_en.png',
    th: '/images/event/package/main_th.png',
  };
  return imageMap[lang];
}

function getPriceImagePath(lang: Locale): string {
  const imageMap: Record<Locale, string> = {
    ko: '/images/event/package/price_ko.png',
    en: '/images/event/package/price_en.png',
    th: '/images/event/package/price_th.png',
  };
  return imageMap[lang];
}

function getNoticeImagePath(lang: Locale): string {
  const imageMap: Record<Locale, string> = {
    ko: '/images/event/package/notice_ko.png',
    en: '/images/event/package/notice_en.png',
    th: '/images/event/package/notice_th.png',
  };
  return imageMap[lang];
}

function getWhatImagePath(lang: Locale): string {
  const imageMap: Record<Locale, string> = {
    ko: '/images/event/package/what_ko.png',
    en: '/images/event/package/what_en.png',
    th: '/images/event/package/what_th.png',
  };
  return imageMap[lang];
}

function getWhyImagePath(lang: Locale): string {
  const imageMap: Record<Locale, string> = {
    ko: '/images/event/package/why_ko.png',
    en: '/images/event/package/why_en.png',
    th: '/images/event/package/why_th.png',
  };
  return imageMap[lang];
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const mainImagePath = getMainImagePath(lang);
  const priceImagePath = getPriceImagePath(lang);
  const noticeImagePath = getNoticeImagePath(lang);
  const whatImagePath = getWhatImagePath(lang);
  const whyImagePath = getWhyImagePath(lang);

  return (
    <div>
      <PageHeader
        lang={lang}
        title={dict.package.allInOnePackage.title}
        fallbackUrl={`/${lang}/main`}
        variant='light'
      />
      <img src={mainImagePath} alt={dict.package.allInOnePackage.title} className='w-full' />
      <img
        src={priceImagePath}
        alt={`${dict.package.allInOnePackage.title} - Price`}
        className='w-full'
      />
      <img
        src={noticeImagePath}
        alt={`${dict.package.allInOnePackage.title} - Notice`}
        className='w-full'
      />
      <img
        src={whatImagePath}
        alt={`${dict.package.allInOnePackage.title} - What`}
        className='w-full'
      />
      <img
        src={whyImagePath}
        alt={`${dict.package.allInOnePackage.title} - Why`}
        className='w-full'
      />
    </div>
  );
}
