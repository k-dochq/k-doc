import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { DoctorDetailHeaderActionsV2 } from 'app/[lang]/doctor/[id]/DoctorDetailHeaderActionsV2';

interface DoctorDetailHeaderV2Props {
  lang: Locale;
  dict: Dictionary;
  doctorId: string;
  doctorName?: string;
}

export function DoctorDetailHeaderV2({
  lang,
  dict,
  doctorId,
  doctorName,
}: DoctorDetailHeaderV2Props) {
  return (
    <PageHeaderV2
      title={doctorName || ''}
      fallbackUrl={`/${lang}/v2/doctors`}
      rightContent={
        <DoctorDetailHeaderActionsV2
          doctorId={doctorId}
          lang={lang}
          dict={dict}
          doctorName={doctorName}
        />
      }
    />
  );
}
