'use client';

import { type Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';
import { useState, useEffect } from 'react';

interface PaymentLoadingProps {
  lang: Locale;
  dict: Dictionary;
  message?: string;
}

export function PaymentLoading({ lang, dict, message }: PaymentLoadingProps) {
  const displayMessage = message || dict.payment.loading.preparing;
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  // Dictionary에서 로딩 팁 메시지 가져오기
  const tips = dict.payment.loading.tips;

  // 프로그레스 바 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90; // 실제 완료 전까지는 90%에서 대기
        return prev + Math.random() * 15;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // 팁 메시지 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50'>
      <div className='mx-auto max-w-md px-4 text-center'>
        {/* 애니메이션 아이콘 */}
        <div className='mb-8 flex justify-center'>
          <div className='relative'>
            <div className='h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-blue-100 to-purple-100'></div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl'>
              💳
            </div>
          </div>
        </div>

        {/* 애플 스타일 점 로딩 인디케이터 */}
        <div className='mb-6 flex items-center justify-center space-x-1.5'>
          <div
            className='h-2 w-2 animate-pulse rounded-full bg-gray-900'
            style={{ animationDelay: '0s' }}
          />
          <div
            className='h-2 w-2 animate-pulse rounded-full bg-gray-900'
            style={{ animationDelay: '0.2s' }}
          />
          <div
            className='h-2 w-2 animate-pulse rounded-full bg-gray-900'
            style={{ animationDelay: '0.4s' }}
          />
        </div>

        {/* 로딩 메시지 */}
        <div className='mb-6 space-y-2'>
          <p className='text-base font-medium text-gray-900'>{displayMessage}</p>
        </div>

        {/* 프로그레스 바 */}
        <div className='mb-6'>
          <div className='h-1 w-full overflow-hidden rounded-full bg-gray-200'>
            <div
              className='h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className='mt-2 text-xs text-gray-500'>{Math.round(progress)}%</p>
        </div>

        {/* 순환하는 팁 메시지 */}
        <div className='relative h-20 overflow-hidden'>
          {tips.map((tip, index) => (
            <div
              key={index}
              className={`absolute w-full transition-all duration-500 ${
                index === currentTip
                  ? 'translate-y-0 opacity-100'
                  : index < currentTip
                    ? '-translate-y-full opacity-0'
                    : 'translate-y-full opacity-0'
              }`}
            >
              <p className='text-sm text-gray-600'>{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
