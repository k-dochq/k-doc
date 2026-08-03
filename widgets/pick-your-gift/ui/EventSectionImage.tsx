import Image from 'next/image';

export interface EventSectionImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** 첫 화면에 보이는 섹션만 true — LCP 개선용. 나머지는 next/image 기본 lazy 로딩 */
  priority?: boolean;
}

/**
 * 이벤트 페이지의 세로 스택 이미지 한 장.
 *
 * 컨테이너(MaxWidthLayout, max-w-500px) 폭을 채우고 높이는 원본 비율을 따른다.
 * width/height 는 intrinsic 크기로 비율 계산·공간 예약(CLS 방지)에만 쓰인다.
 */
export function EventSectionImage({ src, alt, width, height, priority }: EventSectionImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes='(max-width: 500px) 100vw, 500px'
      priority={priority}
      className='block h-auto w-full'
    />
  );
}
