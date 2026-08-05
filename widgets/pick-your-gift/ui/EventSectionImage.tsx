export interface EventSectionImageProps {
  src: string;
  alt: string;
  /** 원본 intrinsic 크기 (@2x). 비율 계산·공간 예약(CLS 방지)에 쓰인다 */
  width: number;
  height: number;
  /** 첫 화면에 보이는 섹션만 true — 즉시 로드 + 우선순위 상향(LCP). 나머지는 lazy */
  priority?: boolean;
}

/**
 * 이벤트 페이지의 세로 스택 이미지 한 장.
 *
 * next/image 를 쓰지 않고 순수 img 로 렌더한다. width/height 속성을 그대로 두면
 * 브라우저가 aspect-ratio 를 계산해 로드 전에도 자리를 잡아주므로 레이아웃 시프트가 없다.
 * 컨테이너(MaxWidthLayout, max-w-500px) 폭을 채우고 높이는 원본 비율을 따른다.
 */
export function EventSectionImage({ src, alt, width, height, priority }: EventSectionImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- 이벤트 페이지는 next/image 최적화를 쓰지 않기로 결정
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className='block h-auto w-full'
    />
  );
}
