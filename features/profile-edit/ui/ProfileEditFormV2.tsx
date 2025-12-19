'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { InputFieldV2 } from 'features/consultation-request/ui/InputFieldV2';
import { SelectFieldV2, PhoneNumberFieldV2 } from 'features/consultation-request/ui/FormFieldsV2';
import { FormDatePickerV2 } from 'features/consultation-request/ui/FormDatePickerV2';
import { useUserProfile, useUpdateUserProfile } from 'features/user-profile';
import { COUNTRY_CODES, getCountryName } from 'entities/country-code';
import { LocaleLink } from 'shared/ui/locale-link';

interface ProfileEditFormV2Props {
  lang: Locale;
  dict: Dictionary;
  onSubmit?: () => void;
  formId?: string;
  onFormSubmit?: () => void;
  onFormChanged?: (hasChanges: boolean) => void;
}

interface ProfileEditFormData {
  email: string;
  passportName: string;
  nationality: string;
  gender: string;
  birthDate: string;
  countryCode: string;
  phoneNumberOnly: string;
}

interface ProfileEditFormErrors {
  passportName?: string;
  nationality?: string;
  gender?: string;
  birthDate?: string;
  countryCode?: string;
  phoneNumberOnly?: string;
}

export function ProfileEditFormV2({
  lang,
  dict,
  onSubmit,
  formId,
  onFormSubmit,
  onFormChanged,
}: ProfileEditFormV2Props) {
  const router = useRouter();
  const { data: user, isLoading: userLoading, error: userError } = useUserProfile();
  const {
    mutate: updateProfile,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateUserProfile({
    onSuccess: () => {
      router.push(`/${lang}/my`);
      onSubmit?.();
    },
  });

  const [formData, setFormData] = useState<ProfileEditFormData>({
    email: '',
    passportName: '',
    nationality: '',
    gender: '',
    birthDate: '',
    countryCode: '',
    phoneNumberOnly: '',
  });

  const [initialFormData, setInitialFormData] = useState<ProfileEditFormData | null>(null);
  const [errors, setErrors] = useState<ProfileEditFormErrors>({});

  // 사용자 정보가 로드되면 폼에 설정
  useEffect(() => {
    if (user) {
      // 성별 매핑: genderType ('MALE'/'FEMALE') -> 'male'/'female'
      let genderValue = '';
      if (user.genderType) {
        genderValue = user.genderType.toLowerCase() as 'male' | 'female';
      } else if (user.raw_user_meta_data?.gender) {
        genderValue = user.raw_user_meta_data.gender.toLowerCase();
      }

      // 휴대폰번호 파싱
      let countryCode = user.raw_user_meta_data?.country_code || '';
      let phoneNumberOnly = user.raw_user_meta_data?.phone_number || '';

      // raw_user_meta_data에 없고 phoneNumber가 있는 경우 파싱 시도
      if (!countryCode && !phoneNumberOnly && user.phoneNumber) {
        const phoneMatch = user.phoneNumber.match(/^(\+\d{1,3})?(.+)$/);
        if (phoneMatch) {
          if (phoneMatch[1]) {
            countryCode = phoneMatch[1];
          }
          phoneNumberOnly = phoneMatch[2].replace(/^[-\s]/, '');
        } else {
          phoneNumberOnly = user.phoneNumber;
        }
      }

      const initialData: ProfileEditFormData = {
        email: user.email || '',
        passportName: user.raw_user_meta_data?.passport_name || '',
        nationality: user.raw_user_meta_data?.nationality || '',
        gender: genderValue,
        birthDate: user.raw_user_meta_data?.birth_date || '',
        countryCode,
        phoneNumberOnly,
      };

      setFormData(initialData);
      setInitialFormData(initialData);
    }
  }, [user]);

  // 폼 데이터 변경 감지
  useEffect(() => {
    if (!initialFormData) {
      onFormChanged?.(false);
      return;
    }

    const hasChanges =
      formData.passportName !== initialFormData.passportName ||
      formData.nationality !== initialFormData.nationality ||
      formData.gender !== initialFormData.gender ||
      formData.birthDate !== initialFormData.birthDate ||
      formData.countryCode !== initialFormData.countryCode ||
      formData.phoneNumberOnly !== initialFormData.phoneNumberOnly;

    onFormChanged?.(hasChanges);
  }, [formData, initialFormData, onFormChanged]);

  const updateField = <K extends keyof ProfileEditFormData>(
    field: K,
    value: ProfileEditFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (field in errors) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof ProfileEditFormErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Validation (optional for edit form)
    const newErrors: ProfileEditFormErrors = {};

    // 여권 영문 이름은 필수일 수 있음 (회원가입과 동일)
    if (!formData.passportName.trim()) {
      newErrors.passportName =
        dict.auth?.signup?.errors?.passportNameRequired ||
        '여권상의 영문 이름을 입력하지 않으면 치료 이용이 제한될 수 있습니다.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // gender를 genderType으로 변환
    const genderType =
      formData.gender === 'male' ? 'MALE' : formData.gender === 'female' ? 'FEMALE' : undefined;

    // 휴대폰번호 합치기
    const fullPhoneNumber =
      formData.countryCode && formData.phoneNumberOnly
        ? `${formData.countryCode}${formData.phoneNumberOnly}`
        : formData.phoneNumberOnly || undefined;

    updateProfile({
      passportName: formData.passportName.trim() || undefined,
      nationality: formData.nationality || undefined,
      gender: formData.gender || undefined,
      genderType,
      countryCode: formData.countryCode || undefined,
      phoneNumber: fullPhoneNumber,
      phoneNumberOnly: formData.phoneNumberOnly || undefined,
      birthDate: formData.birthDate || undefined,
    });

    onFormSubmit?.();
  };

  const getNationalityKey = (countryCode: string): string => {
    const country = COUNTRY_CODES.find((c) => c.code === countryCode);
    if (!country) return '';
    return country.name.toLowerCase().replace(/\s+/g, '_');
  };

  const nationalityOptions = COUNTRY_CODES.map((country) => ({
    value: getNationalityKey(country.code),
    label: getCountryName(country, lang),
  }));

  const genderOptions = [
    { value: 'female', label: dict.auth?.signup?.genders?.female || '여성' },
    { value: 'male', label: dict.auth?.signup?.genders?.male || '남성' },
  ] as const;

  const isBusy = userLoading || isUpdating;

  if (userLoading) {
    return (
      <div className='flex min-h-[400px] items-center justify-center p-5'>
        <div className='flex flex-col items-center gap-2'>
          <div className='border-t-primary-900 h-8 w-8 animate-spin rounded-full border-4 border-neutral-300'></div>
          <p className='text-sm text-neutral-500'>
            {dict.my?.profile?.edit?.loading || 'Loading user information...'}
          </p>
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className='p-5'>
        <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
          <h3 className='mb-2 text-lg font-semibold text-red-800'>
            {dict.my?.profile?.edit?.errorTitle || 'Error'}
          </h3>
          <p className='text-sm text-red-700'>{userError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className='flex flex-col gap-5 p-5'>
      <InputFieldV2
        label={dict.auth?.signup?.email || '이메일'}
        type='email'
        value={formData.email}
        disabled={true}
        placeholder={dict.auth?.signup?.placeholders?.email || 'your-email@example.com'}
      />

      <InputFieldV2
        label={dict.auth?.signup?.passportName || '여권 영문 이름'}
        type='text'
        value={formData.passportName}
        onChange={(e) => updateField('passportName', e.target.value)}
        placeholder={
          dict.auth?.signup?.placeholders?.passportName || '여권에 기재된 영문 이름을 입력하세요'
        }
        helperText={dict.my?.profile?.edit?.placeholders?.passportNameHelperText}
        error={errors.passportName}
        disabled={isBusy}
      />

      <SelectFieldV2
        label={dict.auth?.signup?.nationality || '국적'}
        value={formData.nationality}
        onChange={(value) => updateField('nationality', value)}
        options={nationalityOptions}
        placeholder={dict.auth?.signup?.placeholders?.nationality || '국적을 선택하세요 (선택사항)'}
        error={errors.nationality}
        disabled={isBusy}
      />

      <SelectFieldV2
        label={dict.auth?.signup?.gender || '성별'}
        value={formData.gender}
        onChange={(value) => updateField('gender', value)}
        options={genderOptions}
        placeholder={dict.auth?.signup?.placeholders?.gender || '성별을 선택하세요 (선택사항)'}
        error={errors.gender}
        disabled={isBusy}
      />

      <FormDatePickerV2
        label={dict.auth?.signup?.birthDate || '생년월일'}
        value={formData.birthDate ? new Date(formData.birthDate) : undefined}
        onChange={(date) => updateField('birthDate', date ? date.toISOString().split('T')[0] : '')}
        locale={lang}
        dict={dict}
        placeholder={
          dict.auth?.signup?.placeholders?.birthDate || '생년월일을 선택하세요 (선택사항)'
        }
        error={errors.birthDate}
        required={false}
        yearRange={{ from: 1950, to: new Date().getFullYear() }}
        disabled={(date) => date > new Date()}
      />

      <PhoneNumberFieldV2
        countryCode={formData.countryCode}
        phoneNumberOnly={formData.phoneNumberOnly}
        onCountryCodeChange={(value: string) => updateField('countryCode', value)}
        onPhoneNumberChange={(value: string) => updateField('phoneNumberOnly', value)}
        countryCodeError={errors.countryCode}
        phoneNumberError={errors.phoneNumberOnly}
        disabled={isBusy}
        lang={lang}
        dict={dict}
        required={false}
      />

      {/* 비밀번호 변경 링크 */}
      <div className='mt-8 flex justify-center'>
        <LocaleLink
          href={`/${lang}/my/edit/password`}
          locale={lang}
          className='text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-600'
        >
          {dict.my?.profile?.edit?.changePassword || '비밀번호 변경하기'}
        </LocaleLink>
      </div>

      {/* 에러 메시지 */}
      {updateError && (
        <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
          <p className='text-sm text-red-600'>{updateError.message}</p>
        </div>
      )}
    </form>
  );
}
