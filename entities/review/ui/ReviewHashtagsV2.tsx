'use client';

interface ReviewHashtagsV2Props {
  hashtags: string[];
  className?: string;
}

export function ReviewHashtagsV2({ hashtags, className = '' }: ReviewHashtagsV2Props) {
  if (hashtags.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {hashtags.map((hashtag, index) => (
        <span key={index} className='text-[14px] leading-5 font-semibold text-[#15E3CE]'>
          {hashtag}
        </span>
      ))}
    </div>
  );
}
