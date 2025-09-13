'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Wifi, WifiOff } from 'lucide-react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Prisma } from '@prisma/client';
import { LocaleLink } from 'shared/ui/locale-link';
import { useConsultationChat } from '../model/useConsultationChat';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { useAuth } from 'shared/lib/auth';

// Prisma 타입 활용
type Hospital = Prisma.HospitalGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

interface ConsultationChatProps {
  hospitalId: string;
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationChat({ hospitalId, hospital, lang, dict }: ConsultationChatProps) {
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 사용자 인증 정보 가져오기
  const { user, isLoading: authLoading } = useAuth();
  const userId = user?.id;

  const { messages, isLoading, isConnected, error, sendMessage, isSending } = useConsultationChat({
    hospitalId,
    userId,
  });

  const hospitalName = extractLocalizedText(hospital.name, lang) || '병원';

  // 메시지 전송
  const handleSendMessage = async () => {
    if (!messageInput.trim() || isSending) return;

    const content = messageInput.trim();
    setMessageInput('');

    sendMessage(content);
  };

  // Enter 키로 메시지 전송
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 새 메시지가 올 때마다 스크롤을 맨 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 인증 로딩 중
  if (authLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent'></div>
          <p className='text-gray-600'>인증 확인 중...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent'></div>
          <p className='text-gray-600'>채팅을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-screen flex-col bg-gray-50'>
      {/* 헤더 - 상단 고정 */}
      <div className='flex flex-shrink-0 items-center justify-between border-b bg-white px-4 py-3 shadow-sm'>
        <div className='flex items-center space-x-3'>
          <LocaleLink
            href={`/hospital/${hospitalId}`}
            locale={lang}
            className='flex items-center justify-center rounded-full p-2 hover:bg-gray-100'
          >
            <ArrowLeft className='h-5 w-5' />
          </LocaleLink>
          <div>
            <h1 className='font-semibold text-gray-900'>{hospitalName}</h1>
            <div className='flex items-center space-x-1 text-sm text-gray-500'>
              {isConnected ? (
                <>
                  <Wifi className='h-3 w-3 text-green-500' />
                  <span>온라인</span>
                </>
              ) : (
                <>
                  <WifiOff className='h-3 w-3 text-red-500' />
                  <span>연결 중...</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 에러 메시지 - 헤더 아래 고정 */}
      {error && (
        <div className='flex-shrink-0 bg-red-50 px-4 py-2 text-sm text-red-600'>{error}</div>
      )}

      {/* 메시지 목록 - 스크롤 가능한 영역 */}
      <div className='flex-1 overflow-y-auto'>
        <div className='px-4 py-4'>
          <div className='space-y-4'>
            {Array.isArray(messages) &&
              messages.map((message: any) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderType === 'USER' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                      message.senderType === 'USER'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 shadow-sm'
                    }`}
                  >
                    <p className='text-sm'>{message.content}</p>
                    <p
                      className={`mt-1 text-xs ${
                        message.senderType === 'USER' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {new Date(message.createdAt).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

            {/* 메시지가 없을 때 */}
            {Array.isArray(messages) && messages.length === 0 && (
              <div className='flex items-center justify-center py-8'>
                <div className='text-center text-gray-500'>
                  <p>아직 메시지가 없습니다.</p>
                  <p className='text-sm'>첫 메시지를 보내보세요!</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* 메시지 입력 - 하단 고정 */}
      <div className='flex-shrink-0 border-t bg-white px-4 py-3'>
        <div className='flex items-end space-x-2'>
          <div className='flex-1'>
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='메시지를 입력하세요...'
              className='w-full resize-none rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
              rows={1}
              style={{
                minHeight: '40px',
                maxHeight: '120px',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
              }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim() || isSending}
            className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300'
          >
            <Send className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
