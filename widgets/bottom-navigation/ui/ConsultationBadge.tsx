'use client';

import { useAuth } from 'shared/lib/auth/useAuth';
import { useChatRooms } from 'lib/queries/consultation-chat-rooms';

export function ConsultationBadge() {
  const { isAuthenticated } = useAuth();
  const { data: chatRooms } = useChatRooms({ enabled: isAuthenticated });
  const totalUnreadCount = chatRooms?.reduce((sum, room) => sum + (room.unreadCount ?? 0), 0) ?? 0;

  if (!isAuthenticated || totalUnreadCount === 0) return null;

  return (
    <div className='absolute top-[-5px] right-[-11px] flex h-4 w-4 items-center justify-center rounded-full bg-[#f31110]'>
      <span className='text-[9px] font-semibold leading-none text-white'>
        {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
      </span>
    </div>
  );
}
