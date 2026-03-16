import { type Dictionary } from 'shared/model/types';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { SparkleIcon } from './icons/SparkleIcon';

interface ConciergePlanCardProps {
  dict: Dictionary;
}

const FEATURES = [
  'quickConsultation',
  'fastHospitalBooking',
  'medicalInterpreter',
  'scheduleCoordination',
  'airportPickup',
  'hospitalTransfer',
  'dedicatedManager',
  'recoveryPackage',
] as const;


export function ConciergePlanCard({ dict }: ConciergePlanCardProps) {
  const t = dict.concierge?.planCard;

  return (
    <div
      className='w-full rounded-3xl p-[6px] shadow-[2px_2px_10px_0px_rgba(43,34,183,0.4)]'
      style={{
        background: 'linear-gradient(90deg, #3e57e2 0%, #b133ff 40%, #ff5dca 100%)',
      }}
    >
      {/* Recommended badge */}
      <div className='flex items-center justify-center gap-1 pb-[6px]'>
        <SparkleIcon />
        <span className='text-[18px] font-medium leading-7 text-white'>{t?.recommended}</span>
      </div>

      {/* Card body */}
      <div className='flex flex-col gap-4 rounded-3xl border-2 border-[#3e57e2] bg-white p-6'>
        {/* Title + Price */}
        <div className='flex items-end justify-between gap-[6px]'>
          <p className='text-[24px] font-semibold leading-8 text-[#404040]'>{t?.planTitle}</p>
          <div className='flex shrink-0 items-end gap-[6px]'>
            <span className='pb-[2px] text-[14px] font-medium leading-5 text-[#a3a3a3]'>
              {t?.startingAt}
            </span>
            <span className='text-[48px] font-semibold leading-[48px] text-[#404040]'>
              {t?.price}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type='button'
          className='flex h-14 w-full items-center justify-center gap-1 rounded-xl bg-[#7657ff] px-5 py-4'
        >
          <span className='text-[16px] font-medium leading-6 text-white'>{t?.ctaButton}</span>
          <ArrowRightIcon />
        </button>

        {/* Feature list */}
        <ul className='flex flex-col gap-2'>
          {FEATURES.map((key) => (
            <li key={key} className='flex items-start gap-[6px]'>
              <span className='mt-[2px] shrink-0'>
                <CheckCircleIcon />
              </span>
              <span className='flex-1 text-[16px] leading-6 text-[#404040]'>
                {t?.features?.[key]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
