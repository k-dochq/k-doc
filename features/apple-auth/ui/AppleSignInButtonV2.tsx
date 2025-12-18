'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { createClient } from 'shared/lib/supabase/client';
import { useState } from 'react';
import { isExpoWebView } from 'shared/lib/webview-detection';
import { sendLoginRequestToExpo, setRedirectPathCookie } from 'shared/lib/expo-communication';

interface AppleSignInButtonV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
  className?: string;
}

function AppleIconV2() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M14.8776 17.9895C13.9317 18.9065 12.8988 18.7617 11.9046 18.3273C10.8525 17.8833 9.88727 17.864 8.77724 18.3273C7.38728 18.9258 6.65369 18.752 5.82358 17.9895C1.11316 13.1343 1.80814 5.74049 7.15562 5.47022C8.45871 5.53779 9.36604 6.1845 10.1286 6.24242C11.2676 6.01076 12.3583 5.34474 13.5745 5.43161C15.032 5.54744 16.1324 6.12659 16.8564 7.16906C13.8448 8.97407 14.5591 12.9412 17.3197 14.0513C16.7695 15.4992 16.0552 16.9374 14.868 17.9991L14.8776 17.9895ZM10.0321 5.4123C9.88727 3.2598 11.6344 1.48374 13.6421 1.31C13.922 3.80034 11.3834 5.65362 10.0321 5.4123Z'
        fill='#525252'
      />
    </svg>
  );
}

export function AppleSignInButtonV2({
  lang,
  dict,
  redirectTo,
  className = '',
}: AppleSignInButtonV2Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('kdoc_recent_login_method', 'apple');
      }

      if (isExpoWebView()) {
        if (redirectTo) {
          setRedirectPathCookie(redirectTo);
        }
        sendLoginRequestToExpo('apple', redirectTo, lang);
        return;
      }

      const supabase = createClient();

      if (redirectTo) {
        document.cookie = `auth_redirect_path=${encodeURIComponent(
          redirectTo,
        )}; path=/; max-age=600; SameSite=Lax`;
      }

      if (!supabase) {
        console.error('Supabase client 생성 실패');
        return;
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Apple 로그인 에러:', error);
        window.alert('An error occurred during Apple login. Please try again.');
      }
    } catch (error) {
      console.error('Apple 로그인 중 예외 발생:', error);
      window.alert('An unexpected error occurred during Apple login. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <button
      type='button'
      onClick={handleAppleLogin}
      disabled={isLoading}
      className={`flex w-full items-center justify-center gap-2 rounded-xl bg-[#b2b2b2] px-5 py-4 text-base leading-6 font-medium text-[#525252] focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {isLoading ? (
        <div className='h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700' />
      ) : (
        <AppleIconV2 />
      )}
      <span>{dict.auth?.login?.appleLogin || 'Apple로 계속하기'}</span>
    </button>
  );
}
