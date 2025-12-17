'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { ReservationDetailHeaderActions } from 'features/reservation-detail/ui';

interface ReservationDetailSkeletonProps {
  reservationId: string;
  lang: Locale;
  dict: Dictionary;
}

export function ReservationDetailSkeleton({
  reservationId,
  lang,
  dict,
}: ReservationDetailSkeletonProps) {
  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2
        title={dict.consultation?.reservationDetail?.title || '예약 상세'}
        rightContent={
          <ReservationDetailHeaderActions reservationId={reservationId} lang={lang} dict={dict} />
        }
      />
      <div className='h-[58px]' />

      {/* 예약 상세 컨텐츠 스켈레톤 */}
      <div className='pb-28'>
        <div className='flex flex-col p-5'>
          {/* 신청 일시 스켈레톤 */}
          <div className='flex items-center gap-1'>
            <div className='h-5 w-16 animate-pulse rounded bg-[#e5e5e5]' />
            <div className='h-5 w-32 animate-pulse rounded bg-[#e5e5e5]' />
            <div className='h-5 w-12 animate-pulse rounded bg-[#e5e5e5]' />
            <div className='h-5 w-8 animate-pulse rounded bg-[#e5e5e5]' />
          </div>

          <div className='h-5' />

          {/* 예약 상태 헤더 스켈레톤 */}
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              {/* 체크 아이콘 스켈레톤 */}
              <div className='size-6 animate-pulse rounded-full bg-[#e5e5e5]' />
              <div className='flex items-center gap-1'>
                {/* 상태 텍스트 스켈레톤 */}
                <div className='h-8 w-24 animate-pulse rounded bg-[#e5e5e5]' />
                {/* D-day 배지 스켈레톤 */}
                <div className='h-7 w-12 animate-pulse rounded-full bg-[#e5e5e5]' />
              </div>
            </div>
          </div>

          <div className='h-3' />

          {/* 예약 정보 카드 스켈레톤 */}
          <div className='flex items-center gap-3 rounded-xl border border-neutral-200 p-4'>
            {/* 썸네일 스켈레톤 */}
            <div className='h-[90px] w-[104px] shrink-0 animate-pulse rounded-lg bg-[#e0e0e0]' />

            <div className='flex flex-1 flex-col gap-2'>
              {/* 예약 일시 스켈레톤 */}
              <div className='flex flex-col gap-0.5'>
                <div className='h-5 w-20 animate-pulse rounded bg-[#e5e5e5]' />
                <div className='flex items-start gap-1'>
                  <div className='h-5 w-24 animate-pulse rounded bg-[#e5e5e5]' />
                  <div className='h-5 w-12 animate-pulse rounded bg-[#e5e5e5]' />
                </div>
              </div>
              {/* 시술후기 작성하기 버튼 스켈레톤 */}
              <div className='h-8 w-32 animate-pulse rounded-full bg-[#e5e5e5]' />
            </div>
          </div>

          <div className='h-8' />

          {/* 시술명 섹션 스켈레톤 */}
          <div className='flex flex-col gap-3'>
            {/* 타이틀 스켈레톤 */}
            <div className='h-7 w-16 animate-pulse rounded bg-[#e5e5e5]' />
            {/* 내용 스켈레톤 */}
            <div className='h-6 w-48 animate-pulse rounded bg-[#e5e5e5]' />
          </div>

          <div className='h-8' />

          {/* 결제정보 섹션 스켈레톤 */}
          <div className='flex flex-col gap-3'>
            {/* 타이틀 스켈레톤 */}
            <div className='h-7 w-20 animate-pulse rounded bg-[#e5e5e5]' />
            <div className='flex flex-col gap-1'>
              {/* 예약금 스켈레톤 */}
              <div className='flex gap-2'>
                <div className='h-6 w-16 animate-pulse rounded bg-[#e5e5e5]' />
                <div className='h-6 w-24 animate-pulse rounded bg-[#e5e5e5]' />
              </div>
              {/* 이체 일시 스켈레톤 */}
              <div className='flex gap-2'>
                <div className='h-6 w-20 animate-pulse rounded bg-[#e5e5e5]' />
                <div className='h-6 w-40 animate-pulse rounded bg-[#e5e5e5]' />
              </div>
            </div>
          </div>

          <div className='h-8' />

          {/* 병원정보 타이틀 스켈레톤 */}
          <div className='h-7 w-20 animate-pulse rounded bg-[#e5e5e5]' />

          <div className='h-3' />

          {/* 병원 정보 카드 스켈레톤 */}
          <div className='flex w-full items-center gap-3'>
            {/* 로고 스켈레톤 */}
            <div className='size-[46px] shrink-0 animate-pulse rounded-full bg-[#e0e0e0]' />

            {/* 병원 이름 및 지역 스켈레톤 */}
            <div className='flex flex-1 flex-col gap-[2px]'>
              <div className='h-5 w-32 animate-pulse rounded bg-[#e5e5e5]' />
              <div className='flex items-center gap-1'>
                <div className='h-4 w-8 animate-pulse rounded bg-[#e5e5e5]' />
                <div className='h-[10px] w-px bg-[#A3A3A3]' />
                <div className='h-4 w-16 animate-pulse rounded bg-[#e5e5e5]' />
              </div>
            </div>

            {/* ChevronRight 아이콘 스켈레톤 */}
            <div className='size-6 shrink-0 animate-pulse rounded bg-[#e5e5e5]' />
          </div>

          {/* 병원 위치 섹션 스켈레톤 */}
          <div className='space-y-3'>
            {/* 지도 스켈레톤 */}
            <div className='h-[220px] w-full animate-pulse rounded-lg bg-[#e0e0e0]' />

            {/* 주소 영역 스켈레톤 */}
            <div className='space-y-2'>
              <div className='flex items-start gap-2'>
                {/* 아이콘 스켈레톤 */}
                <div className='size-5 shrink-0 animate-pulse rounded bg-[#e5e5e5]' />
                {/* 주소 텍스트 스켈레톤 */}
                <div className='h-5 w-64 animate-pulse rounded bg-[#e5e5e5]' />
              </div>
              {/* 버튼들 스켈레톤 */}
              <div className='flex items-start gap-1.5'>
                <div className='h-7 w-20 animate-pulse rounded-full bg-[#e5e5e5]' />
                <div className='h-7 w-20 animate-pulse rounded-full bg-[#e5e5e5]' />
              </div>
            </div>
          </div>

          <div className='h-3' />

          {/* 예약자 정보 타이틀 스켈레톤 */}
          <div className='h-7 w-24 animate-pulse rounded bg-[#e5e5e5]' />

          <div className='h-3' />

          {/* 예약자 정보 스켈레톤 */}
          <div className='flex flex-col gap-1'>
            {/* 여권 영문 이름 스켈레톤 */}
            <div className='flex gap-2'>
              <div className='h-6 w-28 animate-pulse rounded bg-[#e5e5e5]' />
              <div className='h-6 w-32 animate-pulse rounded bg-[#e5e5e5]' />
            </div>
            {/* 성별 스켈레톤 */}
            <div className='flex gap-2'>
              <div className='h-6 w-12 animate-pulse rounded bg-[#e5e5e5]' />
              <div className='h-6 w-12 animate-pulse rounded bg-[#e5e5e5]' />
            </div>
            {/* 국적 스켈레톤 */}
            <div className='flex gap-2'>
              <div className='h-6 w-12 animate-pulse rounded bg-[#e5e5e5]' />
              <div className='h-6 w-16 animate-pulse rounded bg-[#e5e5e5]' />
            </div>
            {/* 연락처 정보 스켈레톤 */}
            <div className='flex gap-2'>
              <div className='h-6 w-20 animate-pulse rounded bg-[#e5e5e5]' />
              <div className='h-6 w-24 animate-pulse rounded bg-[#e5e5e5]' />
            </div>
          </div>

          <div className='h-8' />
        </div>
      </div>
    </div>
  );
}
