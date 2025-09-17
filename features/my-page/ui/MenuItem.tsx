'use client';

import { LocaleLink } from 'shared/ui/locale-link';

interface MenuItemProps {
  title: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  isDanger?: boolean;
}

export function MenuItem({ title, href, onClick, icon, isDanger = false }: MenuItemProps) {
  const baseClasses =
    'flex w-full items-center justify-between rounded-lg bg-white p-4 text-left transition-colors hover:bg-gray-50';
  const textClasses = isDanger ? 'text-red-600' : 'text-gray-900';

  const content = (
    <>
      <div className='flex items-center gap-3'>
        {icon && <div className='flex-shrink-0'>{icon}</div>}
        <span className={`text-sm font-medium ${textClasses}`}>{title}</span>
      </div>
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='flex-shrink-0 text-gray-400'
      >
        <path
          d='M6 4L10 8L6 12'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </>
  );

  if (href) {
    return (
      <LocaleLink href={href} className={baseClasses}>
        {content}
      </LocaleLink>
    );
  }

  return (
    <button type='button' onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}
