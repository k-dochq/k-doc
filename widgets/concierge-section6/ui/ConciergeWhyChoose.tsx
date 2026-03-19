import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ConciergeWhyChooseProps {
  dict: Dictionary;
  lang: Locale;
}

const ICON_LIST_KEYS = [1, 2, 3, 4, 5] as const;

export function ConciergeWhyChoose({ dict, lang }: ConciergeWhyChooseProps) {
  const t = dict.concierge;

  return (
    <section className='flex w-full flex-col items-center gap-6 bg-[#7657ff] px-5 py-12'>
      {/* Title */}
      <p className='concierge-title w-full whitespace-pre-line text-center text-[42px] leading-[1.1] text-white'>
        {t?.section6Title}
      </p>

      {/* Description */}
      <p className='w-full text-center text-[14px] leading-5 text-[#f5f5f5]'>
        {t?.section6Description}
      </p>

      {/* Icon list images */}
      <div className='flex w-full flex-col gap-4'>
        {ICON_LIST_KEYS.map((n) => (
          <div
            key={n}
            className='relative w-full overflow-hidden rounded-2xl'
            style={{ aspectRatio: '335 / 124' }}
          >
            <Image
              src={`/images/premium_package/${lang}/premium_06_icon_list/premium_06_icon_list_${n}.png`}
              alt={`K-DOC service ${n}`}
              fill
              className='object-cover'
            />
          </div>
        ))}
      </div>

      {/* Notice */}
      <div className='flex w-full flex-col gap-0.5'>
        <p className='text-[16px] font-semibold leading-6 text-white'>{t?.section6NoticeTitle}</p>
        <p className='text-[14px] leading-5 text-[#f5f5f5]'>{t?.section6NoticeBody}</p>
      </div>
    </section>
  );
}
