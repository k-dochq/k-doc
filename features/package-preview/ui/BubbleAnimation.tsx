interface BubbleAnimationProps {
  src: string;
}

export function BubbleAnimation({ src }: BubbleAnimationProps) {
  return (
    <img
      src={src}
      alt=''
      className='animate-float pointer-events-none absolute -bottom-4 left-1/2 w-32 -translate-x-1/2 md:-bottom-4 md:w-48'
    />
  );
}
