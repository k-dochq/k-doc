import { PersonIcon } from './icons/PersonIcon';
import { QuotationIcon } from './icons/QuotationIcon';

interface ConciergeReviewCardProps {
  title: string;
  body: string;
  author: string;
}

export function ConciergeReviewCard({ title, body, author }: ConciergeReviewCardProps) {
  return (
    <div className='flex h-full min-h-[254px] flex-col gap-3 rounded-2xl bg-white p-4'>
      <QuotationIcon />
      <p className='text-[16px] font-semibold leading-6 text-[#404040]'>{title}</p>
      <div className='flex items-center gap-1'>
        <PersonIcon />
        <p className='text-[14px] font-semibold leading-5 text-[#7657ff]'>{author}</p>
      </div>
      <p className='text-[14px] leading-5 text-[#737373]'>{body}</p>
    </div>
  );
}
