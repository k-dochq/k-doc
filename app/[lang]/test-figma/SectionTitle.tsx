import { ArrowRightIconFigma } from 'shared/ui/arrow-right-icon-figma';

interface SectionTitleProps {
  title: string;
  viewAllLabel?: string;
  onViewAllClick?: () => void;
}

export function SectionTitle({
  title,
  viewAllLabel = '전체보기',
  onViewAllClick,
}: SectionTitleProps) {
  return (
    <div className='flex w-full items-center justify-between'>
      <p className='relative shrink-0 text-2xl leading-8 font-semibold text-neutral-700'>{title}</p>
      <button
        type='button'
        onClick={onViewAllClick}
        className='flex items-center gap-0.5'
        aria-label={viewAllLabel}
      >
        <p className='relative shrink-0 text-sm leading-5 font-medium text-neutral-500'>
          {viewAllLabel}
        </p>
        <div className='flex size-4 shrink-0 items-center justify-center'>
          <ArrowRightIconFigma size={7} color='#737373' />
        </div>
      </button>
    </div>
  );
}
