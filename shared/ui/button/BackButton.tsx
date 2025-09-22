'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '../icon/ArrowLeftIcon';

interface BackButtonProps {
  className?: string;
  fallbackUrl?: string;
  variant?: 'light' | 'dark';
}

export function BackButton({ className = '', fallbackUrl, variant = 'dark' }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // 브라우저 히스토리가 있으면 뒤로가기, 없으면 fallbackUrl로 이동
    if (window.history.length > 1) {
      router.back();
    } else if (fallbackUrl) {
      router.push(fallbackUrl);
    }
  };

  const getVariantStyles = () => {
    if (variant === 'light') {
      return {
        button: 'hover:bg-white/30',
        icon: 'text-neutral-900',
      };
    }

    // dark variant (default)
    return {
      button: 'hover:bg-white/20',
      icon: 'text-white',
    };
  };

  const styles = getVariantStyles();

  return (
    <button
      onClick={handleBack}
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${styles.button} ${className}`}
    >
      <ArrowLeftIcon className={styles.icon} width={24} height={24} />
    </button>
  );
}
