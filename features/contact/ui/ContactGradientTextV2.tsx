'use client';

import { type Dictionary } from 'shared/model/types';

interface ContactGradientTextV2Props {
  dict: Dictionary;
}

export function ContactGradientTextV2({ dict }: ContactGradientTextV2Props) {
  const line1 = dict.contact?.gradientText?.line1 || 'Get international patients';
  const line2 = dict.contact?.gradientText?.line2 || 'with the leading medical';
  const line3 = dict.contact?.gradientText?.line3 || 'tourism platform';

  return (
    <div className='mt-8 px-5'>
      <p
        className='text-2xl leading-[32px] font-semibold'
        style={{
          background: 'linear-gradient(90deg, #3E57E2 0%, #B133FF 40%, #FF5DCA 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {line1}
        <br />
        {line2}
        <br />
        {line3}
      </p>
    </div>
  );
}
