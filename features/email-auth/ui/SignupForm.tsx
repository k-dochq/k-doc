'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FormInput } from 'shared/ui/form-input';
import { FormButton } from 'shared/ui/form-button';
import { LocaleLink } from 'shared/ui/locale-link';
import { useSignupForm } from '../model/useSignupForm';
import { useEmailSignup } from '../model/useEmailSignup';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface SignupFormProps {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function SignupForm({ lang, dict, redirectTo }: SignupFormProps) {
  const router = useLocalizedRouter();
  const { formData, errors, updateField, validateForm, isFormValid } = useSignupForm({
    lang,
    dict,
  });
  const { signUpWithEmail, isLoading, error } = useEmailSignup({ locale: lang, dict });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await signUpWithEmail(formData.email, formData.password);

    if (result.success) {
      // 회원가입 성공 시 redirectTo가 있으면 해당 페이지로, 없으면 메인 페이지로 이동
      const targetUrl = redirectTo || '/main';
      router.push(targetUrl);
    }
  };

  return (
    <div className='flex w-full flex-col gap-5'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        {/* 이메일 입력 */}
        <FormInput
          label={dict.auth?.signup?.email || '이메일'}
          type='email'
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder='your-email@example.com'
          error={errors.email}
          disabled={isLoading}
          required
        />

        {/* 비밀번호 입력 */}
        <FormInput
          label={dict.auth?.signup?.password || '비밀번호'}
          type='password'
          value={formData.password}
          onChange={(e) => updateField('password', e.target.value)}
          placeholder={
            lang === 'en'
              ? '6+ characters'
              : lang === 'th'
                ? '6 ตัวอักษรขึ้นไป'
                : '6자 이상의 비밀번호'
          }
          error={errors.password}
          disabled={isLoading}
          minLength={6}
          required
        />

        {/* 비밀번호 확인 입력 */}
        <FormInput
          label={dict.auth?.signup?.confirmPassword || '비밀번호 확인'}
          type='password'
          value={formData.confirmPassword}
          onChange={(e) => updateField('confirmPassword', e.target.value)}
          placeholder={
            lang === 'en'
              ? 'Confirm your password'
              : lang === 'th'
                ? 'ยืนยันรหัสผ่านของคุณ'
                : '비밀번호를 다시 입력하세요'
          }
          error={errors.confirmPassword}
          disabled={isLoading}
          minLength={6}
          required
        />

        {/* 에러 메시지 */}
        {error && (
          <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}

        {/* 회원가입 버튼 */}
        <FormButton type='submit' loading={isLoading} disabled={!isFormValid || isLoading}>
          {dict.auth?.signup?.signupButton || '회원가입'}
        </FormButton>
      </form>

      {/* 로그인 링크 */}
      <div className='flex items-center justify-center gap-4'>
        <span className='text-sm leading-5 text-neutral-500'>
          {dict.auth?.signup?.alreadyHaveAccount || '이미 회원이신가요?'}
        </span>
        <div className='flex h-0 w-0 items-center justify-center'>
          <div className='h-0 w-2.5 rotate-90 border-t border-neutral-300' />
        </div>
        <LocaleLink
          href='/auth/login'
          className='text-sm leading-5 text-neutral-500 hover:text-neutral-700'
        >
          {dict.auth?.signup?.loginLink || '로그인하기'}
        </LocaleLink>
      </div>
    </div>
  );
}
