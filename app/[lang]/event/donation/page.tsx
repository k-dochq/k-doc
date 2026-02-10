import Image from 'next/image';
import { type Locale } from 'shared/config';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { DonationCarouselSection, DonationVideoSection } from '@/widgets/donation-video';

const DONATION_WATER_LOCALES: Locale[] = ['ko'];

function getDonationImageLang(lang: Locale): string {
  return DONATION_WATER_LOCALES.includes(lang) ? lang : 'ko';
}

interface DonationPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function DonationPage({ params }: DonationPageProps) {
  const { lang } = await params;
  const imageLang = getDonationImageLang(lang);
  const mainImageSrc = `/images/event/donation_water/${imageLang}/donation_01_main.png`;
  const illustSrc = `/images/event/donation_water/${imageLang}/donation_02_illust.png`;
  const videoSrc = `/images/event/donation_water/${imageLang}/donation_03_video.mp4`;
  const donation04Src = `/images/event/donation_water/${imageLang}/donation_04_why.png`;
  const donation05Src = `/images/event/donation_water/${imageLang}/donation_05_making.png`;
  const donation06Src = `/images/event/donation_water/${imageLang}/donation_06_carousel_title.png`;
  const carouselBasePath = `/images/event/donation_water/${imageLang}/donation_07_carousel_img`;
  const donationCarouselImages = [1, 2, 3, 4, 5].map((i) => ({
    src: `${carouselBasePath}/donation_07_carousel_img_${i}.png`,
    alt: `Donation carousel ${i}`,
  }));

  return (
    <div>
      <PageHeaderV2 title="Change an African Child's Life" fallbackUrl={`/${lang}/main`} />
      <div className='h-[58px]' />
      <Image
        src={mainImageSrc}
        alt="Change an African Child's Life"
        width={750}
        height={820}
        className="w-full h-auto"
      />
      <Image
        src={illustSrc}
        alt="Change an African Child's Life - illustration"
        width={750}
        height={600}
        className="w-full h-auto"
      />
      <DonationVideoSection videoSrc={videoSrc} />
      <Image
        src={donation04Src}
        alt="Why donation"
        width={750}
        height={1678}
        className="w-full h-auto"
      />
      <Image
        src={donation05Src}
        alt="Making process"
        width={750}
        height={1250}
        className="w-full h-auto"
      />
      <Image
        src={donation06Src}
        alt="Carousel title"
        width={750}
        height={474}
        className="w-full h-auto"
      />
      <DonationCarouselSection images={donationCarouselImages} />
    </div>
  );
}
