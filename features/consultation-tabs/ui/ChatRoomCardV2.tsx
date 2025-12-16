'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ChatRoom } from '@/app/api/consultation/chat-rooms/route';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { formatDateSimple } from 'shared/lib/date-utils';
import { LocaleLink } from 'shared/ui/locale-link';
import { DEFAULT_IMAGES } from 'shared/config/images';

interface ChatRoomCardV2Props {
  chatRoom: ChatRoom;
  lang: Locale;
  dict: Dictionary;
}

export function ChatRoomCardV2({ chatRoom, lang, dict }: ChatRoomCardV2Props) {
  const hospitalName = getLocalizedTextByLocale(chatRoom.hospitalName, lang);
  const districtName = chatRoom.districtName
    ? getLocalizedTextByLocale(chatRoom.districtName, lang)
    : '';

  return (
    <LocaleLink
      href={`/chat/${chatRoom.hospitalId}`}
      className='flex items-center gap-3 border-b border-neutral-200 py-5'
    >
      {/* 로고 영역 */}
      <div className='relative h-[46px] w-[46px] flex-shrink-0 overflow-hidden rounded-full bg-[#001872]'>
        <img
          src={chatRoom.hospitalLogoUrl || DEFAULT_IMAGES.HOSPITAL_LOGO_DEFAULT}
          alt={hospitalName}
          className='h-full w-full object-cover'
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = DEFAULT_IMAGES.HOSPITAL_LOGO_DEFAULT;
          }}
        />
      </div>

      {/* 정보 영역 */}
      <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
        {/* 병원명과 날짜 */}
        <div className='flex items-center gap-2'>
          <p className='min-w-0 flex-1 text-base leading-6 font-semibold text-[#404040]'>
            {hospitalName}
          </p>
          {chatRoom.lastMessageDate && (
            <p className='shrink-0 text-xs leading-4 text-[#a3a3a3]'>
              {formatDateSimple(chatRoom.lastMessageDate, lang)}
            </p>
          )}
        </div>

        {/* 메시지와 알림 배지 */}
        <div className='flex items-center gap-2'>
          <p className='min-w-0 flex-1 truncate text-sm leading-5 text-[#404040]'>
            {chatRoom.lastMessageContent || '아직 메시지가 없습니다.'}
          </p>
          {chatRoom.unreadCount !== undefined && chatRoom.unreadCount > 0 && (
            <div className='flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#f31110]'>
              <p className='text-[11px] leading-[14px] font-semibold text-white'>
                {chatRoom.unreadCount > 99 ? '99+' : chatRoom.unreadCount}
              </p>
            </div>
          )}
        </div>
      </div>
    </LocaleLink>
  );
}
