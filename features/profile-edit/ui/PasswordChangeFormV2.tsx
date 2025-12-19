'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { InputFieldV2 } from 'features/consultation-request/ui/InputFieldV2';
import { createClient } from 'shared/lib/supabase/client';
import { useUserProfile } from 'features/user-profile';

interface PasswordChangeFormV2Props {
  lang: Locale;
  dict: Dictionary;
  formId?: string;
  onFormValidChange?: (isValid: boolean) => void;
  onSubmit?: () => void;
}

interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordChangeFormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export function PasswordChangeFormV2({
  lang,
  dict,
  formId,
  onFormValidChange,
  onSubmit,
}: PasswordChangeFormV2Props) {
  const router = useRouter();
  const { data: user } = useUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<PasswordChangeFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<PasswordChangeFormErrors>({});

  const updateField = <K extends keyof PasswordChangeFormData>(
    field: K,
    value: PasswordChangeFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError(null);
    }
    // Check form validity
    checkFormValidity({ ...formData, [field]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: PasswordChangeFormErrors = {};

    // 기존 비밀번호 검증
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword =
        dict.my?.profile?.passwordChange?.errors?.currentPasswordRequired ||
        '기존 비밀번호를 입력해주세요.';
    }

    // 새 비밀번호 검증
    if (!formData.newPassword) {
      newErrors.newPassword =
        dict.my?.profile?.passwordChange?.errors?.newPasswordRequired ||
        '변경할 비밀번호를 입력해주세요.';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword =
        dict.my?.profile?.passwordChange?.errors?.newPasswordTooShort ||
        '비밀번호는 최소 6자 이상이어야 합니다.';
    }

    // 비밀번호 확인 검증
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        dict.my?.profile?.passwordChange?.errors?.confirmPasswordRequired ||
        '비밀번호 확인을 입력해주세요.';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword =
        dict.my?.profile?.passwordChange?.errors?.passwordMismatch ||
        '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkFormValidity = (data: PasswordChangeFormData = formData) => {
    const isValid = !!(
      data.currentPassword.trim() &&
      data.newPassword &&
      data.confirmPassword &&
      data.newPassword.length >= 6 &&
      data.newPassword === data.confirmPassword
    );
    onFormValidChange?.(isValid);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!validateForm()) {
      return;
    }

    if (!user?.email) {
      setSubmitError('사용자 정보를 불러올 수 없습니다.');
      return;
    }

    setIsLoading(true);
    setSubmitError(null);

    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error('Supabase client 생성 실패');
      }

      // 1. 기존 비밀번호 확인
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: formData.currentPassword,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          setErrors({
            currentPassword:
              dict.my?.profile?.passwordChange?.errors?.currentPasswordInvalid ||
              '기존 비밀번호가 올바르지 않습니다.',
          });
        } else {
          setSubmitError(signInError.message);
        }
        setIsLoading(false);
        return;
      }

      // 2. 새 비밀번호로 변경
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (updateError) {
        let errorMessage =
          dict.my?.profile?.passwordChange?.errors?.updateFailed ||
          '비밀번호 변경 중 오류가 발생했습니다.';

        if (updateError.message.includes('Password should be at least')) {
          errorMessage =
            dict.my?.profile?.passwordChange?.errors?.newPasswordTooShort ||
            '비밀번호는 최소 6자 이상이어야 합니다.';
        }

        setSubmitError(errorMessage);
        setIsLoading(false);
        return;
      }

      // 성공 시 마이페이지로 리다이렉트
      onSubmit?.();
      router.push(`/${lang}/my`);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : dict.my?.profile?.passwordChange?.errors?.updateFailed ||
            '비밀번호 변경 중 오류가 발생했습니다.';
      setSubmitError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 폼 유효성 체크 및 폼 데이터 변경 시 체크
  useEffect(() => {
    checkFormValidity();
  }, [formData]);

  return (
    <form id={formId} onSubmit={handleSubmit} className='flex flex-col gap-5 p-5'>
      <InputFieldV2
        label={dict.my?.profile?.passwordChange?.currentPassword || '기존 비밀번호'}
        type='password'
        value={formData.currentPassword}
        onChange={(e) => updateField('currentPassword', e.target.value)}
        placeholder={
          dict.my?.profile?.passwordChange?.placeholders?.currentPassword ||
          '기존 비밀번호를 입력하세요'
        }
        error={errors.currentPassword}
        disabled={isLoading}
      />

      <InputFieldV2
        label={dict.my?.profile?.passwordChange?.newPassword || '변경할 비밀번호'}
        type='password'
        value={formData.newPassword}
        onChange={(e) => updateField('newPassword', e.target.value)}
        placeholder={
          dict.my?.profile?.passwordChange?.placeholders?.newPassword || '6자 이상의 비밀번호'
        }
        error={errors.newPassword}
        disabled={isLoading}
      />

      <InputFieldV2
        label={dict.my?.profile?.passwordChange?.confirmPassword || '변경할 비밀번호 확인'}
        type='password'
        value={formData.confirmPassword}
        onChange={(e) => updateField('confirmPassword', e.target.value)}
        placeholder={
          dict.my?.profile?.passwordChange?.placeholders?.confirmPassword ||
          '비밀번호를 다시 입력하세요'
        }
        error={errors.confirmPassword}
        disabled={isLoading}
      />

      {/* 에러 메시지 */}
      {submitError && (
        <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
          <p className='text-sm text-red-600'>{submitError}</p>
        </div>
      )}
    </form>
  );
}
