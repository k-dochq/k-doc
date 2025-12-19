'use client';

import { type Dictionary } from 'shared/model/types';

interface ContactTitleSectionV2Props {
  dict: Dictionary;
}

export function ContactTitleSectionV2({ dict }: ContactTitleSectionV2Props) {
  const title = dict.contact?.title || 'Contact us';

  return (
    <div className='px-5 py-8'>
      <h1 className='text-3xl font-semibold text-neutral-700'>{title}</h1>
    </div>
  );
}
