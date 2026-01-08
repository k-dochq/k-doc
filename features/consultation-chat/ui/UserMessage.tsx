'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ChatMessage } from '../api/entities/types';
import { formatMessageTime } from '../lib/chat-utils';
import { analyzeMessageContent } from '../lib/message-content-handler';
import { UserPictureMessage } from './UserPictureMessage';
import { UserFileMessage } from './UserFileMessage';
import { UserEditorMessage } from './UserEditorMessage';
import { UserTextMessage } from './UserTextMessage';

interface UserMessageProps {
  message: ChatMessage;
  lang: Locale;
  dict: Dictionary;
}

export function UserMessage({ message, lang, dict }: UserMessageProps) {
  const formattedTime = formatMessageTime(message.timestamp);
  const contentAnalysis = analyzeMessageContent(message.content);

  if (contentAnalysis.hasOnlyPictures) {
    return (
      <UserPictureMessage
        pictures={contentAnalysis.pictures}
        formattedTime={formattedTime}
        dict={dict}
      />
    );
  }

  if (contentAnalysis.hasOnlyFiles) {
    return (
      <UserFileMessage files={contentAnalysis.files} formattedTime={formattedTime} dict={dict} />
    );
  }

  if (contentAnalysis.hasEditor && contentAnalysis.editorContent) {
    return (
      <UserEditorMessage
        editorContent={contentAnalysis.editorContent}
        formattedTime={formattedTime}
      />
    );
  }

  return (
    <UserTextMessage
      content={message.content}
      formattedTime={formattedTime}
      lang={lang}
      dict={dict}
    />
  );
}
