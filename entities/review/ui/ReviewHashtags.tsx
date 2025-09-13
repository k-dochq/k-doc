'use client';

interface ReviewHashtagsProps {
  hashtags: string[];
  className?: string;
}

export function ReviewHashtags({ hashtags, className = '' }: ReviewHashtagsProps) {
  if (hashtags.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {hashtags.map((hashtag, index) => (
        <span key={index} className='text-primary inline-block text-xs font-medium'>
          {hashtag}
        </span>
      ))}
    </div>
  );
}
