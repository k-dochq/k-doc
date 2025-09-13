'use client';

interface ReviewTextProps {
  text: string;
  maxLines?: number;
  className?: string;
}

export function ReviewText({ text, maxLines = 3, className = '' }: ReviewTextProps) {
  return (
    <p
      className={`text-[13px] leading-relaxed text-neutral-900 ${className}`}
      style={{
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}
    >
      {text}
    </p>
  );
}
