import Image from 'next/image';
import { LocaleLink } from 'shared/ui/locale-link';
import { ShareButton } from 'shared/ui/share-button';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';

interface DynamicEventHeaderProps {
  /** 이벤트 타이틀. 폭이 좁으면 말줄임(...) 처리된다 */
  title: string;
}

/**
 * 이벤트 페이지 전용 헤더 — 로고(홈 이동) + 타이틀 + 공유.
 *
 * 광고로 진입한 사용자는 뒤로가기가 광고 페이지로 돌아가 메인에 갈 수 없어서,
 * 뒤로가기 대신 로고를 홈 진입 동선으로 쓴다. (QA 이슈: 이벤트 페이지 헤더 수정)
 */
export function DynamicEventHeader({ title }: DynamicEventHeaderProps) {
  return (
    <div
      className={`fixed top-0 left-1/2 z-50 flex h-[58px] w-full -translate-x-1/2 items-center gap-2 border-neutral-200 bg-white px-5 ${MAX_MOBILE_WIDTH_CLASS}`}
    >
      {/* 로고 → 홈 */}
      <LocaleLink href='/main' aria-label='K-DOC Home' className='shrink-0'>
        <Image src='/logo_3d.png' alt='K-DOC' width={87} height={24} priority />
      </LocaleLink>

      {/* 타이틀 — 남는 폭만 차지하고 넘치면 말줄임 */}
      <h1 className='min-w-0 flex-1 truncate text-lg leading-tight font-semibold text-neutral-700'>
        {title}
      </h1>

      <ShareButton title={title} text={title} className='shrink-0 text-neutral-700' />
    </div>
  );
}
