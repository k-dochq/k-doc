'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FormButton } from 'shared/ui/form-button';
import { LocaleLink } from 'shared/ui/locale-link';
import { useEmailLoginForm } from 'features/email-auth/model/useEmailLoginForm';
import { useEmailLogin } from 'features/email-auth/model/useEmailLogin';
import { handleLoginSuccess } from 'shared/lib/auth/handle-login-success';

interface EmailLoginFormProps {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

// 로그인 페이지 전용 Input 컴포넌트 (필수 표시 제거)
interface LoginInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password';
}

function LoginInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  type = 'text',
}: LoginInputProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className='w-full rounded-xl border border-transparent px-4 py-4 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        style={{
          backgroundImage: 'linear-gradient(white, white), linear-gradient(90deg, #FF60F7 0%, #AE33FB 100%)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }}
      />
      {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
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
        <LoginInput
          label={dict.auth?.login?.email || '이메일'}
          value={formData.email}
          onChange={(value) => updateField('email', value)}
          placeholder={dict.auth?.login?.placeholders?.email || 'your-email@example.com'}
          error={errors.email}
          disabled={isLoading}
          type='email'
        />

        {/* 비밀번호 입력 */}
        <LoginInput
          label={dict.auth?.login?.password || '비밀번호'}
          value={formData.password}
          onChange={(value) => updateField('password', value)}
          placeholder={dict.auth?.login?.placeholders?.password || '비밀번호를 입력하세요'}
          error={errors.password}
          disabled={isLoading}
          type='password'
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
