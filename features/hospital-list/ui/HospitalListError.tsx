import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { HospitalListTitle } from 'widgets/hospital-list/ui/HospitalListTitle';
import { CategoryFilterTabs } from 'shared/ui/category-filter-tabs';
import { ErrorState } from 'shared/ui/error-state';

interface HospitalListErrorProps {
  lang: Locale;
  dict: Dictionary;
  medicalSpecialties: MedicalSpecialtyWithTranslations[];
  selectedCategory: MedicalSpecialtyType | 'ALL';
  onViewAll: () => void;
  onCategoryChange: (category: MedicalSpecialtyType | 'ALL') => void;
  onRetry?: () => void;
}

export function HospitalListError({
  lang,
  dict,
  medicalSpecialties,
  selectedCategory,
  onViewAll,
  onCategoryChange,
  onRetry,
}: HospitalListErrorProps) {
  return (
    <div className='w-full'>
      <div className='mb-4'>
        <HospitalListTitle lang={lang} dict={dict} onViewAll={onViewAll} />
      </div>
      <div className='mb-4'>
        <CategoryFilterTabs
          lang={lang}
          dict={dict}
          medicalSpecialties={medicalSpecialties}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>
      <ErrorState
        title='병원 데이터를 불러올 수 없습니다'
        message='네트워크 연결을 확인하고 다시 시도해주세요.'
        onRetry={onRetry}
        retryButtonText='다시 시도'
      />
    </div>
  );
}
