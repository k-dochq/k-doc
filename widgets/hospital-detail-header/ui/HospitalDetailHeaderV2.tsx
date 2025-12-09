import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { HospitalDetailHeaderActionsV2 } from './HospitalDetailHeaderActionsV2';

interface HospitalDetailHeaderV2Props {
  lang: Locale;
  dict: Dictionary;
  hospitalId: string;
  hospitalName?: string;
}

export function HospitalDetailHeaderV2({
  lang,
  dict,
  hospitalId,
  hospitalName,
}: HospitalDetailHeaderV2Props) {
  return (
    <PageHeaderV2
      title={hospitalName || ''}
      fallbackUrl={`/${lang}/v2/hospitals`}
      enableScrollTransparency={true}
      rightContent={
        <HospitalDetailHeaderActionsV2
          hospitalId={hospitalId}
          lang={lang}
          dict={dict}
          hospitalName={hospitalName}
        />
      }
    />
  );
}
