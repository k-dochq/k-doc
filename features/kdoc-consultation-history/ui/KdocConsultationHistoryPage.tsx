'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { BackArrowIcon } from 'features/kdoc-consultation-chat/ui/icons/KdocChatIcons';
import { useNewInquiry } from '../model/useNewInquiry';
import { KdocThreadList } from './KdocThreadList';

interface KdocConsultationHistoryPageProps {
  lang: Locale;
  dict: Dictionary;
}

export function KdocConsultationHistoryPage({ lang, dict }: KdocConsultationHistoryPageProps) {
  const router = useLocalizedRouter();
  const t = dict.kdocChat.gnb;
  const { handleNewInquiry, isCreating } = useNewInquiry();

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <header className='flex h-[58px] shrink-0 items-center border-b border-[#f5f5f5] bg-white px-5'>
        <button
          onClick={() => router.push('/kdoc-chat')}
          className='flex h-6 w-6 items-center justify-center'
          aria-label={t.backLabel}
        >
          <BackArrowIcon />
        </button>
        <h1 className='ml-2 text-base font-semibold leading-6 text-[#404040]'>{t.menuLabel}</h1>
      </header>

      <main className='flex flex-1 flex-col'>
        <KdocThreadList lang={lang} dict={dict} />
      </main>

      {/* 우측 하단 플로팅 버튼
          right: 뷰포트 ≤500px → 20px 고정, 뷰포트 >500px → 컨테이너 우측 경계에서 20px
          max-w-[500px] 컨테이너 중앙 정렬 기준: calc(50vw - 230px) */}
      <button
        onClick={handleNewInquiry}
        disabled={isCreating}
        className='fixed bottom-12 right-[max(20px,calc(50vw-230px))] z-10 rounded-full bg-[#7657ff] px-4 py-3 text-sm font-semibold leading-5 text-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)] disabled:opacity-60'
      >
        {isCreating ? '...' : t.newInquiry}
      </button>
    </div>
  );
}
