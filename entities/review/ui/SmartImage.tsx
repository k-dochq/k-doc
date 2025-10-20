'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SmartImageProps {
  src: string;
  alt: string;
  sizes: string;
  onError?: () => void;
  className?: string;
}

export function SmartImage({ src, alt, sizes, onError, className = '' }: SmartImageProps) {
  const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');

  const handleLoadingComplete = (img: HTMLImageElement) => {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    
    // 가로가 세로보다 2배 이상 길면 (가로로 매우 긴 이미지) contain 사용
    // 그 외에는 cover 사용
    if (aspectRatio > 2) {
      setObjectFit('contain');
    } else {
      setObjectFit('cover');
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit, objectPosition: 'center' }}
      sizes={sizes}
      onLoadingComplete={handleLoadingComplete}
      onError={onError}
      className={className}
    />
  );
}

