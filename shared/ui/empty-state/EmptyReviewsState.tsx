import { FileText, Star } from 'lucide-react';
import { type Dictionary } from 'shared/model/types';
import { EmptyState } from './EmptyState';

interface EmptyReviewsStateProps {
  dict: Dictionary;
  className?: string;
  isSearch?: boolean;
}

export function EmptyReviewsState({
  dict,
  className = '',
  isSearch = false,
}: EmptyReviewsStateProps) {
  const title = isSearch
    ? dict.allReviews?.empty?.searchTitle || '검색된 리뷰가 없습니다'
    : dict.allReviews?.empty?.title || '등록된 리뷰가 없습니다';

  const description = isSearch
    ? dict.allReviews?.empty?.searchDescription || '다른 검색어로 다시 시도해보세요'
    : dict.allReviews?.empty?.description || '첫 번째 리뷰를 작성해보세요';

  return (
    <EmptyState
      icon={<FileText className='h-10 w-10 text-gray-400' />}
      title={title}
      description={description}
      className={className}
    />
  );
}
