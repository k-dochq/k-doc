'use client';

import { useState } from 'react';
import { type Dictionary } from 'shared/model/types';
import { type CmsFaqItem } from '../model/useKdocCmsContent';
import { type FaqSelectedItem } from '../model/useKdocChatFlow';
import { KdocAdminMessageBubble, KdocUserMessageBubble } from './KdocMessageBubble';

interface KdocServiceFaqMenuProps {
  dict: Dictionary;
  selectedCategoryLabel: string;
  faqItems: CmsFaqItem[];
  isSubmitting: boolean;
  onConsult: (item: FaqSelectedItem) => void;
  onMainMenu: (context: { faqItem: FaqSelectedItem | null; returnLabel: string }) => void;
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
          <KdocAdminMessageBubble content={selectedItem.content} createdAt={new Date()}>
            {(selectedItem.showConsultButton || selectedItem.showMenuButton) && (
              <div className='flex flex-col gap-2 pb-1'>
                {selectedItem.showConsultButton && (
                  <button
                    onClick={() => onConsult({
                      title: selectedItem.title,
                      content: selectedItem.content,
                      consultLabel: t.consultButton,
                      mainMenuLabel: t.mainMenuButton,
                      showConsultButton: selectedItem.showConsultButton,
                      showMenuButton: selectedItem.showMenuButton,
                    })}
                    disabled={isSubmitting}
                    className='w-full rounded-lg bg-[#7657ff] px-5 py-3 text-sm font-medium leading-5 text-white disabled:opacity-50'
                  >
                    {t.consultButton}
                  </button>
                )}
                {selectedItem.showMenuButton && (
                  <button
                    onClick={() => onMainMenu({
                      faqItem: {
                        title: selectedItem.title,
                        content: selectedItem.content,
                        consultLabel: t.consultButton,
                        mainMenuLabel: t.mainMenuButton,
                        showConsultButton: selectedItem.showConsultButton,
                        showMenuButton: selectedItem.showMenuButton,
                      },
                      returnLabel: t.mainMenuButton,
                    })}
                    className='w-full rounded-lg border border-[#7657ff] bg-white px-5 py-3 text-sm font-medium leading-5 text-[#7657ff]'
                  >
                    {t.mainMenuButton}
                  </button>
                )}
              </div>
            )}
          </KdocAdminMessageBubble>
        </>
      )}
    </>
  );
}
