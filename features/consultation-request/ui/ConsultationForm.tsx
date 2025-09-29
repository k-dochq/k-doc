'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useConsultationForm } from '../model/useConsultationForm';
import { AGE_GROUPS, GENDER_OPTIONS } from '../model/types';
import { useConsultationRequest } from '../api/useConsultationRequest';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useUserProfile } from 'features/user-profile/model/useUserProfile';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { FormSelect } from './FormSelect';
import { FormRadioGroup } from './FormRadioGroup';
import { FormCheckbox } from './FormCheckbox';
import { SubmitButton } from './SubmitButton';
import { FormDatePicker } from './FormDatePicker';
import { PhoneNumberInput } from 'features/email-auth/ui/inputs/PhoneNumberInput';
// 아이콘 SVG 컴포넌트들
const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
    />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    />
  </svg>
);

interface ConsultationFormProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationForm({ hospitalId, lang, dict }: ConsultationFormProps) {
  const { data: userProfile, isLoading: isUserLoading } = useUserProfile();
  const { formData, errors, updateField, handleSubmit, isFormValid } = useConsultationForm(
    lang,
    dict,
    userProfile,
  );
  const router = useLocalizedRouter();
  const consultationMutation = useConsultationRequest();

  const onSubmit = () => {
    // 필수값 validation 체크
    const validationErrors: string[] = [];

    if (!formData.name.trim()) {
      validationErrors.push(
        dict.consultation?.request?.form?.errors?.name?.required || '이름을 입력해주세요.',
      );
    }

    if (!formData.ageGroup) {
      validationErrors.push(
        dict.consultation?.request?.form?.errors?.ageGroup?.required || '나이대를 선택해주세요.',
      );
    }

    if (!formData.countryCode.trim()) {
      validationErrors.push(
        dict.consultation?.request?.form?.errors?.countryCode?.required ||
          '국가번호를 선택해주세요.',
      );
    }

    if (!formData.phoneNumberOnly.trim()) {
      validationErrors.push(
        dict.consultation?.request?.form?.errors?.phoneNumber?.required ||
          '휴대폰번호를 입력해주세요.',
      );
    } else if (!/^[0-9-+\s()]{7,15}$/.test(formData.phoneNumberOnly.trim())) {
      validationErrors.push(
        dict.consultation?.request?.form?.errors?.phoneNumber?.invalid ||
          '올바른 휴대폰번호를 입력해주세요.',
      );
    }

    if (!formData.preferredDate) {
      validationErrors.push(
        dict.consultation?.request?.form?.errors?.preferredDate?.required ||
          '희망 상담일을 선택해주세요.',
      );
    }

    if (formData.content.trim() && formData.content.length > 500) {
      validationErrors.push(
        dict.consultation?.request?.form?.errors?.content?.maxLength ||
          '상담 내용은 500자 이하로 입력해주세요.',
      );
    }

    if (!formData.agreeToPrivacy) {
      validationErrors.push(
        dict.consultation?.request?.form?.errors?.agreeToPrivacy?.required ||
          '민감정보 수집 이용에 동의해주세요.',
      );
    }

    // validation 실패 시 alert로 알림 (첫 번째 에러만)
    if (validationErrors.length > 0) {
      window.alert(validationErrors[0]);
      return;
    }

    // validation 통과 시 API 호출
    consultationMutation.mutate(
      {
        hospitalId,
        name: formData.name,
        gender: formData.gender,
        ageGroup: formData.ageGroup,
        countryCode: formData.countryCode,
        phoneNumberOnly: formData.phoneNumberOnly,
        preferredDate: formData.preferredDate,
        preferredDate2: formData.preferredDate2,
        content: formData.content,
      },
      {
        onSuccess: () => {
          // 성공 시 상담채팅 페이지로 이동
          router.push(`/chat/${hospitalId}`);
        },
        onError: (error) => {
          console.error('상담신청 실패:', error);

          // 에러 메시지 매핑
          const errorMessage = error.message;
          let displayMessage =
            dict.consultation?.request?.form?.errorMessages?.UNKNOWN_ERROR ||
            '알 수 없는 오류가 발생했습니다.';

          // 서버에서 반환된 에러 코드에 따른 메시지 매핑
          if (errorMessage.includes('UNAUTHORIZED')) {
            displayMessage =
              dict.consultation?.request?.form?.errorMessages?.UNAUTHORIZED ||
              '로그인이 필요합니다.';
          } else if (errorMessage.includes('MISSING_REQUIRED_FIELDS')) {
            displayMessage =
              dict.consultation?.request?.form?.errorMessages?.MISSING_REQUIRED_FIELDS ||
              '필수 항목을 모두 입력해주세요.';
          } else if (errorMessage.includes('HOSPITAL_NOT_FOUND')) {
            displayMessage =
              dict.consultation?.request?.form?.errorMessages?.HOSPITAL_NOT_FOUND ||
              '병원 정보를 찾을 수 없습니다.';
          } else if (errorMessage.includes('INTERNAL_SERVER_ERROR')) {
            displayMessage =
              dict.consultation?.request?.form?.errorMessages?.INTERNAL_SERVER_ERROR ||
              '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
          } else if (
            errorMessage.includes('Failed to fetch') ||
            errorMessage.includes('NetworkError')
          ) {
            displayMessage =
              dict.consultation?.request?.form?.errorMessages?.NETWORK_ERROR ||
              '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
          }

          window.alert(displayMessage);
        },
      },
    );
  };

