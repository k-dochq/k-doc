import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale, isValidMedicalSpecialtyType } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { interpolateTemplate } from 'shared/lib';
import { getHospitals, HospitalListCard } from 'entities/hospital';

interface HospitalsContentProps {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    page?: string;
    sortBy?: string;
    specialtyType?: string;
  };
}

export async function HospitalsContent({ lang, dict, searchParams }: HospitalsContentProps) {
  const { page = '1', sortBy = 'rating', specialtyType } = searchParams;

  // specialtyType을 안전하게 변환
  const validSpecialtyType: MedicalSpecialtyType | undefined =
    specialtyType && isValidMedicalSpecialtyType(specialtyType) ? specialtyType : undefined;

  // 병원 데이터 조회
  const hospitalsData = await getHospitals({
    page: parseInt(page, 10),
    limit: 20,
    sortBy: sortBy as 'rating' | 'reviewCount' | 'createdAt',
    sortOrder: 'desc',
    specialtyType: validSpecialtyType,
  });

  return (
    <div>
      {/* 페이지 제목 */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>{dict.hospitals.title}</h1>
        <p className='mt-1 text-sm text-gray-600'>
          {interpolateTemplate(dict.hospitals.totalCount, { count: hospitalsData.totalCount })}
        </p>
      </div>

      {/* 병원 리스트 */}
      {hospitalsData.hospitals.length > 0 ? (
        <div className='space-y-4'>
          {hospitalsData.hospitals.map((hospital) => (
            <HospitalListCard key={hospital.id} hospital={hospital} lang={lang} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-12'>
          <div className='text-center'>
            <p className='text-gray-500'>{dict.hospitals.empty.message}</p>
          </div>
        </div>
      )}

      {/* 페이지네이션 (향후 구현) */}
      {hospitalsData.totalPages > 1 && (
        <div className='mt-8 flex justify-center'>
          <div className='text-sm text-gray-500'>
            {interpolateTemplate(dict.hospitals.pagination.page, {
              current: hospitalsData.currentPage,
              total: hospitalsData.totalPages,
            })}
          </div>
        </div>
      )}
    </div>
  );
}
