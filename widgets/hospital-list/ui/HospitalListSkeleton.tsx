import { HospitalCardSkeleton } from './HospitalCardSkeleton';

export function HospitalListSkeleton() {
  return (
    <div className='w-full space-y-4'>
      {/* 5개의 병원 카드 스켈레톤 */}
      {Array.from({ length: 5 }).map((_, index) => (
        <HospitalCardSkeleton key={index} />
      ))}
    </div>
  );
}
