'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ChatMessage } from '../api/entities/types';
import { formatMessageTime } from '../lib/chat-utils';
import { analyzeMessageContent } from '../lib/message-content-handler';
import { HospitalPictureMessage } from './HospitalPictureMessage';
import { HospitalEditorMessage } from './HospitalEditorMessage';
import { HospitalTextMessage } from './HospitalTextMessage';

interface HospitalMessageProps {
  message: ChatMessage;
  hospitalName: string;
  hospitalImageUrl?: string;
  showHeader?: boolean;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalMessage({
  message,
  hospitalName,
  hospitalImageUrl,
  showHeader = true,
  lang,
  dict,
}: HospitalMessageProps) {
  const formattedTime = formatMessageTime(message.timestamp);

  // returnUrl을 현재 URL의 경로로 설정 (pathname만)
  const returnUrl = typeof window !== 'undefined' ? window.location.pathname : undefined;

  const contentAnalysis = analyzeMessageContent(message.content);

  if (contentAnalysis.hasOnlyPictures) {
    return (
      <HospitalPictureMessage
        pictures={contentAnalysis.pictures}
        formattedTime={formattedTime}
        hospitalName={hospitalName}
        hospitalImageUrl={hospitalImageUrl}
        showHeader={showHeader}
        dict={dict}
      />
    );
  }

  if (contentAnalysis.hasEditor && contentAnalysis.editorContent) {
    return (
      <HospitalEditorMessage
        editorContent={contentAnalysis.editorContent}
        formattedTime={formattedTime}
        hospitalName={hospitalName}
        hospitalImageUrl={hospitalImageUrl}
        showHeader={showHeader}
      />
    );
  }

  return (
    <HospitalTextMessage
      content={message.content}
      formattedTime={formattedTime}
      hospitalName={hospitalName}
      hospitalImageUrl={hospitalImageUrl}
      showHeader={showHeader}
      lang={lang}
      dict={dict}
      returnUrl={returnUrl}
    />
  );
}
