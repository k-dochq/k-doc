import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { MainTipsTitle } from './MainTipsTitle';
import { MainTipsList } from './MainTipsList';

interface MainTipsSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function MainTipsSection({ lang, dict }: MainTipsSectionProps) {
  return (
    <section className='px-5 py-9' style={{ background: '#F1EEFF' }}>
      <MainTipsTitle dict={dict} />
      <div className='mt-4'>
        <MainTipsList lang={lang} />
      </div>
    </section>
  );
}
