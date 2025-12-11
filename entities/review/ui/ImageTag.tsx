'use client';

interface ImageTagProps {
  type: 'before' | 'after';
  className?: string;
}

export function ImageTag({ type, className = '' }: ImageTagProps) {
  const isAfter = type === 'after';

  return (
    <span
      className={`absolute bottom-0 left-0 rounded-tr-[8px] px-2 py-1 text-[12px] font-medium text-white ${
        isAfter ? 'bg-primary-900' : 'bg-neutral-700'
      } ${className}`}
    >
      {isAfter ? 'After' : 'Before'}
    </span>
  );
}
