'use client';

interface PopularReviewCardV2ContentProps {
  content: string;
  maxLines?: number;
}

export function PopularReviewCardV2Content({
  content,
  maxLines = 2,
}: PopularReviewCardV2ContentProps) {
  return (
    <p
      className='min-w-full shrink-0 text-sm leading-5 font-medium whitespace-pre-wrap text-neutral-700'
      style={{
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}
    >
      {content}
    </p>
  );
}
