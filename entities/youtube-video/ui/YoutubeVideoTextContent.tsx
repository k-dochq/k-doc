import { type Locale } from 'shared/config';

interface YoutubeVideoTextContentProps {
  title: string;
  description: string;
  lang?: Locale;
}

export function YoutubeVideoTextContent({ title, description, lang }: YoutubeVideoTextContentProps) {
  return (
    <div className='relative box-border flex w-full shrink-0 flex-col items-start gap-[2px] px-2 py-0 not-italic'>
      {/* 타이틀 (한 줄 ellipsis) */}
      <p
        className='relative w-full min-w-0 shrink-0 overflow-hidden text-[18px] leading-[28px] font-semibold text-ellipsis whitespace-nowrap text-neutral-700'
        dir={lang === 'ar' ? 'rtl' : undefined}
      >
        {title}
      </p>
      {/* 설명 (2줄 ellipsis) */}
      <p
        className='relative line-clamp-2 w-full shrink-0 overflow-hidden text-[14px] leading-[20px] font-[500] text-neutral-500'
        dir={lang === 'ar' ? 'rtl' : undefined}
      >
        {description}
      </p>
    </div>
  );
}
