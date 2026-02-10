import Image from 'next/image';
import { type Locale } from 'shared/config';
import { PageHeaderV2 } from 'shared/ui/page-header';
import {
  DonationAfterCarouselSection,
  DonationCarouselSection,
  DonationFloatingButton,
  DonationImagesListSection,
  DonationVideoSection,
} from '@/widgets/donation-video';

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
  const donation08Src = `/images/event/donation_water/${imageLang}/donation_08_after_title.png`;
  const afterImgBasePath = `/images/event/donation_water/${imageLang}/donation_09_after_img`;
  const donation09Images = [1, 2, 3, 4].map((i) => ({
    src: `${afterImgBasePath}/donation_09_after_${i}.png`,
    alt: `Donation after ${i}`,
  }));
  const commonListBase = '/images/event/donation_water/common/donation_11_images_list';
  const list1ImageSrcs = [1, 2, 3, 4, 5].map(
    (i) => `${commonListBase}/list_1/list1_img${i}.png`
  );
  const list2ImageSrcs = [1, 2, 3, 4, 5].map(
    (i) => `${commonListBase}/list_2/list2_img${i}.png`
  );
  const donation11BgSrc = `/images/event/donation_water/${imageLang}/donation_11_images_bg.png`;
  const donation12Src = `/images/event/donation_water/${imageLang}/donation_12_qna.png`;

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
      <Image
        src={donation08Src}
        alt="After title"
        width={750}
        height={484}
        className="w-full h-auto"
      />
      <DonationAfterCarouselSection images={donation09Images} />
      <Image
        src={donation11BgSrc}
        alt="Donation 11 background"
        width={750}
        height={1828}
        className="w-full h-auto"
      />
      <DonationImagesListSection
        list1ImageSrcs={list1ImageSrcs}
        list2ImageSrcs={list2ImageSrcs}
      />
      <Image
        src={donation12Src}
        alt="Donation QnA"
        width={750}
        height={1200}
        className="w-full h-auto"
      />
      <DonationFloatingButton />
    </div>
  );
}
