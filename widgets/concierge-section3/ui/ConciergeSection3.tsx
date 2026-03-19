import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ConciergePlanCard } from './ConciergePlanCard';
import { ConciergeNotice } from './ConciergeNotice';

interface ConciergeSection3Props {
  lang: Locale;
  dict: Dictionary;
}

export function ConciergeSection3({ lang, dict }: ConciergeSection3Props) {
  return (
    <section className='w-full px-5 py-9' style={{ backgroundColor: '#F0EFFF' }}>
      <div className='flex w-full flex-col items-center gap-3 text-center'>
        <p className='concierge-title w-full whitespace-pre-line text-[42px] leading-[1.1] text-[#7657ff]'>
          {dict.concierge?.section3Title}
        </p>
        <p className='w-full text-[14px] leading-5 text-[#737373]'>
          {dict.concierge?.section3Description}
        </p>
      </div>

      <div className='mt-6'>
        <ConciergePlanCard lang={lang} dict={dict} />
      </div>

      <div className='mt-6'>
        <ConciergeNotice dict={dict} />
      </div>
    </section>
  );
}
