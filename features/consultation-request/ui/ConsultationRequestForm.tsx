'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { extractLocalizedText } from 'shared/lib';
import { ArrowLeft } from 'lucide-react';
import { LocaleLink } from 'shared/ui/locale-link';

interface ConsultationRequestFormProps {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
}

interface FormData {
  name: string;
  gender: 'male' | 'female' | '';
  ageGroup: '10s' | '20s' | '30s' | '40s' | '50s' | '60s' | '';
  phoneNumber: string;
  preferredContactTime: 'morning' | 'afternoon' | 'evening' | 'anytime' | '';
  content: string;
}

export function ConsultationRequestForm({ hospital, lang, dict }: ConsultationRequestFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    ageGroup: '',
    phoneNumber: '',
    preferredContactTime: '',
    content: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const hospitalName = extractLocalizedText(hospital.name, lang) || '병원';
  const consultationDict = dict.consultation?.request;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 유효성 검사
    const errors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) errors.name = '이름을 입력해주세요';
    if (!formData.gender) errors.gender = '성별을 선택해주세요';
    if (!formData.ageGroup) errors.ageGroup = '나이대를 선택해주세요';
    if (!formData.phoneNumber.trim()) errors.phoneNumber = '휴대폰번호를 입력해주세요';
    if (!formData.preferredContactTime) errors.preferredContactTime = '선호연락시간을 선택해주세요';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      // 상담신청 데이터를 콘솔에 출력 (추후 API 호출로 변경)
      console.log('상담신청 데이터:', {
        hospitalId: hospital.id,
        hospitalName,
        ...formData,
      });

      // 채팅 페이지로 이동
      const chatUrl = `/consultation/chat?hospitalId=${hospital.id}`;
      window.location.href = `/${lang}${chatUrl}`;
    } catch (error) {
      console.error('상담 신청 중 오류:', error);
      alert('상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className='mx-auto max-w-2xl'>
      {/* 헤더 */}
      <div className='mb-6 flex items-center space-x-4'>
        <LocaleLink
          href={`/hospitals/${hospital.id}`}
          locale={lang}
          className='flex items-center justify-center rounded-full bg-gray-100 p-2 hover:bg-gray-200'
        >
          <ArrowLeft className='h-5 w-5' />
        </LocaleLink>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            {consultationDict?.title || '상담신청'}
          </h1>
          <p className='text-gray-600'>{hospitalName}</p>
        </div>
      </div>

      {/* 폼 */}
      <div className='rounded-lg bg-white p-6 shadow-lg'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* 이름 */}
          <div>
            <label htmlFor='name' className='mb-2 block text-sm font-medium text-gray-700'>
              {consultationDict?.form?.name?.label || '이름'}{' '}
              <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='name'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
              placeholder={consultationDict?.form?.name?.placeholder || '이름을 입력해주세요'}
              required
            />
          </div>

          {/* 성별 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              {consultationDict?.form?.gender?.label || '성별'}{' '}
              <span className='text-red-500'>*</span>
            </label>
            <div className='flex space-x-4'>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='gender'
                  value='male'
                  checked={formData.gender === 'male'}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className='mr-2 h-4 w-4 text-blue-600'
                  required
                />
                {consultationDict?.form?.gender?.male || '남성'}
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='gender'
                  value='female'
                  checked={formData.gender === 'female'}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className='mr-2 h-4 w-4 text-blue-600'
                />
                {consultationDict?.form?.gender?.female || '여성'}
              </label>
            </div>
          </div>

          {/* 나이대 */}
          <div>
            <label htmlFor='ageGroup' className='mb-2 block text-sm font-medium text-gray-700'>
              {consultationDict?.form?.ageGroup?.label || '나이대'}{' '}
              <span className='text-red-500'>*</span>
            </label>
            <select
              id='ageGroup'
              value={formData.ageGroup}
              onChange={(e) => handleInputChange('ageGroup', e.target.value)}
              className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
              required
            >
              <option value=''>
                {consultationDict?.form?.ageGroup?.placeholder || '나이대를 선택해주세요'}
              </option>
              <option value='10s'>{consultationDict?.form?.ageGroup?.['10s'] || '10대'}</option>
              <option value='20s'>{consultationDict?.form?.ageGroup?.['20s'] || '20대'}</option>
              <option value='30s'>{consultationDict?.form?.ageGroup?.['30s'] || '30대'}</option>
              <option value='40s'>{consultationDict?.form?.ageGroup?.['40s'] || '40대'}</option>
              <option value='50s'>{consultationDict?.form?.ageGroup?.['50s'] || '50대'}</option>
              <option value='60s'>
                {consultationDict?.form?.ageGroup?.['60s'] || '60대 이상'}
              </option>
            </select>
          </div>

          {/* 휴대폰번호 */}
          <div>
            <label htmlFor='phoneNumber' className='mb-2 block text-sm font-medium text-gray-700'>
              {consultationDict?.form?.phoneNumber?.label || '휴대폰번호'}{' '}
              <span className='text-red-500'>*</span>
            </label>
            <input
              type='tel'
              id='phoneNumber'
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
              placeholder={consultationDict?.form?.phoneNumber?.placeholder || '010-0000-0000'}
              required
            />
          </div>

          {/* 선호연락시간 */}
          <div>
            <label
              htmlFor='preferredContactTime'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              {consultationDict?.form?.preferredContactTime?.label || '선호연락시간'}{' '}
              <span className='text-red-500'>*</span>
            </label>
            <select
              id='preferredContactTime'
              value={formData.preferredContactTime}
              onChange={(e) => handleInputChange('preferredContactTime', e.target.value)}
              className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
              required
            >
              <option value=''>
                {consultationDict?.form?.preferredContactTime?.placeholder ||
                  '선호연락시간을 선택해주세요'}
              </option>
              <option value='morning'>
                {consultationDict?.form?.preferredContactTime?.morning || '오전 (09:00 - 12:00)'}
              </option>
              <option value='afternoon'>
                {consultationDict?.form?.preferredContactTime?.afternoon || '오후 (12:00 - 18:00)'}
              </option>
              <option value='evening'>
                {consultationDict?.form?.preferredContactTime?.evening || '저녁 (18:00 - 21:00)'}
              </option>
              <option value='anytime'>
                {consultationDict?.form?.preferredContactTime?.anytime || '언제든지'}
              </option>
            </select>
          </div>

          {/* 내용 */}
          <div>
            <label htmlFor='content' className='mb-2 block text-sm font-medium text-gray-700'>
              {consultationDict?.form?.content?.label || '상담내용'}
            </label>
            <textarea
              id='content'
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={4}
              className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
              placeholder={
                consultationDict?.form?.content?.placeholder ||
                '상담받고 싶은 내용을 자유롭게 작성해주세요'
              }
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type='submit'
            className='w-full rounded-lg bg-blue-600 px-6 py-4 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-200 focus:outline-none'
          >
            {consultationDict?.form?.submitButton || '상담신청'}
          </button>
        </form>
      </div>
    </div>
  );
}
