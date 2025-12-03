import { type Dictionary } from 'shared/model/types';

interface EmptyLiveReviewsStateProps {
  dict: Dictionary;
  className?: string;
}

export function EmptyLiveReviewsState({ dict, className = '' }: EmptyLiveReviewsStateProps) {
  const message = dict.liveReviews?.empty?.message || '표시할 생생후기가 없습니다.';

  return <div className={`py-8 text-center text-gray-500 ${className}`}>{message}</div>;
}
