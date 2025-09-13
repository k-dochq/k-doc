import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ErrorState } from 'shared/ui/error-state';

interface CategorySectionErrorProps {
  lang: Locale;
  dict: Dictionary;
  error?: Error;
  onRetry?: () => void;
}

export function CategorySectionError({ lang, dict, error, onRetry }: CategorySectionErrorProps) {
  return (
    <div className='w-full'>
      <ErrorState
        title='카테고리를 불러오는 중 오류가 발생했습니다'
        message='잠시 후 다시 시도해주세요'
        onRetry={onRetry}
        className='py-4'
      />
    </div>
  );
}
