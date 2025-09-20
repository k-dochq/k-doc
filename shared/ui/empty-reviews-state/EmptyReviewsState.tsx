import { type Dictionary } from 'shared/model/types';

interface EmptyReviewsStateProps {
  dict: Dictionary;
  className?: string;
}

export function EmptyReviewsState({ dict, className = '' }: EmptyReviewsStateProps) {
  return (
    <div className={`flex min-h-screen flex-col items-center justify-center py-12 ${className}`}>
      <div className='text-center'>
        <p className=''>{dict.allReviews?.empty?.title || '리뷰가 없습니다.'}</p>
      </div>
    </div>
  );
}
