'use client';

import { useState } from 'react';
import { type Dictionary } from 'shared/model/types';
import { type CmsFaqItem } from '../model/useKdocCmsContent';
import { KdocAdminMessageBubble, KdocUserMessageBubble } from './KdocMessageBubble';

interface KdocServiceFaqMenuProps {
  dict: Dictionary;
  selectedCategoryLabel: string;
  faqItems: CmsFaqItem[];
  isSubmitting: boolean;
  onConsult: () => void;
  onMainMenu: () => void;
}

export function KdocServiceFaqMenu({
  dict,
  selectedCategoryLabel,
  faqItems,
  isSubmitting,
  onConsult,
  onMainMenu,
}: KdocServiceFaqMenuProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const t = dict.kdocChat.faq;

  const selectedItem = faqItems.find((item) => item.id === expandedId);

  return (
    <>
      <KdocUserMessageBubble content={selectedCategoryLabel} createdAt={new Date()} />

      {/* FAQ 항목 목록 */}
      <div className='mb-4 flex flex-col items-start gap-2 pl-[38px]'>
        {faqItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setExpandedId(item.id === expandedId ? null : item.id)}
            className='rounded-full border border-[#c0bfff] bg-[#f1eeff] px-4 py-2 text-sm font-medium text-[#7657ff]'
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* 선택된 FAQ 항목 내용 */}
      {selectedItem && (
        <>
          <KdocUserMessageBubble content={selectedItem.title} createdAt={new Date()} />
          <KdocAdminMessageBubble content={selectedItem.content} createdAt={new Date()} />

          {/* 액션 버튼 */}
          <div className='mb-4 flex flex-wrap items-start gap-2 pl-[38px]'>
            {selectedItem.showConsultButton && (
              <button
                onClick={onConsult}
                disabled={isSubmitting}
                className='rounded-full border border-[#c0bfff] bg-[#f1eeff] px-4 py-2 text-sm font-medium text-[#7657ff] disabled:opacity-50'
              >
                {t.consultButton}
              </button>
            )}
            {selectedItem.showMenuButton && (
              <button
                onClick={onMainMenu}
                className='rounded-full border border-[#e5e5e5] bg-white px-4 py-2 text-sm font-medium text-[#737373]'
              >
                {t.mainMenuButton}
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
