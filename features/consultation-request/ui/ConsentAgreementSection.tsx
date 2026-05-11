'use client';

import Link from 'next/link';
import { type Dictionary } from 'shared/model/types';

interface ConsentAgreementSectionProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  lang: string;
  dict: Dictionary;
}

function CheckboxIcon({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <div className='relative h-5 w-5 shrink-0 rounded-[4px] bg-primary-900'>
        <svg
          className='absolute inset-0 p-[15%]'
          viewBox='0 0 17 17'
          fill='none'
        >
          <path
            d='M3 8.5L6.5 12L14 5'
            stroke='white'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    );
  }
  return (
    <div className='h-5 w-5 shrink-0 rounded-[4px] border border-neutral-300 bg-white' />
  );
}

function SubCheckIcon() {
  return (
    <svg className='h-[14px] w-[14px] shrink-0' viewBox='0 0 14 14' fill='none'>
      <path
        d='M2 7L5.5 10.5L12 3.5'
        stroke="var(--color-primary-900)"
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className='h-4 w-4 shrink-0' viewBox='0 0 16 16' fill='none'>
      <path
        d='M6 4L10 8L6 12'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function ConsentAgreementSection({
  checked,
  onChange,
  lang,
  dict,
}: ConsentAgreementSectionProps) {
  const pa = dict.consultation?.request?.form?.privacyAgreement as
    | {
        sectionTitle?: string;
        policyTitle?: string;
        sensitiveTitle?: string;
        description?: string;
      }
    | undefined;

  return (
    <div className='flex flex-col gap-2 px-5 pb-[173px]'>
      {/* 상위: 상담 및 서비스 이용 동의 체크박스 */}
      <button
        type='button'
        onClick={() => onChange(!checked)}
        className='flex items-center gap-[6px]'
      >
        <CheckboxIcon checked={checked} />
        <span className='text-base font-semibold leading-6 text-neutral-700'>
          {pa?.sectionTitle ?? '상담 및 서비스 이용 동의'}
        </span>
      </button>

      {/* 하위 항목 목록 */}
      <div className='flex flex-col gap-1'>
        {/* 예약 및 서비스 정책 동의 */}
        <Link
          href={`/${lang}/reservation-policy`}
          className='flex items-center justify-between px-0.5 py-1'
        >
          <div className='flex flex-1 items-center gap-2'>
            <SubCheckIcon />
            <span className='text-sm font-normal leading-5 text-neutral-700'>
              {pa?.policyTitle ?? '예약 및 서비스 정책 동의 (필수)'}
            </span>
          </div>
          <ChevronRightIcon />
        </Link>

        {/* 민감정보 수집 및 이용 동의 */}
        <div className='flex items-start gap-2 px-0.5 py-1'>
          <div className='flex shrink-0 items-center pt-[3px]'>
            <SubCheckIcon />
          </div>
          <div className='flex flex-1 flex-col gap-1'>
            <span className='text-sm font-normal leading-5 text-neutral-700'>
              {pa?.sensitiveTitle ?? '민감정보 수집 및 이용 동의 (필수)'}
            </span>
            <p className='text-[13px] font-normal leading-[19px] text-neutral-500'>
              {pa?.description ??
                '시술후기 작성 및 앱내 활용을 위한 민감정보 수집, 이용 규정을 확인하였으며 이에 동의합니다.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
