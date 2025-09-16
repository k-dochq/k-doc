'use client';

interface ChatRoomEmptyStateProps {
  className?: string;
}

export function ChatRoomEmptyState({ className = '' }: ChatRoomEmptyStateProps) {
  return (
    <div className={`p-4 ${className}`}>
      <div className='py-8 text-center'>
        <div className='mb-4 text-6xl'>💬</div>
        <h2 className='mb-2 text-xl font-semibold text-gray-700'>상담 채팅</h2>
        <p className='text-gray-500'>아직 대화한 병원이 없습니다.</p>
      </div>
    </div>
  );
}
