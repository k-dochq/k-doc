'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from 'shared/config';
import { useKdocChatFlow } from '../model/useKdocChatFlow';
import { useKdocRealtimeChat } from '../model/useKdocRealtimeChat';
import { formatTime, formatTodayLabel } from '../lib/chat-time-utils';
import { CATEGORIES } from '../lib/chat-constants';
import { KdocChatGnb } from './KdocChatGnb';
import { KdocCategoryChips } from './KdocCategoryChips';
import { KdocGuestInfoForm } from './KdocGuestInfoForm';
import { KdocAdminMessageBubble, KdocUserMessageBubble } from './KdocMessageBubble';
import { KdocChatInput } from './KdocChatInput';
import { KdocMsgAvatar } from './icons/KdocChatIcons';

interface KdocChatPageProps {
  lang: Locale;
}

const WELCOME_MESSAGE =
  '안녕하세요, 고객님 😀\nK-DOC 1:1 채팅 상담센터입니다.\n\n궁금하신 사항을 선택해주세요 😊\n해당하는 문의가 없는 경우 [기타]를\n선택해 주세요.\n\n운영시간(KST) - 토, 일, 공휴일 제외\n평일 09:00 ~ 18:00';

export function KdocChatPage({ lang }: KdocChatPageProps) {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    phase,
    selectedCategory,
    threadId,
    isCreatingThread,
    guestInfo,
    setGuestInfo,
    handleCategorySelect,
    handleGuestSubmit,
  } = useKdocChatFlow();

  const { messages, isLoading, sendMessage } = useKdocRealtimeChat({ threadId });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, phase]);

  return (
    <>
      <KdocChatGnb
        lang={lang}
        onBack={() => router.back()}
        onClose={() => router.push(`/${lang}`)}
      />

      <div className='flex-1 overflow-y-auto bg-white px-5'>
        {/* 날짜 */}
        <div className='py-5 text-center'>
          <span className='text-sm text-[#737373]'>{formatTodayLabel()}</span>
        </div>

        {/* 웰컴 메시지 */}
        <KdocAdminMessageBubble content={WELCOME_MESSAGE} createdAt={new Date()} />

        {/* 카테고리 칩 */}
        {phase === 'category' && <KdocCategoryChips onSelect={handleCategorySelect} />}

        {/* 게스트 폼 */}
        {phase === 'guest_form' && selectedCategory && (
          <>
            <KdocUserMessageBubble
              content={CATEGORIES.find((c) => c.key === selectedCategory)?.label ?? ''}
              createdAt={new Date()}
            />
            <KdocAdminMessageBubble
              content={'원활한 상담 진행을 위해 정보를 입력해주세요.\n오프라인 상태가 되면 이메일로 답변 알림을 보내드려요.'}
              createdAt={new Date()}
            />
            <KdocGuestInfoForm
              guestInfo={guestInfo}
              isSubmitting={isCreatingThread}
              onChangeInfo={setGuestInfo}
              onSubmit={handleGuestSubmit}
            />
          </>
        )}

        {/* 실제 메시지 목록 */}
        {phase === 'chat' && (
          <>
            {isLoading && (
              <p className='py-4 text-center text-xs text-[#a3a3a3]'>메시지를 불러오는 중...</p>
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

      {phase === 'chat' && <KdocChatInput onSend={sendMessage} />}
    </>
  );
}
