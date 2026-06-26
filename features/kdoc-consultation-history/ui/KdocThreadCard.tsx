'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type KdocThread } from 'lib/queries/kdoc-chat';
import { formatDateSimple } from 'shared/lib/date-utils';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface KdocThreadCardProps {
  thread: KdocThread;
  lang: Locale;
  dict: Dictionary;
}

export function KdocThreadCard({ thread, lang, dict }: KdocThreadCardProps) {
  const router = useLocalizedRouter();
  const categoryLabel =
    dict.kdocChat.categories[thread.category as keyof typeof dict.kdocChat.categories] ??
    thread.category;

  const displayDate = thread.lastMessageDate ?? thread.updatedAt;
  const previewText = thread.lastMessageContent ?? dict.kdocChat.gnb.noMessages;

  return (
    <button
      onClick={() => router.push(`/kdoc-chat?threadId=${thread.id}`)}
      className='flex w-full items-center gap-3 border-b border-neutral-200 py-5 text-left'
    >
      {/* K-DOC 아바타 */}
      <div className='relative h-[46px] w-[46px] flex-shrink-0 overflow-hidden rounded-full border border-[#e5e5e5]'>
        <img
          src='/images/kdoc-chat/kdoc-avatar.png'
          alt='K-DOC'
          className='h-full w-full object-cover'
        />
      </div>

      {/* 정보 영역 */}
      <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
        <div className='flex items-center gap-2'>
          <p className='min-w-0 flex-1 text-base font-semibold leading-6 text-[#404040]'>
            {categoryLabel}
          </p>
          <p className='shrink-0 text-xs leading-4 text-[#a3a3a3]'>
            {formatDateSimple(displayDate, lang)}
          </p>
        </div>
        <p className='min-w-0 truncate text-sm leading-5 text-[#737373]'>{previewText}</p>
      </div>
    </button>
  );
}
