'use client';

import { useState, useRef, useEffect } from 'react';
import { useChatImageUpload } from '../model/useChatImageUpload';
import { useChatFileUpload } from '../model/useChatFileUpload';
import { useAuth } from 'shared/lib/auth/useAuth';
import { toast } from 'sonner';
import { type Dictionary } from 'shared/model/types';
import { CameraButton } from './CameraButton';
import { SendButton } from './SendButton';
import { ChatTextArea } from './ChatTextArea';
import { ImageUploadInput } from './ImageUploadInput';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  dict?: Dictionary;
}

export function ChatInput({
  onSendMessage,
  placeholder = '무엇이든 물어보세요!',
  disabled = false,
  dict,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const {
    isUploading: isImageUploading,
    uploadError: imageUploadError,
    uploadImage,
    clearError: clearImageError,
  } = useChatImageUpload(user?.id || '');
  const {
    isUploading: isFileUploading,
    uploadError: fileUploadError,
    uploadFile,
    clearError: clearFileError,
  } = useChatFileUpload(user?.id || '');

  const isUploading = isImageUploading || isFileUploading;

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // 모바일 디바이스 감지: 터치 포인터가 있는 경우
    const isMobileDevice =
      typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

    // 모바일에서는 Enter 키로 줄바꿈만 허용 (전송하지 않음)
    if (isMobileDevice) {
      return; // Enter 키를 눌러도 기본 동작(줄바꿈) 허용
    }

    // 데스크톱에서는 Enter로 전송, Shift+Enter로 줄바꿈
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 타입에 따라 이미지 또는 파일 업로드
    const isImage = file.type.startsWith('image/');

    if (isImage) {
      // 이미지 업로드
      const url = await uploadImage(file);
      if (url) {
        const pictureMessage = `<picture>${url}</picture>`;
        onSendMessage(pictureMessage);
      }
    } else {
      // 파일 업로드
      const fileResult = await uploadFile(file);
      if (fileResult) {
        const fileMessage = `<file>${fileResult.url}|${fileResult.fileName}|${fileResult.fileSize}</file>`;
        onSendMessage(fileMessage);
      }
    }

    // input 초기화
    e.target.value = '';
  };

  // 에러 토스트 표시
  useEffect(() => {
    if (imageUploadError) {
      toast.error(imageUploadError);
      clearImageError();
    }
  }, [imageUploadError, clearImageError]);

  useEffect(() => {
    if (fileUploadError) {
      toast.error(fileUploadError);
      clearFileError();
    }
  }, [fileUploadError, clearFileError]);

  return (
    <div className='relative box-border flex content-stretch items-end justify-between bg-white px-5 pt-4 pb-8'>
      <div className='pointer-events-none absolute inset-0 border-[1px_0px_0px] border-solid border-neutral-200 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.24)]' />

      <div className='flex w-full items-end justify-between gap-2'>
        <CameraButton onClick={handleCameraClick} disabled={disabled} isUploading={isUploading} />

        <ImageUploadInput
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={disabled || isUploading}
        />

        <ChatTextArea
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled || isUploading}
        />

        <SendButton
          onClick={handleSend}
          disabled={!message.trim() || disabled || isUploading}
          hasMessage={!!message.trim()}
        />
      </div>
    </div>
  );
}
