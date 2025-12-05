'use client';

interface PopularReviewCardV2HashtagsProps {
  hashtags: string[];
}

export function PopularReviewCardV2Hashtags({ hashtags }: PopularReviewCardV2HashtagsProps) {
  if (hashtags.length === 0) {
    return null;
  }

  return (
    <div className='flex max-h-[38px] flex-wrap items-start gap-1 overflow-hidden text-[13px] leading-[19px] font-medium text-[#f15bff]'>
      {hashtags.map((hashtag, index) => (
        <span key={index} className='inline-block whitespace-normal'>
          {hashtag}
        </span>
      ))}
    </div>
  );
}
