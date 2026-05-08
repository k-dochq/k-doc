'use client';

import { useMemo, useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeader } from 'shared/ui/page-header/PageHeader';
import { InputFieldV2 } from 'features/consultation-request/ui/InputFieldV2';
import { TextareaFieldV2 } from 'features/consultation-request/ui/TextareaFieldV2';
import { createClient } from 'shared/lib/supabase/client';
import { STORAGE_CONFIG, STORAGE_PATHS } from 'shared/config/storage';
import { getAcceptString, isSupportedFileType } from 'shared/config/file-types';
import { COUNTRY_CODES } from 'entities/country-code';
import { CountryCodePhoneField } from './CountryCodePhoneField';
import { AttachmentField } from './AttachmentField';
import { PrivacyAgreementField } from './PrivacyAgreementField';

interface DataRequestContentProps {
  lang: Locale;
  dict: Dictionary;
}

interface UploadedFile {
  name: string;
  url: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  content?: string;
  privacy?: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function DataRequestContent({ lang, dict }: DataRequestContentProps) {
  const i18n = useMemo(() => dict.dataRequest, [dict.dataRequest]);
  const countryOptions = useMemo(
    () => {
      const dedupedCodes = Array.from(new Set(COUNTRY_CODES.map((country) => country.code)));
      return dedupedCodes.map((code) => ({
        value: code,
        label: code,
        key: code,
      }));
    },
    [],
  );
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+66');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormReady =
    name.trim() &&
    phone.trim() &&
    email.trim() &&
    content.trim() &&
    content.trim().length <= 500 &&
    privacyAgreed &&
    !isUploading &&
    !isSubmitting;

  const uploadFile = async (file: File) => {
    if (uploadedFiles.length >= 10) {
      setErrors((prev) => ({ ...prev, content: undefined }));
      alert(i18n.errors.uploadCount);
      return;
    }

    if (!isSupportedFileType(file.type)) {
      alert(i18n.errors.uploadType);
      return;
    }

    if (file.size > STORAGE_CONFIG.MAX_FILE_SIZE) {
      alert(i18n.errors.uploadSize);
      return;
    }

    setIsUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split('.').pop();
      const safeExt = ext ? `.${ext}` : '';
      const filePath = `${STORAGE_PATHS.DATA_REQUEST_ATTACHMENTS}/${Date.now()}_${crypto.randomUUID()}${safeExt}`;

      const { data, error } = await supabase.storage
        .from(STORAGE_CONFIG.BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(STORAGE_CONFIG.BUCKET_NAME).getPublicUrl(data.path);

      setUploadedFiles((prev) => [...prev, { name: file.name, url: publicUrl }]);
    } catch (error) {
      console.error('Failed to upload attachment:', error);
      alert(i18n.errors.uploadFail);
    } finally {
      setIsUploading(false);
    }
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!name.trim()) nextErrors.name = i18n.errors.requiredName;
    if (!phone.trim()) nextErrors.phone = i18n.errors.requiredPhone;
    if (!email.trim()) nextErrors.email = i18n.errors.requiredEmail;
    else if (!isValidEmail(email.trim())) nextErrors.email = i18n.errors.invalidEmail;
    if (!content.trim()) nextErrors.content = i18n.errors.requiredContent;
    else if (content.trim().length > 500) nextErrors.content = i18n.errors.maxContent;
    if (!privacyAgreed) nextErrors.privacy = i18n.errors.requiredPrivacy;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/hospital-change-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requesterName: name.trim(),
          requesterPhone: `${countryCode} ${phone.trim()}`,
          requesterEmail: email.trim(),
          content: content.trim(),
          attachmentUrls: uploadedFiles.map((file) => file.url),
        }),
      });

      if (!response.ok) {
        throw new Error('Submit failed');
      }

      alert(i18n.success);
      setName('');
      setPhone('');
      setEmail('');
      setContent('');
      setPrivacyAgreed(false);
      setUploadedFiles([]);
      setErrors({});
    } catch (error) {
      console.error(error);
      alert(i18n.errors.submitFail);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-white'>
      <PageHeader
        lang={lang}
        title={dict.footer?.dataRequest || 'Data Request'}
        fallbackUrl={`/${lang}/main`}
        variant='light'
        bgClassName='bg-white'
      />

      <form id='data-request-form' onSubmit={handleSubmit} className='px-5 pt-5 pb-[132px]'>
        <p className='mb-8 whitespace-pre-line text-sm leading-7 text-neutral-500'>{i18n.description}</p>

        <div className='space-y-5'>
          <InputFieldV2
            label={dict.support?.form?.name?.label || 'Name'}
            required
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={i18n.namePlaceholder}
            error={errors.name}
          />
          <CountryCodePhoneField
            label={dict.consultation?.request?.form?.phoneNumber?.label || 'Phone Number'}
            countryCode={countryCode}
            phone={phone}
            placeholder={i18n.phonePlaceholder}
            error={errors.phone}
            countryOptions={countryOptions}
            onCountryCodeChange={setCountryCode}
            onPhoneChange={setPhone}
          />
          <InputFieldV2
            label={dict.support?.form?.email?.label || 'Email'}
            required
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={i18n.emailPlaceholder}
            error={errors.email}
          />
          <TextareaFieldV2
            label={i18n.contentLabel}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={i18n.contentPlaceholder}
            currentLength={content.length}
            maxLength={500}
            rows={6}
            error={errors.content}
          />

          <AttachmentField
            label={i18n.fileLabel}
            guide={i18n.fileGuide}
            addFileLabel={i18n.addFile}
            uploadingLabel={i18n.uploading}
            isUploading={isUploading}
            uploadedFiles={uploadedFiles}
            disabled={isUploading || uploadedFiles.length >= 10}
            onRemove={(url) => setUploadedFiles((prev) => prev.filter((item) => item.url !== url))}
            onFileSelect={uploadFile}
            accept={getAcceptString()}
          />

          <PrivacyAgreementField
            label={i18n.privacyLabel}
            description={i18n.privacyText}
            checked={privacyAgreed}
            error={errors.privacy}
            onChange={setPrivacyAgreed}
          />
        </div>

      </form>

      <div className='fixed bottom-0 left-1/2 z-20 w-full max-w-[600px] -translate-x-1/2 border-t border-neutral-200 bg-white px-5 pt-4 pb-10 md:static md:left-auto md:mt-8 md:max-w-none md:translate-x-0 md:border-t-0 md:bg-transparent md:px-5 md:pt-0 md:pb-10'>
        <button
          type='submit'
          form='data-request-form'
          disabled={!isFormReady}
          className='h-14 w-full rounded-xl bg-sub-900 text-base font-medium text-white disabled:bg-neutral-200 disabled:text-neutral-400'
        >
          {isSubmitting ? i18n.submitting : i18n.submit}
        </button>
      </div>
    </div>
  );
}
