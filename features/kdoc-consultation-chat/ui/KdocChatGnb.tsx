import { type Locale } from 'shared/config';
import { BackArrowIcon, CloseIcon, KdocHeaderIcon } from './icons/KdocChatIcons';

interface KdocChatGnbProps {
  lang: Locale;
  onBack: () => void;
  onClose: () => void;
}

export function KdocChatGnb({ onBack, onClose }: KdocChatGnbProps) {
  return (
    <header className='flex h-[58px] items-center justify-between border-b border-[#e5e5e5] bg-white px-5'>
      <div className='flex flex-1 items-center gap-1'>
        <button onClick={onBack} className='flex h-6 w-6 items-center justify-center' aria-label='뒤로가기'>
          <BackArrowIcon />
        </button>
        <div className='flex flex-1 items-center gap-[6px]'>
          <KdocHeaderIcon />
          <div className='flex flex-col items-start justify-center'>
            <p className='text-base font-semibold leading-6 text-[#404040]'>K-DOC</p>
            <p className='text-xs leading-4 text-[#a3a3a3]'>빠르게 답변 받으실 수 있어요</p>
          </div>
        </div>
      </div>
      <button onClick={onClose} className='flex h-6 w-6 items-center justify-center' aria-label='닫기'>
        <CloseIcon />
      </button>
    </header>
  );
}
