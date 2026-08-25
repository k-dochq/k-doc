import { type Locale } from 'shared/config';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config/layout';
import { LocaleLink } from 'shared/ui/locale-link';

interface DynamicEventFloatingButtonProps {
  label: string;
  link: string;
  lang: Locale;
}

/**
 * 어드민에서 입력한 링크로 보내는 하단 고정 CTA.
 *
 * /로 시작하면 서비스 내부 이동(언어 유지), http 로 시작하면 외부 링크로 새 탭에서 연다.
 * 스타일은 이벤트 페이지 공통 핑크 버튼(UID 디자인 운영 8883:22027)이다.
 */
export function DynamicEventFloatingButton({ label, link, lang }: DynamicEventFloatingButtonProps) {
  void lang;
  const isExternal = /^https?:\/\//.test(link);

  const inner = (
    <>
      {/* 핑크 라디얼 그라데이션 배경 */}
      <div
        className='pointer-events-none absolute inset-0 rounded-[inherit]'
        style={{
          background:
            'radial-gradient(140% 340% at 55% 0%, #FF94B9 0%, #FF6F9D 16%, #FF4980 32%, #DF245C 66%, #D0124A 83%, #C00038 100%)',
        }}
      />
      {/* 우상단 광택 하이라이트 */}
      <div className='pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_-5px_5px_5px_0px_rgba(255,255,255,0.56)]' />
      <span className='relative z-10 text-center text-[16px] leading-6 font-medium break-words text-white'>
        {label}
      </span>
    </>
  );

  const buttonClass =
    'relative flex h-[62px] w-full items-center justify-center overflow-hidden rounded-full border-2 border-[#ff7fb3] px-6';

  return (
    <div
      className={`fixed bottom-0 left-1/2 z-50 h-[94px] w-full -translate-x-1/2 px-5 ${MAX_MOBILE_WIDTH_CLASS}`}
    >
      {isExternal ? (
        <a href={link} target='_blank' rel='noopener noreferrer' className={buttonClass}>
          {inner}
        </a>
      ) : (
        <LocaleLink href={link} className={buttonClass}>
          {inner}
        </LocaleLink>
      )}
    </div>
  );
}
