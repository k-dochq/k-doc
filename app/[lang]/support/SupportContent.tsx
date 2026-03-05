'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { InputFieldV2 } from 'features/consultation-request/ui/InputFieldV2';
import { TextareaFieldV2 } from 'features/consultation-request/ui/TextareaFieldV2';

interface SupportContentProps {
  lang: Locale;
  dict: Dictionary;
}

export function SupportContent({ lang, dict }: SupportContentProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [contentError, setContentError] = useState('');

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    let isValid = true;

    setNameError('');
    setEmailError('');
    setSubjectError('');
    setContentError('');

    if (!name.trim()) {
      setNameError(dict.support?.form?.errors?.name?.required || '이름을 입력해주세요.');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError(dict.support?.form?.errors?.email?.required || '이메일을 입력해주세요.');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError(dict.support?.form?.errors?.email?.invalid || '올바른 이메일 형식이 아닙니다.');
      isValid = false;
    }

    if (!subject.trim()) {
      setSubjectError(dict.support?.form?.errors?.subject?.required || '제목을 입력해주세요.');
      isValid = false;
    }

    if (!content.trim()) {
      setContentError(
        dict.support?.form?.errors?.content?.required || '상담 내용을 입력해주세요.',
      );
      isValid = false;
    } else if (content.trim().length < 10) {
      setContentError(dict.support?.form?.errors?.content?.minLength || '10자 이상 입력해주세요.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    alert(
      dict.support?.form?.successMessage ||
        '문의가 접수되었습니다.\n\n빠른 시일 내에 담당자가\n확인 후 답변드리겠습니다.',
    );

    setName('');
    setEmail('');
    setSubject('');
    setContent('');

    setNameError('');
    setEmailError('');
    setSubjectError('');
    setContentError('');
  };

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2 title={dict.support?.pageTitle || '문의하기'} fallbackUrl={`/${lang}/main`} />
      <div className='h-[58px]' />

      <form onSubmit={handleSubmit} className='px-5 py-8'>
        <div className='space-y-6'>
          <InputFieldV2
            label={dict.support?.form?.name?.label || '이름'}
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={dict.support?.form?.name?.placeholder || '이름을 입력해주세요'}
            error={nameError}
            required
          />

          <InputFieldV2
            label={dict.support?.form?.email?.label || '이메일'}
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dict.support?.form?.email?.placeholder || '이메일을 입력해주세요'}
            error={emailError}
            required
          />

          <InputFieldV2
            label={dict.support?.form?.subject?.label || '제목'}
            type='text'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={dict.support?.form?.subject?.placeholder || '제목을 입력해주세요'}
            error={subjectError}
            required
          />

          <TextareaFieldV2
            label={dict.support?.form?.content?.label || '상담 내용'}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={dict.support?.form?.content?.placeholder || '문의 내용을 입력해주세요'}
            error={contentError}
            rows={8}
            maxLength={500}
            currentLength={content.length}
            required
          />
        </div>

        <button
          type='submit'
          className='mt-8 h-[52px] w-full rounded-xl bg-sub-900 text-base font-semibold text-white transition-opacity hover:opacity-90'
        >
          {dict.support?.form?.submitButton || '제출하기'}
        </button>
      </form>
    </div>
  );
}
