'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { GoogleIcon } from 'shared/ui/icons';
import { createClient } from 'shared/lib/supabase/client';
import { isExpoWebView } from 'shared/lib/webview-detection';
import { sendLoginRequestToExpo, setRedirectPathCookie } from 'shared/lib/expo-communication';

interface GoogleSignInButtonProps {
  lang: Locale;
  dict: Dictionary;
  className?: string;
  redirectTo?: string;
}

export function GoogleSignInButton({
  lang,
  dict,
  className = '',
  redirectTo,
}: GoogleSignInButtonProps) {
  const handleGoogleSignIn = async () => {
    try {
      // 웹뷰 환경인지 확인
      if (isExpoWebView()) {
        // 웹뷰 환경에서는 Expo 앱으로 로그인 요청 전달
        if (redirectTo) {
          setRedirectPathCookie(redirectTo);
        }
        sendLoginRequestToExpo('google', redirectTo, lang);
        return;
      }

      // 일반 브라우저 환경에서는 기존 Supabase OAuth 진행
      const supabase = createClient();

      // redirectTo 정보를 쿠키에 저장
      // OAuth state 파라미터는 Google -> Supabase 간에만 전달되고
      // 최종 callback URL로는 전달되지 않으므로 쿠키 사용
      if (redirectTo) {
        document.cookie = `auth_redirect_path=${encodeURIComponent(redirectTo)}; path=/; max-age=600; SameSite=Lax`;
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
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className={`flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-4 text-center transition-all hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${className}`}
    >
      <GoogleIcon className='h-5 w-5' />
      <span className='text-base font-medium text-gray-700'>
        {dict.auth?.login?.googleLogin || 'Google로 시작'}
      </span>
    </button>
  );
}
