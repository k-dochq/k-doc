import { KdocAdminMessageBubble, KdocUserMessageBubble } from './KdocMessageBubble';

interface KdocConversationHistoryProps {
  categoryLabel: string;
  freeInputMessage: string | null;
  cmsPrompt?: string;
}

/**
 * guest_form / guest_submitted / chat(비회원) phase에서
 * 메인 메뉴 선택 이후의 대화 이력을 표시하는 컴포넌트.
 *
 * - free_input 경로: 카테고리 선택 → CMS 프롬프트 → 사용자 자유 입력 메시지
 * - faq_subtree 경로: 카테고리 선택만
 */
export function KdocConversationHistory({
  categoryLabel,
  freeInputMessage,
  cmsPrompt,
}: KdocConversationHistoryProps) {
  const now = new Date();

  if (freeInputMessage) {
    return (
      <>
        <KdocUserMessageBubble content={categoryLabel} createdAt={now} />
        {cmsPrompt && <KdocAdminMessageBubble content={cmsPrompt} createdAt={now} />}
        <KdocUserMessageBubble content={freeInputMessage} createdAt={now} />
      </>
    );
  }

  return <KdocUserMessageBubble content={categoryLabel} createdAt={now} />;
}
