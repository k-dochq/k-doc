'use client';

import { type Dictionary } from 'shared/model/types';

interface LoadOlderButtonProps {
  hasMore?: boolean;
  onClick?: () => void | Promise<void>;
  dict?: Dictionary;
}

export function LoadOlderButton({ hasMore, onClick, dict }: LoadOlderButtonProps) {
  if (!hasMore) return null;
  return (
    <div className='flex w-full justify-center p-2'>
      <button type='button' className='text-sm text-gray-500 underline-offset-4' onClick={onClick}>
        {dict?.comments?.list?.loadMore || 'Load previous messages'}
      </button>
    </div>
  );
}
