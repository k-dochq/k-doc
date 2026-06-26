import { type FaqSelectedItem } from '../model/useKdocChatFlow';
import { KdocAdminMessageBubble } from './KdocMessageBubble';

interface KdocFaqItemBubblesProps {
  faqItem: FaqSelectedItem;
  createdAt: Date;
}

/**
 * FAQ 항목 선택 후 보여지는 어드민 버블(내용 + 버튼들).
 * guest_form 이력 및 메인 메뉴 복귀 이력에서 공통으로 사용.
 * 버튼은 항상 비활성화(disabled) 상태로 렌더링.
 */
export function KdocFaqItemBubbles({ faqItem, createdAt }: KdocFaqItemBubblesProps) {
  return (
    <KdocAdminMessageBubble content={faqItem.content} createdAt={createdAt}>
      {(faqItem.showConsultButton || faqItem.showMenuButton) && (
        <div className='flex flex-col gap-2 pb-1'>
          {faqItem.showConsultButton && (
            <button
              disabled
              className='w-full rounded-lg bg-[#7657ff] px-5 py-3 text-sm font-medium leading-5 text-white opacity-50'
            >
              {faqItem.consultLabel}
            </button>
          )}
          {faqItem.showMenuButton && (
            <button
              disabled
              className='w-full rounded-lg border border-[#7657ff] bg-white px-5 py-3 text-sm font-medium leading-5 text-[#7657ff] opacity-50'
            >
              {faqItem.mainMenuLabel}
            </button>
          )}
        </div>
      )}
    </KdocAdminMessageBubble>
  );
}
