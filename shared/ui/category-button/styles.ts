// 카테고리 버튼 공통 스타일
export const categoryButtonStyles = {
  container:
    'flex h-[60px] w-[60px] items-center justify-center rounded-xl border border-white bg-gradient-to-b from-white to-[#FFD9F9] shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] transition-all duration-200 ease-out hover:scale-105 hover:shadow-[2px_2px_16px_0_rgba(76,25,168,0.2)] active:scale-95 active:shadow-[0px_0px_8px_0_rgba(76,25,168,0.15)]',
  label:
    'w-full min-w-0 text-center text-xs leading-4 font-medium text-neutral-900 break-words line-clamp-2',
  wrapper: 'flex min-w-0 flex-col items-center gap-1 w-[50px]',
} as const;
