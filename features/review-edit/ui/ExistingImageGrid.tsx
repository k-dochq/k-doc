'use client';

interface ExistingImageGridProps {
  imageUrls: string[];
  onRemove: (index: number) => void;
  type: 'before' | 'after';
}

export function ExistingImageGrid({ imageUrls, onRemove, type }: ExistingImageGridProps) {
  if (imageUrls.length === 0) {
    return null;
  }

  return (
    <div className='mb-2 flex gap-2 overflow-x-auto'>
      {imageUrls.map((url, index) => (
        <div
          key={`existing-${type}-${index}`}
          className='relative h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-xl'
        >
          <img
            src={url}
            alt={`Existing ${type} ${index + 1}`}
            className='h-full w-full rounded-xl object-cover'
          />
          <button
            type='button'
            onClick={() => onRemove(index)}
            className='absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(23,23,23,0.7)] text-white transition-transform active:scale-90'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
