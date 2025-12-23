'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { resolveDrawer } from 'shared/lib/drawer';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface ReviewActionDrawerProps {
  lang: Locale;
  dict: Dictionary;
  reviewId: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ReviewActionDrawer({
  lang,
  dict,
  reviewId,
  onEdit,
  onDelete,
}: ReviewActionDrawerProps) {
  const router = useLocalizedRouter();

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else {
      // 기본 동작: 수정 페이지로 이동
      router.push(`/reviews-edit/${reviewId}`);
    }
    resolveDrawer();
  };

  const handleDelete = () => {
    // 추후 구현 예정
    if (onDelete) {
      onDelete();
    }
    resolveDrawer();
  };

  const handleCancel = () => {
    resolveDrawer();
  };

  return (
    <div className='w-full bg-white px-5 pt-0 pb-10'>
      {/* 수정하기 버튼 */}
      <button
        onClick={handleEdit}
        className='relative flex h-14 w-full items-center justify-center border-t-0 border-r-0 border-b border-l-0 border-solid border-neutral-200'
      >
        <p className='text-base leading-6 font-medium text-neutral-700'>
          {dict.review?.edit || '수정하기'}
        </p>
      </button>

      {/* 삭제하기 버튼 */}
      <button
        onClick={handleDelete}
        className='relative flex h-14 w-full items-center justify-center border-t-0 border-r-0 border-b border-l-0 border-solid border-neutral-200'
      >
        <p className='text-base leading-6 font-medium text-neutral-700'>
          {dict.review?.delete || '삭제하기'}
        </p>
      </button>

      {/* 취소 버튼 */}
      <button onClick={handleCancel} className='flex h-14 w-full items-center justify-center px-5'>
        <p className='text-base leading-6 font-medium text-neutral-400'>{dict.common.cancel}</p>
      </button>
    </div>
  );
}
