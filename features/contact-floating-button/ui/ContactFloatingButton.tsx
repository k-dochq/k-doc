'use client';

import { useState } from 'react';
import { ContactKIcon } from 'shared/ui/icons/ContactKIcon';
import { ContactCloseIcon } from 'shared/ui/icons/ContactCloseIcon';
import { ContactLineIcon } from 'shared/ui/icons/ContactLineIcon';
import { ContactWhatsAppIcon } from 'shared/ui/icons/ContactWhatsAppIcon';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';

export function ContactFloatingButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleMainButtonClick = () => {
    if (isExpanded) {
      setIsClosing(true);
      setIsExpanded(false);
      // opacity transition이 끝난 후 translate-y를 초기화
      setTimeout(() => {
        setIsClosing(false);
      }, 300);
    } else {
      setIsExpanded(true);
      setIsClosing(false);
    }
  };

  const handleOverlayClick = () => {
    setIsClosing(true);
    setIsExpanded(false);
    setTimeout(() => {
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      {/* 배경 오버레이 */}
      {isExpanded && (
        <div
          className='fixed inset-0 z-400 bg-black/50 transition-opacity duration-300'
          onClick={handleOverlayClick}
          aria-hidden='true'
        />
      )}

      <div
        className={`fixed bottom-[108px] left-1/2 z-500 -translate-x-1/2 ${MAX_MOBILE_WIDTH_CLASS} w-full`}
      >
        <div className='relative right-5 flex flex-col items-end gap-2.5'>
          {/* LINE 버튼 */}
          <a
            href='https://lin.ee/w6gN1s9'
            target='_blank'
            rel='noopener noreferrer'
            className={`flex items-center gap-2 will-change-[transform,opacity] ${
              isExpanded
                ? 'pointer-events-auto translate-y-0 opacity-100 transition-[transform,opacity] duration-300 ease-out'
                : isClosing
                  ? 'pointer-events-none translate-y-0 opacity-0 transition-opacity duration-300 ease-out'
                  : 'pointer-events-none translate-y-4 opacity-0'
            }`}
            style={{
              ...(isExpanded
                ? {
                    transitionDelay: '0.1s',
                  }
                : isClosing
                  ? {
                      transitionDelay: '0s',
                    }
                  : {}),
            }}
            aria-label='LINE으로 문의하기'
          >
            <span className='text-sm font-semibold text-white'>Line</span>
            <ContactLineIcon />
          </a>

          {/* WhatsApp 버튼 */}
          <a
            href='https://wa.me/message/LDW7RK4NR5L3H1'
            target='_blank'
            rel='noopener noreferrer'
            className={`flex items-center gap-2 will-change-[transform,opacity] ${
              isExpanded
                ? 'pointer-events-auto translate-y-0 opacity-100 transition-[transform,opacity] duration-300 ease-out'
                : isClosing
                  ? 'pointer-events-none translate-y-0 opacity-0 transition-opacity duration-300 ease-out'
                  : 'pointer-events-none translate-y-4 opacity-0'
            }`}
            style={{
              ...(isExpanded
                ? {
                    transitionDelay: '0.05s',
                  }
                : isClosing
                  ? {
                      transitionDelay: '0.15s',
                    }
                  : {}),
            }}
            aria-label='WhatsApp으로 문의하기'
          >
            <span className='text-sm font-semibold text-white'>WhatsApp</span>
            <ContactWhatsAppIcon />
          </a>

          {/* 메인 버튼 (K 또는 Close) */}
          <button
            onClick={handleMainButtonClick}
            className='relative transition-transform duration-200 hover:scale-105 active:scale-95'
            aria-label={isExpanded ? '연락처 메뉴 닫기' : '연락처 메뉴 열기'}
          >
            <div className='relative'>
              <div
                className={`transition-all duration-300 ease-out ${
                  isExpanded ? 'pointer-events-none scale-90 opacity-0' : 'scale-100 opacity-100'
                }`}
              >
                <ContactKIcon />
              </div>
              <div
                className={`absolute inset-0 transition-all duration-300 ease-out ${
                  isExpanded ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'
                }`}
              >
                <ContactCloseIcon />
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
