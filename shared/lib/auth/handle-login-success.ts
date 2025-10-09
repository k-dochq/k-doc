'use client';

import { createClient } from '@/shared/lib/supabase/client';
import type { LoginSuccessMessage } from 'shared/types/webview-message';

/**
 * 로그인 성공 후 공통 처리 로직
 * React Native WebView로 세션 토큰을 전달합니다.
 */
export async function handleLoginSuccess() {
  try {
    const supabase = createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('세션 조회 실패:', error.message);
      return;
    }

    if (session) {
      console.log('로그인 성공 - 세션 토큰을 RN으로 전달합니다');

      // RN WebView로 토큰 전달
      if (window.ReactNativeWebView) {
        const message: LoginSuccessMessage = {
          type: 'LOGIN_SUCCESS',
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          user: {
            id: session.user.id,
            email: session.user.email,
            display_name: session.user.user_metadata?.display_name,
          },
        };

        window.ReactNativeWebView.postMessage(JSON.stringify(message));
        console.log('✅ RN으로 세션 토큰 전달 완료');
      } else {
        console.log('⚠️ React Native WebView 환경이 아닙니다');
      }
    } else {
      console.warn('세션이 없습니다');
    }
  } catch (error) {
    console.error('로그인 성공 처리 중 오류:', error);
  }
}
