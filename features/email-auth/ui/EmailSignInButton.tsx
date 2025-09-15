'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface EmailSignInButtonProps {
  lang: Locale;
  dict: Dictionary;
  className?: string;
  onClick?: () => void;
}

export function EmailSignInButton({ lang, dict, className = '', onClick }: EmailSignInButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl bg-[#DA47EF] px-6 py-4 transition-all hover:bg-[#C63DE7] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none ${className}`}
    >
      <span className='text-base font-medium text-white'>
        {dict.auth?.login?.emailLogin || '이메일로 로그인'}
      </span>
    </button>
  );
}
