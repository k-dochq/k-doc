'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FormButton } from 'shared/ui/form-button';
import { LocaleLink } from 'shared/ui/locale-link';
import { useEmailLoginForm } from 'features/email-auth/model/useEmailLoginForm';
import { useEmailLogin } from 'features/email-auth/model/useEmailLogin';
import { handleLoginSuccess } from 'shared/lib/auth/handle-login-success';
import { RequiredInput } from './inputs/RequiredInput';

interface EmailLoginFormProps {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function EmailLoginForm({ lang, dict, redirectTo }: EmailLoginFormProps) {
  const { formData, errors, updateField, validateForm } = useEmailLoginForm({
    lang,
    dict,
  });
  const { loginWithEmail, isLoading, error } = useEmailLogin({ locale: lang, dict });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await loginWithEmail({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      // 로그인 성공 시 RN으로 토큰 전달
      await handleLoginSuccess();

      // 로그인 성공 시 redirectTo가 있으면 해당 페이지로, 없으면 메인 페이지로 이동
      const targetUrl = redirectTo || `/${lang}/main`;
      window.location.href = targetUrl;
    }
  };

  return (
    <div className='flex w-full flex-col gap-5'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        {/* 이메일 입력 */}
        <RequiredInput
          label={dict.auth?.login?.email || '이메일'}
          value={formData.email}
          onChange={(value) => updateField('email', value)}
          placeholder={dict.auth?.login?.placeholders?.email || 'your-email@example.com'}
          error={errors.email}
          disabled={isLoading}
          type='email'
          dict={dict}
        />

        {/* 비밀번호 입력 */}
        <RequiredInput
          label={dict.auth?.login?.password || '비밀번호'}
          value={formData.password}
          onChange={(value) => updateField('password', value)}
          placeholder={dict.auth?.login?.placeholders?.password || '비밀번호를 입력하세요'}
          error={errors.password}
          disabled={isLoading}
          type='password'
          dict={dict}
        />

        {/* 에러 메시지 */}
        {error && (
          <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}

        {/* 로그인 버튼 */}
        <FormButton type='submit' loading={isLoading} disabled={isLoading}>
          {dict.auth?.login?.loginButton || '로그인'}
        </FormButton>
      </form>

      {/* 비밀번호 찾기 링크 */}
      <div className='flex justify-center'>
        <LocaleLink
          href='/auth/forgot-password'
          className='text-sm text-neutral-500 hover:text-neutral-700'
        >
          {dict.auth?.login?.forgotPassword || '비밀번호 찾기'}
        </LocaleLink>
      </div>

      {/* 회원가입 링크 */}
      <div className='flex items-center justify-center gap-4'>
        <span className='text-sm leading-5 text-neutral-500'>
          {dict.auth?.login?.noAccount || '계정이 없으신가요?'}
        </span>
        <div className='flex h-0 w-0 items-center justify-center'>
          <div className='h-0 w-2.5 rotate-90 border-t border-neutral-300' />
        </div>
        <LocaleLink
          href={
            redirectTo
              ? `/auth/signup?redirectTo=${encodeURIComponent(redirectTo)}`
              : '/auth/signup'
          }
          className='text-sm leading-5 text-neutral-500 hover:text-neutral-700'
        >
          {dict.auth?.login?.signupLink || '회원가입하기'}
        </LocaleLink>
      </div>
    </div>
  );
}
