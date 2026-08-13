import { LocaleLink } from 'shared/ui/locale-link';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config/layout';
import {
  GlowPillSurface,
  GLOW_PILL_BAR_HEIGHT_CLASS,
  GLOW_PILL_BUTTON_CLASS,
} from 'shared/ui/glow-pill';

export interface FreeGreatGiftFloatingButtonProps {
  /** 버튼 문구 (dict.freeGreatGift.floatingButton) */
  label: string;
}

/**
 * 이벤트 페이지 하단 고정 CTA. 병원 리스트로 보낸다.
 *
 * 디자인은 컨시어지 플로팅 버튼과 동일하며, 시각 레이어는 GlowPillSurface 를 공유한다.
 * 컨시어지는 상담 요청 액션이라 button 이지만 여기서는 이동만 하므로 링크로 둔다.
 */
export function FreeGreatGiftFloatingButton({ label }: FreeGreatGiftFloatingButtonProps) {
  return (
    <div
      className={`fixed bottom-0 left-1/2 z-50 w-full -translate-x-1/2 px-5 ${GLOW_PILL_BAR_HEIGHT_CLASS} ${MAX_MOBILE_WIDTH_CLASS}`}
    >
      <LocaleLink href='/hospitals' className={GLOW_PILL_BUTTON_CLASS}>
        <GlowPillSurface />
        <span className='relative z-10 text-[16px] leading-6 font-medium text-white'>{label}</span>
      </LocaleLink>
    </div>
  );
}
