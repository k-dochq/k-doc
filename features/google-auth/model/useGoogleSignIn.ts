import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { createClient } from 'shared/lib/supabase/client';
import { isExpoWebView } from 'shared/lib/webview-detection';
import { sendLoginRequestToExpo, setRedirectPathCookie } from 'shared/lib/expo-communication';

interface UseGoogleSignInOptions {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function useGoogleSignIn({ lang, dict, redirectTo }: UseGoogleSignInOptions) {
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

  return { isLoading, handleGoogleSignIn };
}
