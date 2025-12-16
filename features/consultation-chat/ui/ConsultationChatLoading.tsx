'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeader, PageHeaderV2 } from 'shared/ui/page-header';

interface ConsultationChatLoadingProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationChatLoading({ lang, dict }: ConsultationChatLoadingProps) {
  return (
    <div className='flex h-screen flex-col bg-white'>
      <PageHeaderV2
        title={dict.consultation?.chat || '상담채팅'}
        fallbackUrl={`/${lang}/consultation`}
      />

      {/* 채팅 메시지 영역 스켈레톤 */}
      <div className='flex-1 overflow-hidden p-4'>
        <div className='space-y-4'>
          {/* 날짜 구분선 스켈레톤 */}
          <div className='flex justify-center'>
            <div className='h-6 w-32 animate-pulse rounded-full bg-neutral-200'></div>
          </div>

          {/* 사용자 메시지 스켈레톤들 (오른쪽 정렬) */}
          <div className='flex justify-end'>
            <div className='max-w-[80%] space-y-2'>
              <div className='h-12 w-48 animate-pulse rounded-2xl rounded-br-md bg-neutral-200'></div>
              <div className='ml-auto h-3 w-8 animate-pulse rounded bg-neutral-200'></div>
            </div>
          </div>

          {/* 클리닉 메시지 스켈레톤들 (왼쪽 정렬) */}
          <div className='flex items-start gap-3'>
            {/* 아바타 스켈레톤 */}
            <div className='h-8 w-8 animate-pulse rounded-full bg-neutral-200'></div>
            <div className='max-w-[80%] space-y-2'>
              {/* 발신자 이름 스켈레톤 */}
              <div className='h-4 w-24 animate-pulse rounded bg-neutral-200'></div>
              {/* 메시지 버블 스켈레톤 */}
              <div className='h-10 w-32 animate-pulse rounded-2xl rounded-bl-md bg-neutral-200'></div>
              {/* 시간 스켈레톤 */}
              <div className='h-3 w-8 animate-pulse rounded bg-neutral-200'></div>
            </div>
          </div>

          {/* 사용자 메시지 스켈레톤 (짧은 메시지) */}
          <div className='flex justify-end'>
            <div className='max-w-[80%] space-y-2'>
              <div className='h-8 w-20 animate-pulse rounded-2xl rounded-br-md bg-neutral-200'></div>
              <div className='ml-auto h-3 w-8 animate-pulse rounded bg-neutral-200'></div>
            </div>
          </div>

          {/* 클리닉 메시지 스켈레톤 (긴 메시지) */}
          <div className='flex items-start gap-3'>
            <div className='h-8 w-8 animate-pulse rounded-full bg-neutral-200'></div>
            <div className='max-w-[80%] space-y-2'>
              <div className='h-4 w-24 animate-pulse rounded bg-neutral-200'></div>
              <div className='h-12 w-40 animate-pulse rounded-2xl rounded-bl-md bg-neutral-200'></div>
              <div className='h-3 w-8 animate-pulse rounded bg-neutral-200'></div>
            </div>
          </div>

          {/* 사용자 메시지 스켈레톤 (중간 길이) */}
          <div className='flex justify-end'>
            <div className='max-w-[80%] space-y-2'>
              <div className='h-10 w-28 animate-pulse rounded-2xl rounded-br-md bg-neutral-200'></div>
              <div className='ml-auto h-3 w-8 animate-pulse rounded bg-neutral-200'></div>
            </div>
          </div>

          {/* 클리닉 메시지 스켈레톤 (짧은 메시지) */}
          <div className='flex items-start gap-3'>
            <div className='h-8 w-8 animate-pulse rounded-full bg-neutral-200'></div>
            <div className='max-w-[80%] space-y-2'>
              <div className='h-4 w-24 animate-pulse rounded bg-neutral-200'></div>
              <div className='h-8 w-16 animate-pulse rounded-2xl rounded-bl-md bg-neutral-200'></div>
              <div className='h-3 w-8 animate-pulse rounded bg-neutral-200'></div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 입력 영역 스켈레톤 */}
      <div className='relative box-border flex content-stretch items-end justify-between bg-white px-5 pt-4 pb-8'>
        <div className='pointer-events-none absolute inset-0 border-[1px_0px_0px] border-solid border-neutral-200 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.24)]' />

        <div className='flex w-full items-end justify-between'>
          <div className='relative flex-1 shrink-0'>
            {/* 입력 필드 스켈레톤 */}
            <div className='h-5 w-32 animate-pulse rounded bg-neutral-200'></div>
          </div>

          {/* 전송 버튼 스켈레톤 */}
          <div className='relative ml-4 flex size-[30px] shrink-0 items-center justify-center'>
            <div className='h-6 w-6 animate-pulse rounded bg-neutral-200'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
