import Image from 'next/image';
import { type Locale } from 'shared/config';
import { PageHeaderV2 } from 'shared/ui/page-header';

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
      <div className="w-full aspect-[753/1000] overflow-hidden bg-black">
        <video
          className="w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
        />
      </div>
    </div>
  );
}
