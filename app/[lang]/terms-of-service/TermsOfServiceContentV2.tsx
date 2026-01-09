import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface TermsOfServiceContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function TermsOfServiceContentV2({ lang, dict }: TermsOfServiceContentV2Props) {
  return (
    <div className='px-5 pt-8 pb-20'>
      <h1 className='mb-8 text-3xl font-semibold text-neutral-700'>{dict.footer.termsOfService}</h1>

      <div className='flex flex-col gap-10'>
        {/* 제1조 (목적) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article1.title}
          </h2>
          <p className='text-base leading-6 font-normal text-neutral-700'>
            {dict.termsOfService.article1.content}
          </p>
        </div>

        {/* 제2조 (정의) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article2.title}
          </h2>
          <div className='flex flex-col gap-2'>
            <p className='text-base leading-6 font-normal text-neutral-700'>
              {dict.termsOfService.article2.intro}
            </p>
            {dict.termsOfService.article2.items.map((item, index) => (
              <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
