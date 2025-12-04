import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';

interface FooterAboutButtonV2Props {
  dict: Dictionary;
}

export function FooterAboutButtonV2({ dict }: FooterAboutButtonV2Props) {
  return (
    <div className='flex items-center gap-3'>
      <LocaleLink href='/about' className='text-sm leading-[20px] font-medium text-neutral-200'>
        {dict.footer.companyInfo}
      </LocaleLink>
      <div className='h-3 w-px bg-neutral-200' />
      <LocaleLink
        href='/contact'
        className='text-right text-sm leading-[20px] font-medium text-neutral-200'
      >
        {dict.footer.contactUs}
      </LocaleLink>
    </div>
  );
}
