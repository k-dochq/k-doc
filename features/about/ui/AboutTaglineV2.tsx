'use client';

import { useState, useEffect } from 'react';

export function AboutTaglineV2() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const taglines = ['Connecting', 'Global Patients', "to Korea's", 'Top 10% Doctors', '& Clinics'];

  useEffect(() => {
    // 컴포넌트 마운트 후 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex flex-col gap-3 px-5 py-[83px] transition-all duration-500 ease-in-out ${
        isVideoLoaded ? 'items-start' : 'items-center'
      }`}
    >
      {taglines.map((tagline, index) => {
        if (index === 0) {
          // 첫 번째 문장: Connecting + 비디오
          return (
            <div key={index} className='flex items-center gap-3'>
              <p className='text-4xl font-bold text-neutral-700'>{tagline}</p>
              <div
                className={`relative h-[48px] w-[91px] overflow-hidden rounded-xl transition-opacity duration-500 ease-in-out ${
                  isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <video
                  src='/videos/about-travel.mp4'
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster='/images/about-travel-poster.png'
                  className='h-full w-full object-cover'
                />
              </div>
            </div>
          );
        }
        // 나머지 문장
        return (
          <p key={index} className='text-4xl font-bold text-neutral-700'>
            {tagline}
          </p>
        );
      })}
    </div>
  );
}
