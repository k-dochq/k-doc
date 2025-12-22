'use client';

import { useState, useEffect } from 'react';

export function AboutTaglineV2() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const taglines = ['Connecting', 'Global Patients', "to Korea's", 'Top 10% Doctors', '& Clinics'];

  useEffect(() => {
    // 비디오 로드 감지를 위한 약간의 지연
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='px-8 py-[83px]'>
      <div className='flex w-fit flex-col gap-3'>
        {taglines.map((tagline, index) => {
          // 첫 번째 문장: Connecting + travel 비디오
          if (index === 0) {
            return (
              <div key={index} className='flex items-center gap-3'>
                <p
                  className='text-4xl font-bold text-neutral-700'
                  style={{
                    transform: isVideoLoaded ? 'translateX(0)' : 'translateX(96px)',
                    transition: 'transform 500ms ease-in-out',
                  }}
                >
                  {tagline}
                </p>
                <div
                  className='relative h-[48px] w-[84px] overflow-hidden rounded-xl'
                  style={{
                    transform: isVideoLoaded ? 'translateX(0)' : 'translateX(100%)',
                    opacity: isVideoLoaded ? 1 : 0,
                    transition: 'transform 500ms ease-in-out, opacity 500ms ease-in-out',
                  }}
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

          // 세 번째 문장: beauty 비디오 + to Korea's
          if (index === 2) {
            return (
              <div key={index} className='flex items-center gap-3'>
                <div
                  className='relative h-[48px] w-[84px] overflow-hidden rounded-xl'
                  style={{
                    transform: isVideoLoaded ? 'translateX(0)' : 'translateX(-100%)',
                    opacity: isVideoLoaded ? 1 : 0,
                    transition: 'transform 500ms ease-in-out, opacity 500ms ease-in-out',
                  }}
                >
                  <video
                    src='/videos/about-beauty.mp4'
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster='/images/about-beauty-poster.png'
                    className='h-full w-full object-cover'
                  />
                </div>
                <p
                  className='text-4xl font-bold text-neutral-700'
                  style={{
                    transform: isVideoLoaded ? 'translateX(0)' : 'translateX(-96px)',
                    transition: 'transform 500ms ease-in-out',
                  }}
                >
                  {tagline}
                </p>
              </div>
            );
          }

          // 다섯 번째 문장: & Clinics + kdoc_introduce 비디오
          if (index === 4) {
            return (
              <div key={index} className='flex items-center gap-3'>
                <p
                  className='text-4xl font-bold text-neutral-700'
                  style={{
                    transform: isVideoLoaded ? 'translateX(0)' : 'translateX(96px)',
                    transition: 'transform 500ms ease-in-out',
                  }}
                >
                  {tagline}
                </p>
                <div
                  className='relative h-[48px] w-[84px] overflow-hidden rounded-xl'
                  style={{
                    transform: isVideoLoaded ? 'translateX(0)' : 'translateX(100%)',
                    opacity: isVideoLoaded ? 1 : 0,
                    transition: 'transform 500ms ease-in-out, opacity 500ms ease-in-out',
                  }}
                >
                  <video
                    src='/videos/about-kdoc-introduce.mp4'
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster='/images/about-kdoc-introduce-poster.png'
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
    </div>
  );
}
