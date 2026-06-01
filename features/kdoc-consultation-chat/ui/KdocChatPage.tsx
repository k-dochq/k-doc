'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useKdocChatFlow } from '../model/useKdocChatFlow';
import { useKdocRealtimeChat } from '../model/useKdocRealtimeChat';
import { formatTodayLabel } from '../lib/chat-time-utils';
import { KdocChatGnb } from './KdocChatGnb';
import { KdocCategoryChips } from './KdocCategoryChips';
import { KdocGuestInfoForm, KdocGuestInfoCard } from './KdocGuestInfoForm';
import { KdocAdminMessageBubble, KdocUserMessageBubble } from './KdocMessageBubble';
import { KdocChatInput } from './KdocChatInput';

interface KdocChatPageProps {
  lang: Locale;
  dict: Dictionary;
}

export function KdocChatPage({ lang, dict }: KdocChatPageProps) {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);
  const t = dict.kdocChat;

  const {
    phase,
    selectedCategory,
    selectedCategoryLabel,
    threadId,
    isCreatingThread,
    guestInfo,
    setGuestInfo,
    handleCategorySelect,
    handleGuestSubmit,
    handleEditGuestInfo,
  } = useKdocChatFlow();

  const { messages, isLoading, sendMessage } = useKdocRealtimeChat({ threadId });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, phase]);

  return (
    <>
      <KdocChatGnb
        dict={dict}
        onBack={() => router.back()}
        onClose={() => router.push(`/${lang}`)}
      />

      <div className='flex-1 overflow-y-auto bg-white px-5'>
        {/* 날짜 */}
        <div className='py-5 text-center'>
          <span className='text-sm text-[#737373]'>{formatTodayLabel()}</span>
        </div>

        {/* 웰컴 메시지 */}
        <KdocAdminMessageBubble content={t.welcome} createdAt={new Date()} />

        {/* 카테고리 칩 */}
        {phase === 'category' && (
          <KdocCategoryChips dict={dict} onSelect={handleCategorySelect} />
        )}

        {/* 비회원 게스트 폼 플로우 */}
        {(phase === 'guest_form' || phase === 'guest_submitted') && selectedCategoryLabel && (
          <>
            <KdocUserMessageBubble content={selectedCategoryLabel} createdAt={new Date()} />
            <KdocAdminMessageBubble content={t.guestForm.infoMessage} createdAt={new Date()} />
            {phase === 'guest_form' ? (
              <KdocGuestInfoForm
                dict={dict}
                guestInfo={guestInfo}
                isSubmitting={isCreatingThread}
                onChangeInfo={setGuestInfo}
                onSubmit={handleGuestSubmit}
              />
            ) : (
              <KdocGuestInfoCard
                dict={dict}
                guestInfo={guestInfo}
                onEdit={handleEditGuestInfo}
              />
            )}
            {phase === 'guest_submitted' && (
              <KdocAdminMessageBubble
                content={t.guestForm.savedMessage}
                createdAt={new Date()}
              />
            )}
          </>
        )}

        {/* 실제 메시지 목록 */}
        {phase === 'chat' && (
          <>
            {isLoading && (
              <p className='py-4 text-center text-xs text-[#a3a3a3]'>{t.loading}</p>
            )}
            {messages.map((msg) =>
              msg.senderType === 'USER' ? (
                <KdocUserMessageBubble
                  key={msg.id}
                  content={msg.content}
                  createdAt={msg.createdAt}
                />
              ) : (
                <KdocAdminMessageBubble
                  key={msg.id}
                  content={msg.content}
                  createdAt={msg.createdAt}
                />
              ),
            )}
          </>
        )}

        <div ref={bottomRef} />
      </div>

      {(phase === 'chat' || phase === 'guest_submitted') && (
        <KdocChatInput dict={dict} onSend={sendMessage} />
      )}
    </>
  );
}
