import { type Locale } from 'shared/config';
import { LocaleLink } from 'shared/ui/locale-link';
import { type Dictionary } from 'shared/model/types';

interface NoticeSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function NoticeSection({ lang, dict }: NoticeSectionProps) {
  const noticeDict = dict.noticeSection;

  return (
    <div className='px-5'>
      <div className='rounded-xl border border-solid border-white bg-[rgba(255,255,255,0.5)] p-8 backdrop-blur-[6px] backdrop-filter'>
        <div className='flex flex-col items-center gap-6'>
          <p className='text-center text-lg leading-7 font-bold text-[#da47ef]'>
            {noticeDict?.title || '새로운 소식을 확인해보세요!'}
          </p>

          <LocaleLink
            href='/notices'
            className='flex h-14 w-full items-center justify-center rounded-xl bg-[#da47ef] px-10 py-4'
          >
            <p className='text-base leading-6 font-medium text-white'>
              {noticeDict?.buttonText || '공지사항 보러가기'}
            </p>
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
