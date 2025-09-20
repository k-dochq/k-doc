import { type ReactNode } from 'react';
import { cn } from 'shared/lib/utils';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function EmptyState({ icon, title, description, className = '' }: EmptyStateProps) {
  return (
    <div className={cn('flex min-h-[400px] flex-col items-center justify-center py-12', className)}>
      <div className='text-center'>
        {/* 아이콘 */}
        <div className='mb-6 flex justify-center'>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gray-50'>
            {icon}
          </div>
        </div>

        {/* 제목 */}
        <h3 className='mb-3 text-lg font-semibold text-gray-900'>{title}</h3>

        {/* 설명 */}
        {description && <p className='max-w-sm text-sm text-gray-500'>{description}</p>}
      </div>
    </div>
  );
}
