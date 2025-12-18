import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { createClient } from 'shared/lib/supabase/client';
import { isExpoWebView } from 'shared/lib/webview-detection';
import { sendLoginRequestToExpo, setRedirectPathCookie } from 'shared/lib/expo-communication';

interface UseAppleSignInOptions {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function useAppleSignIn({ lang, dict, redirectTo }: UseAppleSignInOptions) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAppleSignIn = async () => {
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

  return { isLoading, handleAppleSignIn };
}
