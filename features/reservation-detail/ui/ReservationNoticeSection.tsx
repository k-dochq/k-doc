import { type Dictionary } from 'shared/model/types';

interface ReservationNoticeSectionProps {
  dict: Dictionary;
}

export function ReservationNoticeSection({ dict }: ReservationNoticeSectionProps) {
  const notice = dict.consultation?.reservationDetail?.notice;

  const items = [
    notice?.item1 ?? '예약 일정은 병원 확인 후 최종 확정됩니다.',
    notice?.item2 ?? '예약 변경 및 취소는 예약일 기준 3일 전까지 가능합니다.',
    notice?.item3 ?? '병원 사정에 따라 일정 조율이 필요할 수 있습니다.',
    notice?.item4 ?? '원활한 상담 및 시술 진행을 위해 예약 시간에 맞춰 방문 부탁드립니다.',
  ];

  return (
    <div className='flex flex-col gap-2 rounded-xl bg-[#f5f5f5] p-5'>
      <p className='text-base font-semibold leading-6 text-[#404040]'>
        {notice?.title ?? '예약 안내'}
      </p>
      <ul className='ms-[21px] list-disc flex flex-col gap-0.5'>
        {items.map((item, index) => (
          <li key={index} className='text-sm leading-5 font-normal text-[#737373]'>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
