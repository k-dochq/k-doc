import { type Dictionary } from 'shared/model/types';
import { type HospitalDetailInfoSectionProps } from '../lib/types';
import { ScheduleTable } from './ScheduleTable';
import { NoticeSection } from './NoticeSection';

export function HospitalDetailInfoSection({
  hospital,
  lang,
  dict,
}: HospitalDetailInfoSectionProps & { dict: Dictionary }) {
  return (
    <div className=''>
      <h2 className='text-base font-bold'>진료시간</h2>

      <div className='mt-4 rounded-xl border border-white bg-white/50 p-4 shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] backdrop-blur-[6px]'>
        <ScheduleTable lang={lang} openingHours={hospital.openingHours} />
        <NoticeSection notice={hospital.openingHoursNotice} />
      </div>
    </div>
  );
}
