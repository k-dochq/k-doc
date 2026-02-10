'use client';

import { useRef, useState } from 'react';
import { SpeakerMutedIcon, SpeakerUnmutedIcon } from './icons';

interface DonationVideoSectionProps {
  videoSrc: string;
}

export function DonationVideoSection({ videoSrc }: DonationVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div className='relative w-full aspect-[753/1000] overflow-hidden bg-black'>
      <video
        ref={videoRef}
        className='w-full h-full object-cover'
        src={videoSrc}
        autoPlay
        playsInline
        muted={isMuted}
        loop
        preload='auto'
      />
      <button
        type='button'
        onClick={handleToggleMute}
        className='absolute left-[37px] bottom-[40px] flex size-[60px] items-center justify-center p-0 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <SpeakerMutedIcon /> : <SpeakerUnmutedIcon />}
      </button>
    </div>
  );
}
