import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { PageHeader } from 'shared/ui/page-header';
import {
  getPackageImagePath,
  PackageImage,
  PriceSection,
  PackageImages,
  ImageWithButtonSection,
} from 'features/package-preview';

interface PackagePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title = dict.package.allInOnePackage.title;
  const buttonText = dict.package.allInOnePackage.exploreClinics;

  const mainImagePath = getPackageImagePath('main', lang);
  const priceImagePath = getPackageImagePath('price', lang);
  const bubbleImagePath = getPackageImagePath('bubble', lang);

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
      <PackageImage src={mainImagePath} alt={title} />
      <PriceSection
        priceImageSrc={priceImagePath}
        priceImageAlt={`${title} - Price`}
        buttonText={buttonText}
        bubbleImageSrc={bubbleImagePath}
      />
      <PackageImages images={contentImages} />
      <ImageWithButtonSection
        imageSrc={tableImagePath}
        imageAlt={`${title} - Table`}
        buttonText={buttonText}
        bubbleImageSrc={bubbleImagePath}
      />
      <PackageImage src={notice2ImagePath} alt={`${title} - Notice 2`} />
    </div>
  );
}
