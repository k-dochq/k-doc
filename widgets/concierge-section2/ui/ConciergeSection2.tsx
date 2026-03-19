import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ConciergeSection2Props {
  lang: Locale;
  dict: Dictionary;
}

export function ConciergeSection2({ lang, dict }: ConciergeSection2Props) {
  const t = dict.concierge;

  return (
    <section
      className='flex w-full flex-col items-center gap-3 pt-9'
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 57.977%, #626262 100%)',
      }}
    >
      <div className='flex w-full max-w-[335px] flex-col items-center gap-3'>
        <p className='concierge-title w-full text-center text-[32px] leading-[1.1] text-[#7657ff]'>
          {t.section2Title}
        </p>
        <div className='flex items-center gap-2 text-[14px] leading-5 text-[#737373]'>
          <span>KIA</span>
          <span className='h-3 w-px bg-[#737373]' />
          <span>HYUNDAI</span>
          <span className='h-3 w-px bg-[#737373]' />
          <span>Mercedes-Benz</span>
        </div>
      </div>
      <div className='relative w-full' style={{ aspectRatio: '375 / 247' }}>
        <Image
          src={`/images/premium_package/${lang}/premium_02_car_bg.png`}
          alt='Premium Vehicles'
          fill
          className='object-cover'
          sizes='(max-width: 500px) 100vw, 500px'
        />
      </div>
    </section>
  );
}
