'use client';

interface AddressCopyButtonProps {
  address: string;
  onCopy: () => void;
  disabled?: boolean;
}

/**
 * 주소 복사 버튼 컴포넌트
 */
export function AddressCopyButton({ address, onCopy, disabled }: AddressCopyButtonProps) {
  const isDisabled = disabled || address.includes('실패') || address.includes('찾을 수 없습니다');

  return (
    <button
      onClick={onCopy}
      disabled={isDisabled}
      className='flex-shrink-0 rounded border border-neutral-100 px-1 py-0.5 text-xs leading-4 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50'
    >
      주소복사
    </button>
  );
}
