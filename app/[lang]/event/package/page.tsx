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

function getExperienceImagePath(lang: Locale): string {
  const imageMap: Record<Locale, string> = {
    ko: '/images/event/package/experience_ko.png',
    en: '/images/event/package/experience_en.png',
    th: '/images/event/package/experience_th.png',
  };
  return imageMap[lang];
}

function getReviewImagePath(lang: Locale): string {
  const imageMap: Record<Locale, string> = {
    ko: '/images/event/package/review_ko.png',
    en: '/images/event/package/review_en.png',
    th: '/images/event/package/review_th.png',
  };
  return imageMap[lang];
}

function getHowImagePath(lang: Locale): string {
  const imageMap: Record<Locale, string> = {
    ko: '/images/event/package/how_ko.png',
    en: '/images/event/package/how_en.png',
    th: '/images/event/package/how_th.png',
  };
  return imageMap[lang];
}

function getSupportImagePath(lang: Locale): string {
  const imageMap: Record<Locale, string> = {
    ko: '/images/event/package/support_ko.png',
    en: '/images/event/package/support_en.png',
    th: '/images/event/package/support_th.png',
  };
  return imageMap[lang];
}

function getFaqImagePath(lang: Locale): string {
  const imageMap: Record<Locale, string> = {
    ko: '/images/event/package/faq_ko.png',
    en: '/images/event/package/faq_en.png',
    th: '/images/event/package/faq_th.png',
  };
  return imageMap[lang];
}

function getTableImagePath(lang: Locale): string {
  const imageMap: Record<Locale, string> = {
    ko: '/images/event/package/table_ko.png',
    en: '/images/event/package/table_en.png',
    th: '/images/event/package/table_th.png',
  };
  return imageMap[lang];
}

function getNotice2ImagePath(lang: Locale): string {
  const imageMap: Record<Locale, string> = {
    ko: '/images/event/package/notice2_ko.png',
    en: '/images/event/package/notice2_en.png',
    th: '/images/event/package/notice2_th.png',
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
  const experienceImagePath = getExperienceImagePath(lang);
  const reviewImagePath = getReviewImagePath(lang);
  const howImagePath = getHowImagePath(lang);
  const supportImagePath = getSupportImagePath(lang);
  const faqImagePath = getFaqImagePath(lang);
  const tableImagePath = getTableImagePath(lang);
  const notice2ImagePath = getNotice2ImagePath(lang);

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
      <img
        src={experienceImagePath}
        alt={`${dict.package.allInOnePackage.title} - Experience`}
        className='w-full'
      />
      <img
        src={reviewImagePath}
        alt={`${dict.package.allInOnePackage.title} - Review`}
        className='w-full'
      />
      <img
        src={howImagePath}
        alt={`${dict.package.allInOnePackage.title} - How`}
        className='w-full'
      />
      <img
        src={supportImagePath}
        alt={`${dict.package.allInOnePackage.title} - Support`}
        className='w-full'
      />
      <img
        src={faqImagePath}
        alt={`${dict.package.allInOnePackage.title} - FAQ`}
        className='w-full'
      />
      <img
        src={tableImagePath}
        alt={`${dict.package.allInOnePackage.title} - Table`}
        className='w-full'
      />
      <img
        src={notice2ImagePath}
        alt={`${dict.package.allInOnePackage.title} - Notice 2`}
        className='w-full'
      />
    </div>
  );
}
