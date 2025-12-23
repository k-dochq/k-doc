'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { resolveDrawer } from 'shared/lib/drawer';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { confirm } from 'shared/lib/modal';

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

  const handleDelete = async () => {
    // 드로어 먼저 닫기
    resolveDrawer();

    // 확인 모달 표시
    const result = await confirm({
      title: dict.review?.deleteConfirmTitle || '후기를 삭제 하시겠습니까?',
      message:
        dict.review?.deleteConfirmMessage ||
        '삭제 후에는 복구할 수 없습니다.\n신중히 선택해주세요.',
      confirmText: dict.review?.delete || '삭제하기',
      cancelText: dict.common?.cancel || '취소',
    });

    if (result) {
      // 사용자가 확인을 클릭한 경우
      // TODO: 실제 삭제 API 호출 (다음 작업에서 구현)
      if (onDelete) {
        onDelete();
      }
      console.log('삭제 확인됨 - 추후 구현 예정');
    }
    // 취소를 클릭한 경우는 아무 동작도 하지 않음
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
