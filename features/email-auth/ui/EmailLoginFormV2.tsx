'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FormButton } from 'shared/ui/form-button';
import { LocaleLink } from 'shared/ui/locale-link';
import { handleLoginSuccess } from 'shared/lib/auth/handle-login-success';
import { useEmailLoginForm } from 'features/email-auth/model/useEmailLoginForm';
import { useEmailLogin } from 'features/email-auth/model/useEmailLogin';
import { InputFieldV2 } from 'features/consultation-request/ui/InputFieldV2';

interface EmailLoginFormV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function EmailLoginFormV2({ lang, dict, redirectTo }: EmailLoginFormV2Props) {
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
      await handleLoginSuccess();
      const targetUrl = redirectTo || `/${lang}/main`;
      window.location.href = targetUrl;
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
      {/* 이메일 */}
      <InputFieldV2
        type='email'
        label={dict.auth?.login?.email || '이메일'}
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder={dict.auth?.login?.placeholders?.email || '이메일을 입력해주세요'}
        error={errors.email}
        disabled={isLoading}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      />

      {/* 비밀번호 + 링크 */}
      <div className='flex flex-col gap-2'>
        <InputFieldV2
          type='password'
          label={dict.auth?.login?.password || '비밀번호'}
          value={formData.password}
          onChange={(e) => updateField('password', e.target.value)}
          placeholder={dict.auth?.login?.placeholders?.password || '비밀번호를 입력해주세요'}
          error={errors.password}
          disabled={isLoading}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />

        <div className='mt-1 flex w-full items-center justify-end'>
          <LocaleLink
            href='/auth/forgot-password'
            className='text-sm leading-5 font-medium text-[#737373]'
          >
            {dict.auth?.login?.forgotPassword || '비밀번호를 잊으셨나요?'}
          </LocaleLink>
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
          <p className='text-sm text-red-600'>{error}</p>
        </div>
      )}

      {/* 로그인 버튼 (sub-900) */}
      <FormButton
        type='submit'
        loading={isLoading}
        disabled={isLoading}
        className='bg-sub-900 hover:bg-sub-900 focus:ring-sub-900'
      >
        {dict.auth?.login?.loginButton || '로그인'}
      </FormButton>
    </form>
  );
}
