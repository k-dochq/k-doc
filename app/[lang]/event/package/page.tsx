import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { PageHeader } from 'shared/ui/page-header';
import {
  getPackageImagePath,
  PackageImage,
  PriceSection,
  PackageImages,
  TableSection,
  MainPackageImage,
} from 'features/package-preview';
import mainKoImage from '../../../images/event/package/main_ko.png';
import mainEnImage from '../../../images/event/package/main_en.png';
import mainThImage from '../../../images/event/package/main_th.png';
import priceKoImage from '../../../images/event/package/price_ko.png';
import priceEnImage from '../../../images/event/package/price_en.png';
import priceThImage from '../../../images/event/package/price_th.png';

interface PackagePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title = dict.package.allInOnePackage.title;
  const buttonText = dict.package.allInOnePackage.exploreClinics;
  const guaranteeText = dict.package.allInOnePackage.fastReservationGuarantee;

  // Main 이미지는 정적 import로 사용 (blur placeholder 자동 생성)
  const mainImages: Record<Locale, typeof mainKoImage> = {
    ko: mainKoImage,
    en: mainEnImage,
    th: mainThImage,
  };
  const mainImage = mainImages[lang];

  // Price 이미지는 정적 import로 사용 (blur placeholder 자동 생성)
  const priceImages: Record<Locale, typeof priceKoImage> = {
    ko: priceKoImage,
    en: priceEnImage,
    th: priceThImage,
  };

  const priceImage = priceImages[lang];

  const contentImages = [
    { src: getPackageImagePath('notice', lang), alt: `${title} - Notice` },
    { src: getPackageImagePath('what', lang), alt: `${title} - What` },
    { src: getPackageImagePath('why', lang), alt: `${title} - Why` },
    { src: getPackageImagePath('experience', lang), alt: `${title} - Experience` },
    { src: getPackageImagePath('review', lang), alt: `${title} - Review` },
    { src: getPackageImagePath('how', lang), alt: `${title} - How` },
    { src: getPackageImagePath('support', lang), alt: `${title} - Support` },
    { src: getPackageImagePath('faq', lang), alt: `${title} - FAQ` },
  ];

  const tableImagePath = getPackageImagePath('table', lang);
  const notice2ImagePath = getPackageImagePath('notice2', lang);

  return (
    <div>
      <PageHeader
        lang={lang}
        title='Premium Medical Package'
        fallbackUrl={`/${lang}/main`}
        variant='light'
      />
      <MainPackageImage src={mainImage} alt={title} />
      <PriceSection
        priceImageSrc={priceImage}
        priceImageAlt={`${title} - Price`}
        buttonText={buttonText}
        guaranteeText={guaranteeText}
        locale={lang}
      />
      <PackageImages images={contentImages} />
      <TableSection
        tableImageSrc={tableImagePath}
        tableImageAlt={`${title} - Table`}
        buttonText={buttonText}
        locale={lang}
      />
      <PackageImage src={notice2ImagePath} alt={`${title} - Notice 2`} />
    </div>
  );
}
