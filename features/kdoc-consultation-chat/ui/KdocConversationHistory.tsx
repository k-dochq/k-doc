import { type FaqSelectedItem } from '../model/useKdocChatFlow';
import { KdocAdminMessageBubble, KdocUserMessageBubble } from './KdocMessageBubble';
import { KdocFaqItemBubbles } from './KdocFaqItemBubbles';

interface KdocConversationHistoryProps {
  categoryLabel?: string | null;
  freeInputMessage: string | null;
  cmsPrompt?: string;
  faqItem?: FaqSelectedItem | null;
}

/**
 * guest_form / guest_submitted / chat(비회원) phase에서
 * 메인 메뉴 선택 이후의 대화 이력을 표시하는 컴포넌트.
 *
 * - free_input 경로: 카테고리 선택 → CMS 프롬프트 → 사용자 자유 입력 메시지
 * - faq_subtree 경로: 카테고리 선택 → FAQ 항목 선택 → FAQ 내용 → 상담 신청하기
 */
export function KdocConversationHistory({
  categoryLabel,
  freeInputMessage,
  cmsPrompt,
  faqItem,
}: KdocConversationHistoryProps) {
  const now = new Date();

  if (faqItem) {
    return (
      <>
        {categoryLabel && <KdocUserMessageBubble content={categoryLabel} createdAt={now} />}
        <KdocUserMessageBubble content={faqItem.title} createdAt={now} />
        <KdocFaqItemBubbles faqItem={faqItem} createdAt={now} />
        <KdocUserMessageBubble content={faqItem.consultLabel} createdAt={now} />
      </>
    );
  }

  if (freeInputMessage) {
    return (
      <>
        {categoryLabel && <KdocUserMessageBubble content={categoryLabel} createdAt={now} />}
        {cmsPrompt && <KdocAdminMessageBubble content={cmsPrompt} createdAt={now} />}
        <KdocUserMessageBubble content={freeInputMessage} createdAt={now} />
      </>
    );
  }

  return categoryLabel ? <KdocUserMessageBubble content={categoryLabel} createdAt={now} /> : null;
}
