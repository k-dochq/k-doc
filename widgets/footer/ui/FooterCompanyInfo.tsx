import { type Dictionary } from 'shared/model/types';

interface FooterCompanyInfoProps {
  dict: Dictionary;
}

export function FooterCompanyInfo({ dict }: FooterCompanyInfoProps) {
  return (
    <div>
      <div className='flex items-center gap-2 text-xs font-normal text-neutral-900'>
        <p>{dict.footer.companyName}</p>
        <div className='h-[10px] w-px bg-neutral-900'></div>
        <p>{dict.footer.ceo}</p>
      </div>
      <div className='h-1' />
      <div className='text-xs font-normal text-neutral-500'>
        <p>{dict.footer.address}</p>
        <p>{dict.footer.businessNumber}</p>
        <p>{dict.footer.customerEmail}</p>
      </div>
    </div>
  );
}
