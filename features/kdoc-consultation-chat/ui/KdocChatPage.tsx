'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useKdocCmsContent } from '../model/useKdocCmsContent';
import { useKdocChatPage } from '../model/useKdocChatPage';
import { formatTodayLabel } from '../lib/chat-time-utils';
import { KdocChatGnb } from './KdocChatGnb';
import { KdocWelcomeSkeleton, KdocMenuSkeleton } from './KdocChatSkeleton';
import { KdocMainMenu } from './KdocMainMenu';
import { KdocFreeInputPhase } from './KdocFreeInputPhase';
import { KdocServiceFaqMenu } from './KdocServiceFaqMenu';
import { KdocGuestInfoForm, KdocGuestInfoCard } from './KdocGuestInfoForm';
import { KdocAdminMessageBubble } from './KdocMessageBubble';
import { KdocConversationHistory } from './KdocConversationHistory';
import { KdocFaqItemBubbles } from './KdocFaqItemBubbles';
import { KdocUserMessageBubble } from './KdocMessageBubble';
import { KdocChatInput } from './KdocChatInput';
import { KdocDbMessageList } from './KdocDbMessageList';

interface KdocChatPageProps {
  lang: Locale;
  dict: Dictionary;
  initialThreadId?: string | null;
}

export function KdocChatPage({ lang, dict, initialThreadId = null }: KdocChatPageProps) {
  const { data: cmsContent, isPending: isCmsLoading } = useKdocCmsContent(lang);

  const {
    bottomRef,
    t,
    chatFlow,
    messages,
    isMessagesLoading,
    hasGuestInfo,
    welcomeText,
    selectedCmsMenu,
    showInput,
    handleBack,
    handleSend,
    handleMenu,
  } = useKdocChatPage({ lang, dict, cmsContent: cmsContent ?? null, isCmsLoading, initialThreadId });

  const {
    phase,
    selectedCategoryLabel,
    freeInputMessage,
    faqSelectedItem,
    mainMenuHistory,
    isCreatingThread,
    guestInfo,
    setGuestInfo,
    handleCategorySelect,
    handleFaqConsult,
    handleReturnToMainMenu,
    handleGuestSubmit,
    handleEditGuestInfo,
  } = chatFlow;

  return (
    <>
      <KdocChatGnb dict={dict} lang={lang} onBack={handleBack} onMenu={handleMenu} />

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

        {/* 메인 메뉴 복귀 이력: 이전 FAQ 대화 + "메인 메뉴로" 사용자 메시지 + 두 번째 웰컴 */}
        {mainMenuHistory && !isCmsLoading && (
          <>
            <KdocUserMessageBubble content={mainMenuHistory.categoryLabel} createdAt={new Date()} />
            <KdocUserMessageBubble content={mainMenuHistory.faqItem.title} createdAt={new Date()} />
            <KdocFaqItemBubbles faqItem={mainMenuHistory.faqItem} createdAt={new Date()} />
            <KdocUserMessageBubble content={mainMenuHistory.returnLabel} createdAt={new Date()} />
            {welcomeText && <KdocAdminMessageBubble content={welcomeText} createdAt={new Date()} />}
          </>
        )}

        {/* 메인 메뉴 */}
        {phase === 'main_menu' && (
          isCmsLoading ? (
            <KdocMenuSkeleton />
          ) : (
            <KdocMainMenu dict={dict} cmsMenus={cmsContent?.menus ?? null} onSelect={handleCategorySelect} />
          )
        )}

        {/* free_input 단계: CMS 프롬프트 */}
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
            onMainMenu={handleReturnToMainMenu}
          />
        )}

        {/* guest_form 단계: 로컬 대화 이력 + 정보 입력 폼 */}
        {phase === 'guest_form' && (
          <>
            {(selectedCategoryLabel || freeInputMessage || faqSelectedItem) && (
              <KdocConversationHistory
                categoryLabel={selectedCategoryLabel}
                freeInputMessage={freeInputMessage}
                cmsPrompt={selectedCmsMenu?.prompt}
                faqItem={faqSelectedItem}
              />
            )}
            <KdocAdminMessageBubble content={t.guestForm.infoMessage} createdAt={new Date()} />
            <KdocGuestInfoForm
              dict={dict}
              guestInfo={guestInfo}
              isSubmitting={isCreatingThread}
              onChangeInfo={setGuestInfo}
              onSubmit={handleGuestSubmit}
            />
          </>
        )}

        {/* guest_submitted / chat — DB 단일 소스 렌더링 */}
        {(phase === 'guest_submitted' || phase === 'chat') && (
          <>
            {isMessagesLoading && (
              <p className='py-4 text-center text-xs text-[#a3a3a3]'>{t.loading}</p>
            )}
            <KdocDbMessageList
              messages={messages}
              hasGuestInfo={hasGuestInfo}
              guestInfo={guestInfo}
              infoMessage={t.guestForm.infoMessage}
              lang={lang}
              dict={dict}
              onEditGuestInfo={handleEditGuestInfo}
            />
          </>
        )}

        <div ref={bottomRef} />
      </div>

      {showInput && <KdocChatInput dict={dict} onSend={handleSend} />}
    </>
  );
}
