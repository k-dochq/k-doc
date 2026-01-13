import { type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { getCompanyName } from 'shared/lib/company-info';

interface FooterCompanyInfoV2Props {
  dict: Dictionary;
  lang: Locale;
}

export function FooterCompanyInfoV2({ dict, lang }: FooterCompanyInfoV2Props) {
  const companyName = getCompanyName(lang);

  return (
    <div className='flex flex-col gap-1.5'>
      <div className='flex items-center gap-6 text-xs leading-[16px] font-normal text-neutral-200'>
        <p className='w-[76px] shrink-0'>{dict.footer.companyNameLabel}</p>
        <p className='min-h-px min-w-px flex-1 shrink-0'>{companyName}</p>
      </div>
      <div className='flex items-center gap-6 text-xs leading-[16px] font-normal text-neutral-200'>
        <p className='w-[76px] shrink-0'>{dict.footer.addressLabel}</p>
        <p className='min-h-px min-w-px flex-1 shrink-0'>{dict.footer.address}</p>
      </div>
      <div className='flex items-center gap-6 text-xs leading-[16px] font-normal text-neutral-200'>
        <p className='w-[76px] shrink-0'>{dict.footer.businessNumberLabel}</p>
        <p className='min-h-px min-w-px flex-1 shrink-0'>{dict.footer.businessNumber}</p>
      </div>
      <div className='flex items-center gap-6 text-xs leading-[16px] font-normal text-neutral-200'>
        <p className='w-[76px] shrink-0'>{dict.footer.customerEmailLabel}</p>
        <p className='min-h-px min-w-px flex-1 shrink-0'>{dict.footer.customerEmail}</p>
      </div>
    </div>
  );
}
