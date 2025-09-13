'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '../icon/ArrowLeftIcon';

interface BackButtonProps {
  className?: string;
  fallbackUrl?: string;
}

export function BackButton({ className = '', fallbackUrl }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // 브라우저 히스토리가 있으면 뒤로가기, 없으면 fallbackUrl로 이동
    if (window.history.length > 1) {
      router.back();
    } else if (fallbackUrl) {
      router.push(fallbackUrl);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-colors hover:bg-white/20 ${className}`}
    >
      <ArrowLeftIcon className='text-white' width={20} height={20} />
    </button>
  );
}
