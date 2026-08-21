import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config/layout';
import { LocaleLink } from 'shared/ui/locale-link';

export interface BeautyLuckyDrawFloatingButtonProps {
  lang: Locale;
  dict: Dictionary;
}

/**
 * 이벤트 페이지 하단 고정 CTA. 병원 검색(/hospitals)으로 보낸다.
 *
 * 스타일은 UID 디자인 운영 파일의 핑크 버튼(node 8883:22027)을 따른다 —
 * 핑크 라디얼 그라데이션 + 그라데이션 보더(97deg #FF7FB3→#FF005B) + 우상단 흰색 광택.
 */
export function BeautyLuckyDrawFloatingButton({ lang, dict }: BeautyLuckyDrawFloatingButtonProps) {
  void lang; // LocaleLink 가 현재 로케일을 유지한다

  return (
    <div
      className={`fixed bottom-0 left-1/2 z-50 h-[94px] w-full -translate-x-1/2 px-5 ${MAX_MOBILE_WIDTH_CLASS}`}
    >
      <LocaleLink
        href='/hospitals'
        className='relative flex h-[62px] w-full items-center justify-center overflow-hidden rounded-full px-6'
      >
        {/* 보더: border-image 는 라운드 코너와 함께 쓸 수 없어 레이어로 그린다 */}
        <div
          className='pointer-events-none absolute inset-0 rounded-[inherit]'
          style={{ background: 'linear-gradient(97deg, #FF7FB3 0%, #FF005B 100%)' }}
        />
        {/* 본체: 2px 안쪽 — 남는 테두리가 곧 그라데이션 보더가 된다 */}
        <div
          className='pointer-events-none absolute inset-[2px] rounded-full'
          style={{
            background:
              'radial-gradient(140% 340% at 55% 0%, #FF94B9 0%, #FF6F9D 16%, #FF4980 32%, #DF245C 66%, #D0124A 83%, #C00038 100%)',
          }}
        />
        {/* 우상단 광택 하이라이트 */}
        <div className='pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_-5px_5px_5px_0px_rgba(255,255,255,0.56)]' />
        <span className='relative z-10 text-center text-[16px] leading-6 font-medium break-words text-white'>
          {dict.beautyLuckyDraw.floatingButton}
        </span>
      </LocaleLink>
    </div>
  );
}
