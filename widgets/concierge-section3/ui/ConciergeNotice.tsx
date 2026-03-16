import { type Dictionary } from 'shared/model/types';

interface ConciergeNoticeProps {
  dict: Dictionary;
}

export function ConciergeNotice({ dict }: ConciergeNoticeProps) {
  const t = dict.concierge?.notice;

  return (
    <div className='flex flex-col gap-0.5 text-[#737373]'>
      <p className='text-[16px] font-semibold leading-6'>{t?.noticeTitle}</p>
      <div className='text-[14px] leading-5'>
        <p className='mb-0'>{t?.noticeLine1}</p>
        <p>{t?.noticeLine2}</p>
      </div>
    </div>
  );
}
