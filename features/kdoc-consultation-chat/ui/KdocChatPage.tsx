'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useKdocCmsContent } from '../model/useKdocCmsContent';
import { useKdocChatFlow } from '../model/useKdocChatFlow';
import { useKdocRealtimeChat } from '../model/useKdocRealtimeChat';
import { formatTodayLabel } from '../lib/chat-time-utils';
import { KdocChatGnb } from './KdocChatGnb';
import { KdocWelcomeSkeleton, KdocMenuSkeleton } from './KdocChatSkeleton';
import { KdocMainMenu } from './KdocMainMenu';
import { KdocFreeInputPhase } from './KdocFreeInputPhase';
import { KdocServiceFaqMenu } from './KdocServiceFaqMenu';
import { KdocGuestInfoForm, KdocGuestInfoCard } from './KdocGuestInfoForm';
import { KdocAdminMessageBubble, KdocUserMessageBubble } from './KdocMessageBubble';
import { KdocHospitalCarousel, parseHospitalCards } from './KdocHospitalCarousel';
import { KdocConversationHistory } from './KdocConversationHistory';
import { KdocChatInput } from './KdocChatInput';

interface KdocChatPageProps {
  lang: Locale;
  dict: Dictionary;
}

export function KdocChatPage({ lang, dict }: KdocChatPageProps) {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);
  const t = dict.kdocChat;

  const { data: cmsContent, isPending: isCmsLoading } = useKdocCmsContent(lang);

  const {
    phase,
    selectedCategory,
    selectedCategoryLabel,
    freeInputMessage,
    threadId,
    isCreatingThread,
    guestInfo,
    setGuestInfo,
    handleCategorySelect,
    handleFreeInputSubmit,
    handleFaqConsult,
    handleBackToMainMenu,
    handleGuestSubmit,
    handleEditGuestInfo,
    transitionToChat,
  } = useKdocChatFlow(cmsContent ?? null);

  const { messages, isLoading, sendMessage } = useKdocRealtimeChat({ threadId });

  const handleSend = useCallback(
    (text: string) => {
      if (phase === 'free_input') {
        handleFreeInputSubmit(text);
        return;
      }
      if (phase === 'guest_submitted') {
        transitionToChat();
      }
      sendMessage(text);
    },
    [phase, handleFreeInputSubmit, transitionToChat, sendMessage],
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, phase]);

  const hasGuestInfo = !!(guestInfo.name || guestInfo.email || guestInfo.nationality);

  const welcomeText = cmsContent?.welcome ?? (isCmsLoading ? '' : t.welcome);

  const selectedCmsMenu = selectedCategory
    ? cmsContent?.menus.find((m) => m.key === selectedCategory)
    : null;

  // chat phase에서 비회원은 카테고리 메시지를 로컬로 렌더하므로 DB 첫 메시지 중복 제외
  const chatMessages =
    phase === 'chat' && hasGuestInfo && selectedCategoryLabel
      ? messages.filter(
          (m, i) => !(i === 0 && m.senderType === 'USER' && m.content === selectedCategoryLabel),
        )
      : messages;

  const showInput =
    phase === 'chat' ||
    phase === 'guest_submitted' ||
    phase === 'free_input';

  return (
    <>
      <KdocChatGnb
        dict={dict}
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
        {isCmsLoading ? (
          <KdocWelcomeSkeleton />
        ) : (
          welcomeText && <KdocAdminMessageBubble content={welcomeText} createdAt={new Date()} />
        )}

        {/* 메인 메뉴 */}
        {phase === 'main_menu' && (
          isCmsLoading ? (
            <KdocMenuSkeleton />
          ) : (
            <KdocMainMenu dict={dict} cmsMenus={cmsContent?.menus ?? null} onSelect={handleCategorySelect} />
          )
        )}

        {/* free_input 단계: CMS 프롬프트 표시 */}
        {phase === 'free_input' && selectedCategoryLabel && selectedCmsMenu && (
          <KdocFreeInputPhase
            selectedCategoryLabel={selectedCategoryLabel}
            cmsPrompt={selectedCmsMenu.prompt}
          />
        )}

        {/* faq_subtree 단계: FAQ 서비스 안내 메뉴 */}
        {phase === 'faq_subtree' && selectedCategoryLabel && selectedCmsMenu && (
          <KdocServiceFaqMenu
            dict={dict}
            selectedCategoryLabel={selectedCategoryLabel}
            faqItems={selectedCmsMenu.faqItems}
            isSubmitting={isCreatingThread}
            onConsult={handleFaqConsult}
            onMainMenu={handleBackToMainMenu}
          />
        )}

        {/* 비회원 게스트 폼 플로우 */}
        {(phase === 'guest_form' || phase === 'guest_submitted' || (phase === 'chat' && hasGuestInfo)) &&
          selectedCategoryLabel && (
            <>
              <KdocConversationHistory
                categoryLabel={selectedCategoryLabel}
                freeInputMessage={freeInputMessage}
                cmsPrompt={selectedCmsMenu?.prompt}
              />
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
              const parsed = parseHospitalCards(msg.content);
              if (parsed) {
                return (
                  <div key={msg.id} className='flex flex-col gap-2 py-1'>
                    {parsed.text && (
                      <KdocAdminMessageBubble content={parsed.text} createdAt={msg.createdAt} />
                    )}
                    <div className='flex justify-start'>
                      <KdocHospitalCarousel hospitals={parsed.hospitals} lang={lang} dict={dict} />
                    </div>
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

      {showInput && <KdocChatInput dict={dict} onSend={handleSend} />}
    </>
  );
}
