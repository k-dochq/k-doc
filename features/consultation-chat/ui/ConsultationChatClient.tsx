'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useAuth } from 'shared/lib/auth/useAuth';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { useRealtimeChat } from '../model/useRealtimeChat';
import { createDisplayName } from '../lib/chat-utils';
import { useHospitalDetail } from 'entities/hospital';
import { ConsultationChatLoading } from './ConsultationChatLoading';
import { ConsultationChatUnauthorized } from './ConsultationChatUnauthorized';
import { ConsultationChatError } from './ConsultationChatError';
import { ConsultationChatMain } from './ConsultationChatMain';

interface ConsultationChatClientProps {
  lang: Locale;
  hospitalId: string;
  dict: Dictionary;
}

export function ConsultationChatClient({ lang, hospitalId, dict }: ConsultationChatClientProps) {
  const { user, isLoading: authLoading } = useAuth();

  // TanStack Query를 사용한 병원 정보 조회
  const {
    data: hospitalData,
    isLoading: hospitalLoading,
    error: hospitalError,
  } = useHospitalDetail(hospitalId);

  // 채팅 훅 설정
  const userName = user
    ? createDisplayName(user.user_metadata?.name || user.user_metadata?.full_name, user.email)
    : '';

  const {
    messages,
    isConnected,
    isLoadingHistory,
    error: chatError,
    sendMessage,
    sendTyping,
  } = useRealtimeChat({
    hospitalId,
    userId: user?.id || '',
    userName,
  });

  // 로딩 상태
  if (authLoading || hospitalLoading) {
    return <ConsultationChatLoading lang={lang} dict={dict} />;
  }

  // 인증되지 않은 사용자
  if (!user) {
    return <ConsultationChatUnauthorized lang={lang} dict={dict} />;
  }

  // 에러 상태
  if (hospitalError || chatError) {
    const errorMessage = hospitalError?.message || chatError || '알 수 없는 오류가 발생했습니다.';
    return <ConsultationChatError lang={lang} dict={dict} error={errorMessage} />;
  }

  // 메인 채팅 UI
  const hospital = hospitalData?.hospital;
  const hospitalName = hospital ? extractLocalizedText(hospital.name, lang) : '병원';
  const hospitalImageUrl = hospital?.mainImageUrl || undefined;

  return (
    <ConsultationChatMain
      lang={lang}
      dict={dict}
      hospitalName={hospitalName}
      hospitalImageUrl={hospitalImageUrl}
      messages={messages}
      isLoadingHistory={isLoadingHistory}
      isConnected={isConnected}
      onSendMessage={sendMessage}
    />
  );
}
