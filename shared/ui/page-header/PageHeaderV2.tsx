'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'shared/ui/icon/ArrowLeftIcon';

interface PageHeaderV2Props {
  title: string;
  fallbackUrl?: string;
  rightContent?: React.ReactNode;
  className?: string;
}

export function PageHeaderV2({
  title,
  fallbackUrl,
  rightContent,
  className = '',
}: PageHeaderV2Props) {
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
    <div
      className={`sticky top-0 z-50 flex w-full items-center justify-between border-b border-neutral-200 bg-white px-5 py-4 ${className}`}
    >
      <div className='flex items-center gap-1'>
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBack}
          className='flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-neutral-100'
        >
          <ArrowLeftIcon className='text-neutral-700' width={24} height={24} />
        </button>
        {/* 제목 */}
        <h1 className='text-lg leading-7 font-semibold text-neutral-700'>{title}</h1>
      </div>

      {/* 오른쪽 컨텐츠 (공유하기, 좋아요 버튼 등) */}
      {rightContent && <div className='flex items-center gap-3'>{rightContent}</div>}
    </div>
  );
}
