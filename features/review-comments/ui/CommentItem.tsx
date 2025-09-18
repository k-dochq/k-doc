'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Comment } from 'entities/comment';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface CommentItemProps {
  comment: Comment;
  lang: Locale;
  dict: Dictionary;
}

export function CommentItem({ comment, lang, dict }: CommentItemProps) {
  const displayName =
    comment.user.displayName || comment.user.nickName || comment.user.name || '익명';
  const commentText = extractLocalizedText(comment.content, lang);

  // 날짜 포맷팅
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return dict.comments?.time?.justNow || '방금 전';
    if (minutes < 60) return `${minutes}${dict.comments?.time?.minutesAgo || '분 전'}`;
    if (hours < 24) return `${hours}${dict.comments?.time?.hoursAgo || '시간 전'}`;
    if (days < 7) return `${days}${dict.comments?.time?.daysAgo || '일 전'}`;

    return date.toLocaleDateString(lang === 'ko' ? 'ko-KR' : lang === 'en' ? 'en-US' : 'th-TH');
  };

  return (
    <div className='flex space-x-3 py-3'>
      {/* 사용자 아바타 */}
      <div className='flex-shrink-0'>
        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-300'>
          <span className='text-sm font-medium text-gray-600'>
            {displayName.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>

      {/* 댓글 내용 */}
      <div className='min-w-0 flex-1'>
        <div className='mb-1 flex items-center space-x-2'>
          <span className='text-sm font-medium text-gray-900'>{displayName}</span>
          <span className='text-xs text-gray-500'>{formatDate(new Date(comment.createdAt))}</span>
        </div>

        <p className='text-sm break-words whitespace-pre-wrap text-gray-700'>{commentText}</p>
      </div>
    </div>
  );
}
