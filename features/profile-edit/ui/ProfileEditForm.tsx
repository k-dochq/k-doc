'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FormInput } from 'shared/ui/form-input';
import { FormButton } from 'shared/ui/form-button';
import { useUserProfile, useUpdateUserProfile } from 'features/user-profile';

interface ProfileEditFormProps {
  lang: Locale;
  dict: Dictionary;
}

export function ProfileEditForm({ lang, dict }: ProfileEditFormProps) {
  const router = useRouter();
  const { data: user, isLoading: userLoading, error: userError } = useUserProfile();
  const {
    mutate: updateProfile,
    isPending: isLoading,
    error,
    isSuccess,
  } = useUpdateUserProfile({
    onSuccess: () => {
      router.push(`/${lang}/my`);
    },
  });

  const [formData, setFormData] = useState({
    nickname: '',
    name: '',
  });

  const [errors, setErrors] = useState<{
    nickname?: string;
    name?: string;
  }>({});

  // 사용자 정보가 로드되면 폼에 설정
  useEffect(() => {
    if (user) {
      setFormData({
        nickname: user.nickName || '',
        name: user.name || '',
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: { nickname?: string; name?: string } = {};

    if (!formData.nickname.trim()) {
      newErrors.nickname =
        dict.my?.profile?.edit?.errors?.nicknameRequired || '닉네임을 입력해주세요.';
    } else if (formData.nickname.trim().length < 2) {
      newErrors.nickname =
        dict.my?.profile?.edit?.errors?.nicknameTooShort || '닉네임은 2자 이상이어야 합니다.';
    }

    if (!formData.name.trim()) {
      newErrors.name = dict.my?.profile?.edit?.errors?.nameRequired || '이름을 입력해주세요.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name =
        dict.my?.profile?.edit?.errors?.nameTooShort || '이름은 2자 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    updateProfile({
      nickName: formData.nickname.trim(),
      name: formData.name.trim(),
    });
  };

  const handleCancel = () => {
    router.push(`/${lang}/my`);
  };

  if (userLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center'>
            <div className='mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600'></div>
            <p className='mt-2 text-sm text-gray-600'>사용자 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className='flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
            <h3 className='mb-2 text-lg font-semibold text-red-800'>오류</h3>
            <p className='text-sm text-red-700'>{userError.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen px-4 py-3 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <form onSubmit={handleSubmit} className='flex w-full flex-col gap-5'>
          {/* 이메일 (읽기 전용) */}
          <FormInput
            label={dict.my?.profile?.edit?.email || '이메일'}
            type='email'
            value={user?.email || ''}
            disabled={true}
            className='bg-gray-50'
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          />

          {/* 닉네임 */}
          <FormInput
            label={dict.my?.profile?.edit?.nickname || '닉네임'}
            type='text'
            value={formData.nickname}
            onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
            placeholder={dict.my?.profile?.edit?.placeholders?.nickname || '닉네임을 입력하세요'}
            error={errors.nickname}
            disabled={isLoading}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          />

          {/* 이름 */}
          <FormInput
            label={dict.my?.profile?.edit?.name || '이름'}
            type='text'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={dict.my?.profile?.edit?.placeholders?.name || '이름을 입력하세요'}
            error={errors.name}
            disabled={isLoading}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          />

          {/* 에러 메시지 */}
          {error && (
            <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
              <p className='text-sm text-red-600'>{error.message}</p>
            </div>
          )}

          {/* 버튼들 */}
          <div className='flex w-full flex-col gap-3'>
            <FormButton type='submit' loading={isLoading} disabled={isLoading}>
              {dict.my?.profile?.edit?.saveButton || '저장'}
            </FormButton>
            <FormButton
              type='button'
              variant='secondary'
              onClick={handleCancel}
              disabled={isLoading}
            >
              {dict.my?.profile?.edit?.cancelButton || '취소'}
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  );
}
