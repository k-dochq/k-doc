'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { createClient } from 'shared/lib/supabase/client';
import { useState } from 'react';
import { isExpoWebView } from 'shared/lib/webview-detection';
import { sendLoginRequestToExpo, setRedirectPathCookie } from 'shared/lib/expo-communication';

interface GoogleSignInButtonV2Props {
  lang: Locale;
  dict: Dictionary;
  className?: string;
  redirectTo?: string;
}

function GoogleIconV2() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'>
      <g clipPath='url(#clip0_1791_5734)'>
        <path
          d='M16.2772 8.48922C16.2772 7.80639 16.2218 7.30811 16.1019 6.79138H8.30469V9.87332H12.8815C12.7892 10.6392 12.2909 11.7927 11.1836 12.5677L11.1681 12.6709L13.6334 14.5808L13.8042 14.5978C15.3729 13.1491 16.2772 11.0175 16.2772 8.48922Z'
          fill='#4285F4'
        />
        <path
          d='M8.30464 16.6094C10.5469 16.6094 12.4293 15.8712 13.8042 14.5978L11.1836 12.5678C10.4823 13.0568 9.54109 13.3982 8.30464 13.3982C6.10852 13.3982 4.24458 11.9496 3.58014 9.9472L3.48275 9.95547L0.919266 11.9394L0.885742 12.0326C2.25139 14.7454 5.05654 16.6094 8.30464 16.6094Z'
          fill='#34A853'
        />
        <path
          d='M3.58022 9.94719C3.4049 9.43046 3.30344 8.87677 3.30344 8.3047C3.30344 7.73256 3.4049 7.17893 3.57099 6.6622L3.56635 6.55215L0.970738 4.53638L0.885814 4.57677C0.322964 5.70253 0 6.96672 0 8.3047C0 9.64267 0.322964 10.9068 0.885814 12.0326L3.58022 9.94719Z'
          fill='#FBBC05'
        />
        <path
          d='M8.30464 3.21113C9.86405 3.21113 10.916 3.88473 11.5158 4.44765L13.8595 2.15922C12.4201 0.821247 10.5469 0 8.30464 0C5.05654 0 2.25139 1.86393 0.885742 4.57678L3.57092 6.66221C4.24458 4.65986 6.10852 3.21113 8.30464 3.21113Z'
          fill='#EB4335'
        />
      </g>
      <defs>
        <clipPath id='clip0_1791_5734'>
          <rect width='16.285' height='16.6667' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

export function GoogleSignInButtonV2({
  lang,
  dict,
  className = '',
  redirectTo,
}: GoogleSignInButtonV2Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('kdoc_recent_login_method', 'google');
      }

      if (isExpoWebView()) {
        if (redirectTo) {
          setRedirectPathCookie(redirectTo);
        }
        sendLoginRequestToExpo('google', redirectTo, lang);
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
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Google 로그인 에러:', error);
        window.alert('An error occurred during Google login. Please try again.');
      }
    } catch (error) {
      console.error('Google 로그인 중 예외 발생:', error);
      window.alert('An unexpected error occurred during Google login. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <button
      type='button'
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className={`focus:ring-primary flex w-full items-center justify-center gap-2 rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] px-5 py-4 text-base leading-6 font-medium text-[#404040] focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {isLoading ? (
        <div className='h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700' />
      ) : (
        <GoogleIconV2 />
      )}
      <span>{dict.auth?.login?.googleLogin || 'Google로 계속하기'}</span>
    </button>
  );
}
