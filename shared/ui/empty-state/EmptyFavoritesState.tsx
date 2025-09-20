import { Bookmark, Star } from 'lucide-react';
import { type Dictionary } from 'shared/model/types';
import { EmptyState } from './EmptyState';

interface EmptyFavoritesStateProps {
  dict: Dictionary;
  className?: string;
  type: 'hospitals' | 'reviews';
}

export function EmptyFavoritesState({ dict, className = '', type }: EmptyFavoritesStateProps) {
  const isHospitals = type === 'hospitals';

  const title = isHospitals
    ? dict.favorites?.empty?.hospitals?.title || '찜한 병원이 없습니다'
    : dict.favorites?.empty?.reviews?.title || '찜한 리뷰가 없습니다';

  const description = isHospitals
    ? dict.favorites?.empty?.hospitals?.description || '마음에 드는 병원을 찜해보세요'
    : dict.favorites?.empty?.reviews?.description || '마음에 드는 리뷰를 찜해보세요';

  return (
    <EmptyState
      icon={<Bookmark className='h-10 w-10 text-gray-400' />}
      title={title}
      description={description}
      className={className}
    />
  );
}
