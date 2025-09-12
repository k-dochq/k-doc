import { type CategoryButtonProps } from '../model/types';

export function QuickMenuButton({ category, lang }: CategoryButtonProps) {
  const getLabel = (): string => {
    return category.labels[lang] || category.labels.ko;
  };

  return (
    <button className='flex flex-col items-center gap-1'>
      <div className='flex h-[60px] w-[60px] items-center justify-center rounded-xl border border-[#f9d1ff] bg-white'>
        {category.icon()}
      </div>
      <span className='text-xs leading-4 font-medium text-neutral-900'>{getLabel()}</span>
    </button>
  );
}
