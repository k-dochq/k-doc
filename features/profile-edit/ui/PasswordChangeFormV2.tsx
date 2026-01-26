'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { InputFieldV2 } from 'features/consultation-request/ui/InputFieldV2';
import { createClient } from 'shared/lib/supabase/client';
import { useUserProfile } from 'features/user-profile';
import { EyeIcon, EyeOffIcon } from './PasswordVisibilityIcons';

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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        'Please enter your current password.';
    }

    // 새 비밀번호 검증
    if (!formData.newPassword) {
      newErrors.newPassword =
        dict.my?.profile?.passwordChange?.errors?.newPasswordRequired ||
        'Please enter your new password.';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword =
        dict.my?.profile?.passwordChange?.errors?.newPasswordTooShort ||
        'Password must be at least 6 characters.';
    }

    // 비밀번호 확인 검증
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        dict.my?.profile?.passwordChange?.errors?.confirmPasswordRequired ||
        'Please confirm your password.';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword =
        dict.my?.profile?.passwordChange?.errors?.passwordMismatch ||
        'Passwords do not match.';
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
      setSubmitError('Unable to load user information.');
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
              'Current password is incorrect.',
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
          'An error occurred while changing password.';

        if (updateError.message.includes('Password should be at least')) {
          errorMessage =
            dict.my?.profile?.passwordChange?.errors?.newPasswordTooShort ||
            'Password must be at least 6 characters.';
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
            'An error occurred while changing password.';
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
        label={dict.my?.profile?.passwordChange?.currentPassword || 'Current Password'}
        type={showCurrentPassword ? 'text' : 'password'}
        value={formData.currentPassword}
        onChange={(e) => updateField('currentPassword', e.target.value)}
        placeholder={
          dict.my?.profile?.passwordChange?.placeholders?.currentPassword ||
          'Enter your current password'
        }
        error={errors.currentPassword}
        disabled={isLoading}
        rightIcon={showCurrentPassword ? <EyeIcon /> : <EyeOffIcon />}
        onRightIconClick={() => setShowCurrentPassword(!showCurrentPassword)}
      />

      <InputFieldV2
        label={dict.my?.profile?.passwordChange?.newPassword || 'New Password'}
        type={showNewPassword ? 'text' : 'password'}
        value={formData.newPassword}
        onChange={(e) => updateField('newPassword', e.target.value)}
        placeholder={
          dict.my?.profile?.passwordChange?.placeholders?.newPassword || 'At least 6 characters'
        }
        error={errors.newPassword}
        disabled={isLoading}
        rightIcon={showNewPassword ? <EyeIcon /> : <EyeOffIcon />}
        onRightIconClick={() => setShowNewPassword(!showNewPassword)}
      />

      <InputFieldV2
        label={dict.my?.profile?.passwordChange?.confirmPassword || 'Confirm New Password'}
        type={showConfirmPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={(e) => updateField('confirmPassword', e.target.value)}
        placeholder={
          dict.my?.profile?.passwordChange?.placeholders?.confirmPassword ||
          'Enter your password again'
        }
        error={errors.confirmPassword}
        disabled={isLoading}
        rightIcon={showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
        onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
