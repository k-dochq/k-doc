'use client';

import { useState, useEffect } from 'react';

export function AboutTaglineV2() {
  const [isTextAnimated, setIsTextAnimated] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const taglines = ['Connecting', 'Global Patients', "to Korea's", 'Top 10% Doctors', '& Clinics'];

  useEffect(() => {
    // 텍스트 애니메이션 시작
    const textTimer = setTimeout(() => {
      setIsTextAnimated(true);
    }, 100);

    // 비디오 애니메이션 시작 (텍스트 완료 후)
    const videoTimer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1000); // 100ms + 800ms(텍스트) + 100ms(딜레이)

    return () => {
      clearTimeout(textTimer);
      clearTimeout(videoTimer);
    };
  }, []);

  const getTextStyle = (isAnimated: boolean) => ({
    background: 'linear-gradient(to right, #404040 0%, #404040 50%, #e5e5e5 50%, #e5e5e5 100%)',
    backgroundSize: '200% 100%',
    backgroundPosition: isAnimated ? '0% 0%' : '100% 0%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transition: 'background-position 800ms ease-in-out',
  });

  return (
    <div className='px-8 py-[83px]'>
      <div className='flex w-fit flex-col gap-3'>
        {taglines.map((tagline, index) => {
          // 첫 번째 문장: Connecting + travel 비디오
          if (index === 0) {
            return (
              <div key={index} className='flex items-center gap-3'>
                <p className='text-4xl font-bold font-pretendard' style={getTextStyle(isTextAnimated)}>
                  {tagline}
                </p>
                <div
                  className='relative h-[48px] overflow-hidden rounded-xl'
                  style={{
                    width: isVideoLoaded ? '84px' : '0px',
                    opacity: isVideoLoaded ? 1 : 0,
                    transformOrigin: 'left',
                    transition: 'width 500ms ease-in-out, opacity 500ms ease-in-out',
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
                  className='relative h-[48px] overflow-hidden rounded-xl'
                  style={{
                    width: isVideoLoaded ? '84px' : '0px',
                    opacity: isVideoLoaded ? 1 : 0,
                    transformOrigin: 'left',
                    transition: 'width 500ms ease-in-out, opacity 500ms ease-in-out',
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
                <p className='text-4xl font-bold font-pretendard' style={getTextStyle(isTextAnimated)}>
                  {tagline}
                </p>
              </div>
            );
          }

          // 다섯 번째 문장: & Clinics + kdoc_introduce 비디오
          if (index === 4) {
            return (
              <div key={index} className='flex items-center gap-3'>
                <p className='text-4xl font-bold font-pretendard' style={getTextStyle(isTextAnimated)}>
                  {tagline}
                </p>
                <div
                  className='relative h-[48px] overflow-hidden rounded-xl'
                  style={{
                    width: isVideoLoaded ? '84px' : '0px',
                    opacity: isVideoLoaded ? 1 : 0,
                    transformOrigin: 'left',
                    transition: 'width 500ms ease-in-out, opacity 500ms ease-in-out',
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
            <p key={index} className='text-4xl font-bold font-pretendard' style={getTextStyle(isTextAnimated)}>
              {tagline}
            </p>
          );
        })}
      </div>
    </div>
  );
}
