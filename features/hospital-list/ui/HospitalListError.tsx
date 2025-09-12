import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { HospitalListTitle } from 'widgets/hospital-list/ui/HospitalListTitle';
import { HospitalListTabs } from 'widgets/hospital-list/ui/HospitalListTabs';

interface HospitalListErrorProps {
  lang: Locale;
  dict: Dictionary;
  medicalSpecialties: MedicalSpecialtyWithTranslations[];
  selectedCategory: MedicalSpecialtyType | 'ALL';
  onViewAll: () => void;
  onCategoryChange: (category: MedicalSpecialtyType | 'ALL') => void;
}

export function HospitalListError({
  lang,
  dict,
  medicalSpecialties,
  selectedCategory,
  onViewAll,
  onCategoryChange,
}: HospitalListErrorProps) {
  return (
    <div className='w-full'>
      <div className='mb-4'>
        <HospitalListTitle lang={lang} dict={dict} onViewAll={onViewAll} />
      </div>
      <div className='mb-4'>
        <HospitalListTabs
          lang={lang}
          dict={dict}
          medicalSpecialties={medicalSpecialties}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>
      <div className='text-center text-red-500'>병원 데이터를 불러오는 중 오류가 발생했습니다.</div>
    </div>
  );
}
