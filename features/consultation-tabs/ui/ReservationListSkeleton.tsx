import { ReservationItemCardSkeleton } from './ReservationItemCardSkeleton';

export function ReservationListSkeleton() {
  return (
    <div className='flex flex-col gap-3 p-5'>
      {Array.from({ length: 1 }).map((_, index) => (
        <ReservationItemCardSkeleton key={index} />
      ))}
    </div>
  );
}
