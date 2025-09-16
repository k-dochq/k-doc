import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ConsultationRequestErrorProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationRequestError({ lang, dict }: ConsultationRequestErrorProps) {
  return (
    <div className=''>
      <div className='rounded-lg bg-white p-6'>
        <h1 className='mb-6 text-2xl font-bold text-gray-900'>
          {dict.consultation?.request?.title || '상담신청'}
        </h1>
        <p className='text-red-600'>
          {dict.consultation?.error || '병원 정보를 불러올 수 없습니다.'}
        </p>
      </div>
    </div>
  );
}
