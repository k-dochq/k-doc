'use client';

interface PopularReviewCardV2HashtagsProps {
  hashtags: string[];
}

export function PopularReviewCardV2Hashtags({ hashtags }: PopularReviewCardV2HashtagsProps) {
  if (hashtags.length === 0) {
    return null;
  }

  return (
    <div className='flex items-center gap-1 text-[13px] leading-[19px] font-medium text-[#f15bff]'>
      {hashtags.map((hashtag, index) => (
        <p key={index} className='shrink-0'>
          {hashtag}
        </p>
      ))}
    </div>
  );
}
