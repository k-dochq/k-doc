import { LocaleLink } from 'shared/ui/locale-link';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ConsultationRequestButtonProps {
  hospitalId: string;
  locale: Locale;
  dict: Dictionary;
}

export function ConsultationRequestButton({
  hospitalId,
  locale,
  dict,
}: ConsultationRequestButtonProps) {
  return (
    <LocaleLink
      href={`/hospitals/${hospitalId}/consultation`}
      locale={locale}
      className='block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700'
    >
      {dict.consultation?.request?.button || '상담신청'}
    </LocaleLink>
  );
}
