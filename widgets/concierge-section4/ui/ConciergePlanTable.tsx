import { type Dictionary } from 'shared/model/types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { DashIcon } from './icons/DashIcon';

interface ConciergePlanTableProps {
  dict: Dictionary;
}

const PLAN_FEATURES = [
  { key: 'quickConsultation', basic: true, plus: true, premium: true },
  { key: 'fastHospitalBooking', basic: true, plus: true, premium: true },
  { key: 'medicalInterpreter', basic: false, plus: true, premium: true },
  { key: 'scheduleCoordination', basic: false, plus: true, premium: true },
  { key: 'airportPickup', basic: false, plus: false, premium: true },
  { key: 'hospitalTransfer', basic: false, plus: false, premium: true },
  { key: 'dedicatedManager', basic: false, plus: false, premium: true },
  { key: 'recoveryPackage', basic: false, plus: false, premium: true },
] as const;

function PlanCell({ included }: { included: boolean }) {
  return (
    <div className='flex h-full w-[62px] shrink-0 items-center justify-center px-2 py-3'>
      {included ? <CheckCircleIcon /> : <DashIcon />}
    </div>
  );
}

export function ConciergePlanTable({ dict }: ConciergePlanTableProps) {
  const t = dict.concierge;
  const features = t?.planCard?.features;

  return (
    <section className='w-full py-9'>
      {/* Title */}
      <div className='flex flex-col items-center gap-3 px-5 text-center'>
        <p className='concierge-title w-full text-[42px] leading-[1.1] text-[#7657ff]'>{t?.section4Title}</p>
        <p className='w-full text-[14px] leading-5 text-[#737373]'>{t?.section4Description}</p>
      </div>

      {/* Table */}
      <div className='mt-6 flex flex-col items-end'>
        {/* Header row */}
        <div className='flex items-center pe-5'>
          {([t?.planBasic, t?.planPlus, t?.planPremium] as const).map((plan) => (
            <div key={plan} className='flex w-[62px] items-center justify-center pb-2'>
              <p className='text-[14px] font-bold leading-5 text-[#404040]'>{plan}</p>
            </div>
          ))}
        </div>

        {/* Data rows */}
        <div className='flex w-full flex-col'>
          {PLAN_FEATURES.map(({ key, basic, plus, premium }, index) => (
            <div
              key={key}
              className={`flex h-[52px] items-center border-t border-[#d4d4d4] px-5${index === PLAN_FEATURES.length - 1 ? ' border-b' : ''}`}
            >
              <p className='flex-1 text-[14px] leading-5 text-[#404040]'>{features?.[key]}</p>
              <PlanCell included={basic} />
              <PlanCell included={plus} />
              <PlanCell included={premium} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
