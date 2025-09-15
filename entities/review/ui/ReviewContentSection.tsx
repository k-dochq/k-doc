'use client';

import { useState, useRef, useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ReviewContentSectionProps {
  content: string;
  lang: Locale;
  dict: Dictionary;
  className?: string;
  enableExpand?: boolean; // 더보기/접기 기능 활성화 여부 (기본값: true)
}

export function ReviewContentSection({
  content,
  lang,
  dict,
  className = '',
  enableExpand = true,
}: ReviewContentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && enableExpand) {
      // scrollHeight가 clientHeight보다 크면 텍스트가 잘렸다는 의미
      setShouldShowMore(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [content, enableExpand]);

  return (
    <div className={`${className}`}>
      <div
        ref={textRef}
        className={`text-sm leading-relaxed whitespace-pre-wrap text-neutral-900 ${
          enableExpand && !isExpanded ? 'line-clamp-3' : ''
        }`}
      >
        {content}
      </div>

      {enableExpand && shouldShowMore && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className='mt-2 text-xs font-medium text-neutral-400 transition-colors hover:text-neutral-500'
        >
          {isExpanded ? dict.review.showLess : dict.review.showMore}
        </button>
      )}
    </div>
  );
}