  return (
    <div className='space-y-6 px-5 py-6'>
      {/* 이름 */}
      <FormInput
        label={dict.consultation?.request?.form?.name?.label || '이름'}
        value={formData.name}
        onChange={(e) => updateField('name', e.target.value)}
        placeholder={dict.consultation?.request?.form?.name?.placeholder || '이름을 입력해주세요'}
        error={errors.name}
        icon={<UserIcon />}
      />

      {/* 성별 */}
      <FormRadioGroup
        label={dict.consultation?.request?.form?.gender?.label || '성별'}
        value={formData.gender}
        onChange={(value) => updateField('gender', value as 'MALE' | 'FEMALE')}
        options={GENDER_OPTIONS.map((option) => ({
          value: option.value,
          label:
            option.value === 'MALE'
              ? dict.consultation?.request?.form?.gender?.male || '남성'
              : dict.consultation?.request?.form?.gender?.female || '여성',
        }))}
        error={errors.gender}
      />

      {/* 나이대 */}
      <FormSelect
        label={dict.consultation?.request?.form?.ageGroup?.label || '나이대'}
        value={formData.ageGroup}
        onChange={(value) => updateField('ageGroup', value)}
        options={AGE_GROUPS.map((option) => ({
          value: option.value,
          label:
            dict.consultation?.request?.form?.ageGroup?.[
              option.value as keyof typeof dict.consultation.request.form.ageGroup
            ] || option.label,
        }))}
        placeholder={
          dict.consultation?.request?.form?.ageGroup?.placeholder || '나이대를 선택해주세요'
        }
        error={errors.ageGroup}
      />

      {/* 휴대폰 번호 */}
      <PhoneNumberInput
        countryCode={formData.countryCode}
        phoneNumberOnly={formData.phoneNumberOnly}
        onCountryCodeChange={(value) => updateField('countryCode', value)}
        onPhoneNumberChange={(value) => updateField('phoneNumberOnly', value)}
        countryCodeError={errors.countryCode}
        phoneNumberError={errors.phoneNumberOnly}
        disabled={consultationMutation.isPending}
        lang={lang}
        dict={dict}
        required={true}
      />

      {/* 예약 희망 날짜 */}
      <FormDatePicker
        label={dict.consultation?.request?.form?.preferredDate?.label || '예약 희망 날짜'}
        value={formData.preferredDate ? new Date(formData.preferredDate) : undefined}
        onChange={(date) =>
          updateField('preferredDate', date ? date.toISOString().split('T')[0] : '')
        }
        locale={lang}
        dict={dict}
        placeholder={
          dict.consultation?.request?.form?.preferredDate?.placeholder || '날짜를 선택해주세요'
        }
        error={errors.preferredDate}
      />

      {/* 예약 희망 날짜2 */}
      <FormDatePicker
        label={dict.consultation?.request?.form?.preferredDate2?.label || '예약 희망 날짜2'}
        value={formData.preferredDate2 ? new Date(formData.preferredDate2) : undefined}
        onChange={(date) =>
          updateField('preferredDate2', date ? date.toISOString().split('T')[0] : '')
        }
        locale={lang}
        dict={dict}
        placeholder={
          dict.consultation?.request?.form?.preferredDate2?.placeholder || '날짜를 선택해주세요'
        }
        error={errors.preferredDate2}
        required={false}
      />

      {/* 내용 */}
      <FormTextarea
        label={dict.consultation?.request?.form?.content?.label || '내용'}
        value={formData.content}
        onChange={(e) => updateField('content', e.target.value)}
        placeholder={
          dict.consultation?.request?.form?.content?.placeholder ||
          '상담받고 싶은 내용을 자세히 적어주세요'
        }
        maxLength={500}
        currentLength={formData.content.length}
        error={errors.content}
      />

      {/* 개인정보 수집 이용 동의 */}
      <FormCheckbox
        checked={formData.agreeToPrivacy}
        onChange={(checked) => updateField('agreeToPrivacy', checked)}
        title={
          dict.consultation?.request?.form?.privacyAgreement?.title || '민감정보 수집 이용 동의'
        }
        description={
          dict.consultation?.request?.form?.privacyAgreement?.description ||
          '시술후기 작성 및 앱내 활용을 위한 민감정보 수집, 이용 규정을 확인하였으며 이에 동의합니다.'
        }
        error={errors.agreeToPrivacy}
      />

      {/* 상담신청 버튼 */}
      <SubmitButton onClick={onSubmit} disabled={consultationMutation.isPending}>
        {consultationMutation.isPending
          ? dict.consultation?.request?.form?.loading || '로딩 중...'
          : dict.consultation?.request?.form?.submitButton || '상담신청'}
      </SubmitButton>
    </div>
  );
}
