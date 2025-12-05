interface YoutubeVideoTextContentProps {
  title: string;
  description: string;
}

export function YoutubeVideoTextContent({ title, description }: YoutubeVideoTextContentProps) {
  return (
    <div className='relative box-border flex w-full shrink-0 flex-col items-start gap-[2px] px-2 py-0 not-italic'>
      {/* 타이틀 (한 줄 ellipsis) */}
      <p className='relative w-full min-w-0 shrink-0 overflow-hidden text-[18px] leading-[28px] font-semibold text-ellipsis whitespace-nowrap text-neutral-700'>
        {title}
      </p>
      {/* 설명 (한 줄 ellipsis) */}
      <p className='relative w-full shrink-0 overflow-hidden text-[14px] leading-[20px] font-[500] text-ellipsis whitespace-nowrap text-neutral-500'>
        {description}
      </p>
    </div>
  );
}
