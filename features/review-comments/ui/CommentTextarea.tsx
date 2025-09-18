'use client';

import { type Dictionary } from 'shared/model/types';

interface CommentTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isAuthenticated: boolean;
  authLoading: boolean;
  dict: Dictionary;
  rows?: number;
}

export function CommentTextarea({
  value,
  onChange,
  placeholder,
  disabled = false,
  isAuthenticated,
  authLoading,
  dict,
  rows = 3,
}: CommentTextareaProps) {
  const isDisabled = disabled || !isAuthenticated || authLoading;

  const getPlaceholder = () => {
    if (placeholder) return placeholder;

    return !isAuthenticated
      ? dict.comments?.form?.loginRequired || '로그인이 필요합니다'
      : dict.comments?.form?.placeholder || '댓글을 입력하세요...';
  };

  const getClassName = () => {
    const baseClasses = 'w-full resize-none rounded-lg border px-3 py-2 focus:outline-none';

    if (isDisabled) {
      return `${baseClasses} cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400`;
    }

    return `${baseClasses} border-gray-300 focus:border-transparent focus:ring-2 focus:ring-blue-500`;
  };

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={getPlaceholder()}
      className={getClassName()}
      rows={rows}
      disabled={isDisabled}
    />
  );
}
