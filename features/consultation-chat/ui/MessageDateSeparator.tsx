'use client';

interface MessageDateSeparatorProps {
  date: string;
}

export function MessageDateSeparator({ date }: MessageDateSeparatorProps) {
  return (
    <div className='flex w-full items-center justify-center py-4'>
      <div className='rounded-full px-3 py-1'>
        <span className='text-sm text-neutral-500'>{date}</span>
      </div>
    </div>
  );
}
