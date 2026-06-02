'use client';

import { useRef, useEffect, useCallback } from 'react';
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
import { KdocHospitalCarousel, parseHospitalCards } from './KdocHospitalCarousel';
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
    selectedCategoryLabel,
    threadId,
    isCreatingThread,
    guestInfo,
    setGuestInfo,
    handleCategorySelect,
    handleGuestSubmit,
    handleEditGuestInfo,
    transitionToChat,
  } = useKdocChatFlow();

  const { messages, isLoading, sendMessage } = useKdocRealtimeChat({ threadId });

  // guest_submitted → chat 전환 + 메시지 전송을 묶어서 처리
  const handleSend = useCallback(
    (text: string) => {
      if (phase === 'guest_submitted') {
        transitionToChat();
      }
      sendMessage(text);
    },
    [phase, transitionToChat, sendMessage],
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, phase]);

  const hasGuestInfo = !!(guestInfo.name || guestInfo.email || guestInfo.nationality);

  // chat phase에서 비회원은 카테고리 메시지를 로컬로 렌더하므로 DB 첫 메시지 중복 제외
  const chatMessages =
    phase === 'chat' && hasGuestInfo && selectedCategoryLabel
      ? messages.filter(
          (m, i) => !(i === 0 && m.senderType === 'USER' && m.content === selectedCategoryLabel),
        )
      : messages;

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

        {/* 비회원 게스트 폼 플로우 (guest_form / guest_submitted / chat 히스토리) */}
        {(phase === 'guest_form' || phase === 'guest_submitted' || (phase === 'chat' && hasGuestInfo)) &&
          selectedCategoryLabel && (
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
                <>
                  <KdocGuestInfoCard
                    dict={dict}
                    guestInfo={guestInfo}
                    onEdit={handleEditGuestInfo}
                  />
                  <KdocAdminMessageBubble
                    content={t.guestForm.savedMessage}
                    createdAt={new Date()}
                  />
                </>
              )}
            </>
          )}

        {/* chat phase — DB 메시지 목록 */}
        {phase === 'chat' && (
          <>
            {isLoading && (
              <p className='py-4 text-center text-xs text-[#a3a3a3]'>{t.loading}</p>
            )}
            {chatMessages.map((msg) => {
              if (msg.senderType === 'USER') {
                return (
                  <KdocUserMessageBubble
                    key={msg.id}
                    content={msg.content}
                    createdAt={msg.createdAt}
                  />
                );
              }
              const hospitals = parseHospitalCards(msg.content);
              if (hospitals) {
                return (
                  <div key={msg.id} className='flex justify-start py-1'>
                    <KdocHospitalCarousel hospitals={hospitals} />
                  </div>
                );
              }
              return (
                <KdocAdminMessageBubble
                  key={msg.id}
                  content={msg.content}
                  createdAt={msg.createdAt}
                />
              );
            })}
          </>
        )}

        <div ref={bottomRef} />
      </div>

      {(phase === 'chat' || phase === 'guest_submitted') && (
        <KdocChatInput dict={dict} onSend={handleSend} />
      )}
    </>
  );
}
