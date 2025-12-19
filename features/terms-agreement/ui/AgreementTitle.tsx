'use client';

import { type Dictionary } from 'shared/model/types';

interface AgreementTitleProps {
  titleLines: string[];
}

export function AgreementTitle({ titleLines }: AgreementTitleProps) {
  return (
    <div className='mb-11 text-3xl font-semibold'>
      {titleLines.map((line, index) => (
        <div key={index} className={index === 0 ? 'text-primary-900' : ''}>
          {line}
        </div>
      ))}
    </div>
  );
}
