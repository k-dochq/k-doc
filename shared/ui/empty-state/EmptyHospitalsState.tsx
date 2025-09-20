import { Hospital, Stethoscope } from 'lucide-react';
import { type Dictionary } from 'shared/model/types';
import { EmptyState } from './EmptyState';

interface EmptyHospitalsStateProps {
  dict: Dictionary;
  className?: string;
  isSearch?: boolean;
}

export function EmptyHospitalsState({
  dict,
  className = '',
  isSearch = false,
}: EmptyHospitalsStateProps) {
  const title = isSearch
    ? dict.hospitals?.empty?.searchTitle || '검색된 병원이 없습니다'
    : dict.hospitals?.empty?.title || '등록된 병원이 없습니다';

  const description = isSearch
    ? dict.hospitals?.empty?.searchDescription || '다른 검색어로 다시 시도해보세요'
    : dict.hospitals?.empty?.description || '곧 새로운 병원이 추가될 예정입니다';

  return (
    <EmptyState
      icon={<Hospital className='h-10 w-10 text-gray-400' />}
      title={title}
      description={description}
      className={className}
    />
  );
}
