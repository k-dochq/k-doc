'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useKdocThreadHistory } from 'lib/queries/kdoc-chat';
import { KdocThreadCard } from './KdocThreadCard';
import { KdocThreadSkeleton } from './KdocThreadSkeleton';

interface KdocThreadListProps {
  lang: Locale;
  dict: Dictionary;
}

export function KdocThreadList({ lang, dict }: KdocThreadListProps) {
  const { threads, isLoading, error } = useKdocThreadHistory();

  if (isLoading) {
    return <KdocThreadSkeleton count={3} />;
  }

  if (error) {
    return (
      <div className='flex flex-1 items-center justify-center px-5'>
        <p className='text-sm text-[#a3a3a3]'>{dict.kdocChat.gnb.historyLoadError}</p>
      </div>
    );
  }

  if (!threads || threads.length === 0) {
    return (
      <div className='flex flex-1 items-center justify-center px-5'>
        <p className='text-sm text-[#a3a3a3]'>{dict.kdocChat.gnb.emptyHistory}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col px-5'>
      {threads.map((thread) => (
        <KdocThreadCard key={thread.id} thread={thread} lang={lang} dict={dict} />
      ))}
    </div>
  );
}
