'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { AppleIcon } from 'shared/ui/icons';
import { createClient } from 'shared/lib/supabase/client';
import { useState } from 'react';
import { isExpoWebView } from 'shared/lib/webview-detection';
import { sendLoginRequestToExpo, setRedirectPathCookie } from 'shared/lib/expo-communication';

interface AppleSignInButtonProps {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
  className?: string;
}

export function AppleSignInButton({
  lang,
  dict,
  redirectTo,
  className = '',
}: AppleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      // 웹뷰 환경인지 확인
      if (isExpoWebView()) {
        // 웹뷰 환경에서는 Expo 앱으로 로그인 요청 전달
        if (redirectTo) {
          setRedirectPathCookie(redirectTo);
        }
        sendLoginRequestToExpo('apple', redirectTo, lang);
        return;
      }

      // 일반 브라우저 환경에서는 기존 Supabase OAuth 진행
      const supabase = createClient();

      // redirectTo 정보를 쿠키에 저장
      // (쿼리 파라미터로 전달하면 Supabase Redirect URLs와 매칭이 안되므로)
      if (redirectTo) {
        document.cookie = `auth_redirect_path=${encodeURIComponent(redirectTo)}; path=/; max-age=600; SameSite=Lax`;
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
      onClick={handleAppleLogin}
      disabled={isLoading}
      className={`flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-4 transition-all hover:bg-neutral-50 focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {isLoading ? (
        <div className='h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700' />
      ) : (
        <AppleIcon />
      )}
      <span className='text-base font-medium text-neutral-700'>
        {dict.auth?.login?.appleLogin || 'Apple로 로그인'}
      </span>
    </button>
  );
}
