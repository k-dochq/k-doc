'use client';

interface ImageTagProps {
  type: 'before' | 'after';
  className?: string;
}

export function ImageTag({ type, className = '' }: ImageTagProps) {
  const isAfter = type === 'after';

  return (
    <span
      className={`absolute bottom-0 left-0 rounded-tr-[8px] px-2 py-1 text-[12px] font-medium text-white ${className}`}
      style={{
        backgroundColor: isAfter ? 'rgba(218, 71, 239, 0.7)' : 'rgba(23, 23, 23, 0.7)',
      }}
    >
      {isAfter ? 'After' : 'Before'}
    </span>
  );
}
