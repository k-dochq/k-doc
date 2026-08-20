/**
 * 플로팅 CTA 버튼의 시각 레이어.
 *
 * 라벨을 제외한 배경·테두리·그림자만 그린다. 감싸는 요소(button / a)는 쓰는 쪽에서 정하고,
 * 라벨은 이 컴포넌트 뒤에 `relative z-10` 으로 얹는다.
 *
 * 컨시어지와 이벤트 페이지가 같은 버튼 디자인을 쓰기로 해서 분리했다.
 * 디자인이 바뀌면 이 파일만 고치면 된다.
 */
export function GlowPillSurface() {
  return (
    <>
      {/* 바깥 음영 */}
      <div className='absolute inset-0 rounded-full shadow-[inset_0_-4px_12px_rgba(0,0,0,0.3)]' />

      {/* 회전하는 테두리 (globals.css 의 animated-border) */}
      <div className='animated-border-wrapper absolute -inset-[1px] rounded-full'>
        <div className='animated-border absolute inset-0 rounded-full' />
      </div>

      {/* 버튼 본체 */}
      <div
        className='absolute inset-[4px] rounded-full'
        style={{
          background: 'linear-gradient(180deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.2)',
        }}
      />
    </>
  );
}

/** 화면 하단 고정 컨테이너에 쓰는 클래스 (버튼 높이 62px + 상하 여백) */
export const GLOW_PILL_BAR_HEIGHT_CLASS = 'h-[94px]';

/** 버튼 자체에 쓰는 클래스 */
export const GLOW_PILL_BUTTON_CLASS =
  'relative flex h-[62px] w-full items-center justify-center overflow-hidden rounded-full';
