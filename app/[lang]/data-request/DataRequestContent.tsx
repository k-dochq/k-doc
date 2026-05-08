'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeader } from 'shared/ui/page-header/PageHeader';
import { InputFieldV2 } from 'features/consultation-request/ui/InputFieldV2';
import { TextareaFieldV2 } from 'features/consultation-request/ui/TextareaFieldV2';
import { createClient } from 'shared/lib/supabase/client';
import { STORAGE_CONFIG, STORAGE_PATHS } from 'shared/config/storage';
import { getAcceptString, isSupportedFileType } from 'shared/config/file-types';
import { COUNTRY_CODES } from 'entities/country-code';
import { Check } from 'lucide-react';

interface DataRequestContentProps {
  lang: Locale;
  dict: Dictionary;
}

interface UploadedFile {
  name: string;
  url: string;
}

interface FormErrors {
  requestType?: string;
  name?: string;
  phone?: string;
  email?: string;
  content?: string;
  privacy?: string;
}

interface DataRequestMessages {
  requestTypeLabel: string;
  requestTypePlaceholder: string;
  requestTypeUpdate: string;
  requestTypeDelete: string;
  description: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  contentLabel: string;
  contentPlaceholder: string;
  fileLabel: string;
  fileGuide: string;
  addFile: string;
  privacyLabel: string;
  privacyText: string;
  submit: string;
  success: string;
  uploading: string;
  submitting: string;
  errors: {
    requiredRequestType: string;
    requiredName: string;
    requiredPhone: string;
    requiredEmail: string;
    invalidEmail: string;
    requiredContent: string;
    maxContent: string;
    requiredPrivacy: string;
    uploadType: string;
    uploadSize: string;
    uploadCount: string;
    uploadFail: string;
    submitFail: string;
  };
}

const KO_MESSAGES: DataRequestMessages = {
  requestTypeLabel: '요청 유형',
  requestTypePlaceholder: '요청 유형을 선택해주세요',
  requestTypeUpdate: '정보 수정',
  requestTypeDelete: '정보 삭제',
  description:
    'K-DOC에 등록되어 있는 정보(병원/의사/리뷰)의 수정 또는 삭제가 필요하신 경우 아래 항목에 내용을 작성하여 제출해주시기 바랍니다.\n담당자 확인 후 필요한 조치를 취하도록 하겠습니다.',
  namePlaceholder: '이름을 입력해주세요',
  phonePlaceholder: '휴대폰 번호를 입력해주세요',
  emailPlaceholder: '이메일을 입력해주세요',
  contentLabel: '수정/삭제할 내용',
  contentPlaceholder: '수정/삭제할 내용을 알려주세요',
  fileLabel: '파일첨부',
  fileGuide: '지원되는 파일을 최대 10개까지 업로드하세요.\n파일당 최대 크기는 10 MB입니다.',
  addFile: '파일 추가',
  privacyLabel: '개인정보 수집 및 이용 안내',
  privacyText:
    '고객 문의 처리를 위해 개인정보 보호법 제15조제1항제4호(계약의 체결/이행)에 따라, 다음과 같은 개인정보를 수집/이용합니다.',
  submit: '제출',
  success: '요청이 접수되었습니다. 담당자 확인 후 안내드리겠습니다.',
  uploading: '업로드 중...',
  submitting: '제출 중...',
  errors: {
    requiredRequestType: '요청 유형을 선택해주세요.',
    requiredName: '이름을 입력해주세요.',
    requiredPhone: '휴대폰 번호를 입력해주세요.',
    requiredEmail: '이메일을 입력해주세요.',
    invalidEmail: '이메일 형식이 올바르지 않습니다.',
    requiredContent: '수정/삭제할 내용을 입력해주세요.',
    maxContent: '내용은 500자 이내로 입력해주세요.',
    requiredPrivacy: '개인정보 수집 및 이용 안내에 동의해주세요.',
    uploadType: '지원되지 않는 파일 형식입니다.',
    uploadSize: '파일 크기는 10MB 이하여야 합니다.',
    uploadCount: '파일은 최대 10개까지 첨부할 수 있습니다.',
    uploadFail: '파일 업로드에 실패했습니다.',
    submitFail: '요청 제출에 실패했습니다.',
  },
};

const EN_MESSAGES: DataRequestMessages = {
  requestTypeLabel: 'Request Type',
  requestTypePlaceholder: 'Select request type',
  requestTypeUpdate: 'Update Information',
  requestTypeDelete: 'Delete Information',
  description:
    'If edits or deletion are needed for information registered in K-DOC (hospital/doctor/review), please fill out the form below and submit.\nOur team will review and take the necessary action.',
  namePlaceholder: 'Enter your name',
  phonePlaceholder: 'Enter your phone number',
  emailPlaceholder: 'Enter your email',
  contentLabel: 'Details to Edit/Delete',
  contentPlaceholder: 'Please describe what should be edited or deleted',
  fileLabel: 'Attachments',
  fileGuide: 'You can upload up to 10 files.\nMaximum file size is 10 MB per file.',
  addFile: 'Add File',
  privacyLabel: 'Personal Information Collection and Use',
  privacyText:
    'To process your request, we collect and use personal information under Article 15(1)4 of the Personal Information Protection Act.',
  submit: 'Submit',
  success: 'Your request has been submitted successfully.',
  uploading: 'Uploading...',
  submitting: 'Submitting...',
  errors: {
    requiredRequestType: 'Please select request type.',
    requiredName: 'Please enter your name.',
    requiredPhone: 'Please enter your phone number.',
    requiredEmail: 'Please enter your email.',
    invalidEmail: 'Invalid email format.',
    requiredContent: 'Please enter details.',
    maxContent: 'Please enter up to 500 characters.',
    requiredPrivacy: 'Please agree to personal information collection and use.',
    uploadType: 'Unsupported file type.',
    uploadSize: 'File size must be 10MB or less.',
    uploadCount: 'You can upload up to 10 files.',
    uploadFail: 'Failed to upload file.',
    submitFail: 'Failed to submit request.',
  },
};

const TH_MESSAGES: DataRequestMessages = {
  ...EN_MESSAGES,
  description:
    'หากต้องการแก้ไขหรือลบข้อมูลที่ลงทะเบียนใน K-DOC (โรงพยาบาล/แพทย์/รีวิว) กรุณากรอกแบบฟอร์มด้านล่างและส่งคำขอ\nทีมงานจะตรวจสอบและดำเนินการที่จำเป็น',
  namePlaceholder: 'กรุณากรอกชื่อ',
  phonePlaceholder: 'กรุณากรอกหมายเลขโทรศัพท์',
  emailPlaceholder: 'กรุณากรอกอีเมล',
  contentLabel: 'รายละเอียดที่ต้องการแก้ไข/ลบ',
  contentPlaceholder: 'กรุณาระบุรายละเอียดที่ต้องการแก้ไขหรือลบ',
  fileLabel: 'แนบไฟล์',
  fileGuide: 'สามารถอัปโหลดได้สูงสุด 10 ไฟล์\nขนาดไฟล์สูงสุด 10 MB ต่อไฟล์',
  addFile: 'เพิ่มไฟล์',
  privacyLabel: 'การเก็บและการใช้ข้อมูลส่วนบุคคล',
  privacyText:
    'เพื่อดำเนินการตามคำขอของลูกค้า เราจะเก็บและใช้ข้อมูลส่วนบุคคลตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล',
  success: 'ส่งคำขอเรียบร้อยแล้ว',
};

const ZH_HANT_MESSAGES: DataRequestMessages = {
  ...EN_MESSAGES,
  description:
    '若您需要修改或刪除 K-DOC 上登錄的資訊（醫院/醫師/評論），請填寫下方表單後提交。\n我們將在確認後進行必要處理。',
  namePlaceholder: '請輸入姓名',
  phonePlaceholder: '請輸入手機號碼',
  emailPlaceholder: '請輸入電子郵件',
  contentLabel: '欲修改/刪除內容',
  contentPlaceholder: '請說明需要修改或刪除的內容',
  fileLabel: '附件',
  fileGuide: '最多可上傳 10 個檔案。\n每個檔案上限 10 MB。',
  addFile: '新增檔案',
  privacyLabel: '個人資料蒐集與使用說明',
  privacyText: '為處理您的請求，我們將依個資法規定蒐集並使用個人資料。',
  submit: '提交',
  success: '您的請求已成功提交。',
};

const JA_MESSAGES: DataRequestMessages = {
  ...EN_MESSAGES,
  description:
    'K-DOCに登録されている情報（病院/医師/レビュー）の修正または削除が必要な場合は、以下の項目を入力して送信してください。\n担当者が確認後、必要な対応を行います。',
  namePlaceholder: 'お名前を入力してください',
  phonePlaceholder: '携帯番号を入力してください',
  emailPlaceholder: 'メールアドレスを入力してください',
  contentLabel: '修正/削除内容',
  contentPlaceholder: '修正または削除したい内容を入力してください',
  fileLabel: 'ファイル添付',
  fileGuide: '最大10個までアップロードできます。\n1ファイルあたり最大10MBです。',
  addFile: 'ファイル追加',
  privacyLabel: '個人情報の収集および利用案内',
  privacyText:
    'お問い合わせ対応のため、個人情報保護法に基づき個人情報を収集・利用します。',
  submit: '送信',
  success: 'リクエストが受け付けられました。',
};

const HI_MESSAGES: DataRequestMessages = {
  ...EN_MESSAGES,
  description:
    'यदि K-DOC में पंजीकृत जानकारी (अस्पताल/डॉक्टर/रिव्यू) में संशोधन या हटाने की आवश्यकता है, तो नीचे दिया गया फ़ॉर्म भरकर सबमिट करें।\nहम पुष्टि के बाद आवश्यक कार्रवाई करेंगे।',
  namePlaceholder: 'अपना नाम दर्ज करें',
  phonePlaceholder: 'अपना फ़ोन नंबर दर्ज करें',
  emailPlaceholder: 'अपना ईमेल दर्ज करें',
  contentLabel: 'संशोधित/हटाने की सामग्री',
  contentPlaceholder: 'कृपया बताएं क्या संशोधित या हटाना है',
  fileLabel: 'फ़ाइल संलग्नक',
  fileGuide: 'अधिकतम 10 फ़ाइलें अपलोड कर सकते हैं।\nप्रत्येक फ़ाइल का अधिकतम आकार 10 MB है।',
  addFile: 'फ़ाइल जोड़ें',
  privacyLabel: 'व्यक्तिगत जानकारी संग्रह और उपयोग',
  privacyText: 'आपके अनुरोध को संसाधित करने के लिए हम व्यक्तिगत जानकारी एकत्र और उपयोग करते हैं।',
  submit: 'सबमिट करें',
  success: 'आपका अनुरोध सफलतापूर्वक सबमिट हो गया है।',
};

const TL_MESSAGES: DataRequestMessages = {
  ...EN_MESSAGES,
  description:
    'Kung kailangan ng pag-edit o pag-delete sa impormasyong nakarehistro sa K-DOC (ospital/doktor/review), pakipunan ang form sa ibaba at i-submit.\nSusuriin ito ng aming team at gagawa ng kinakailangang aksyon.',
  namePlaceholder: 'Ilagay ang iyong pangalan',
  phonePlaceholder: 'Ilagay ang iyong phone number',
  emailPlaceholder: 'Ilagay ang iyong email',
  contentLabel: 'Detalye ng I-eedit/Ide-delete',
  contentPlaceholder: 'Ilarawan kung ano ang dapat i-edit o i-delete',
  fileLabel: 'Mga Attachment',
  fileGuide: 'Maaari kang mag-upload ng hanggang 10 file.\nMaximum na laki ng bawat file ay 10 MB.',
  addFile: 'Magdagdag ng File',
  privacyLabel: 'Pagkolekta at Paggamit ng Personal na Impormasyon',
  privacyText:
    'Para maproseso ang iyong request, kumokolekta at gumagamit kami ng personal na impormasyon.',
  submit: 'Isumite',
  success: 'Matagumpay na naisumite ang iyong request.',
};

const AR_MESSAGES: DataRequestMessages = {
  ...EN_MESSAGES,
  description:
    'إذا كنت بحاجة إلى تعديل أو حذف المعلومات المسجلة في K-DOC (المستشفى/الطبيب/المراجعة)، يرجى تعبئة النموذج أدناه وإرساله.\nسنقوم بالمراجعة واتخاذ الإجراء اللازم.',
  namePlaceholder: 'أدخل الاسم',
  phonePlaceholder: 'أدخل رقم الهاتف',
  emailPlaceholder: 'أدخل البريد الإلكتروني',
  contentLabel: 'محتوى التعديل/الحذف',
  contentPlaceholder: 'يرجى وصف ما يجب تعديله أو حذفه',
  fileLabel: 'إرفاق ملفات',
  fileGuide: 'يمكنك رفع حتى 10 ملفات.\nالحد الأقصى لحجم الملف 10 MB.',
  addFile: 'إضافة ملف',
  privacyLabel: 'إشعار جمع واستخدام المعلومات الشخصية',
  privacyText: 'لمعالجة طلبك، نقوم بجمع واستخدام المعلومات الشخصية وفقًا للأنظمة ذات الصلة.',
  submit: 'إرسال',
  success: 'تم إرسال طلبك بنجاح.',
};

const RU_MESSAGES: DataRequestMessages = {
  ...EN_MESSAGES,
  description:
    'Если требуется изменить или удалить информацию, размещённую в K-DOC (клиника/врач/отзыв), заполните форму ниже и отправьте её.\nПосле проверки мы предпримем необходимые действия.',
  namePlaceholder: 'Введите имя',
  phonePlaceholder: 'Введите номер телефона',
  emailPlaceholder: 'Введите email',
  contentLabel: 'Содержание изменения/удаления',
  contentPlaceholder: 'Опишите, что нужно изменить или удалить',
  fileLabel: 'Вложение файлов',
  fileGuide: 'Можно загрузить до 10 файлов.\nМаксимальный размер одного файла — 10 MB.',
  addFile: 'Добавить файл',
  privacyLabel: 'Сбор и использование персональных данных',
  privacyText:
    'Для обработки запроса мы собираем и используем персональные данные в соответствии с законом.',
  submit: 'Отправить',
  success: 'Ваш запрос успешно отправлен.',
};

function messagesByLocale(locale: Locale): DataRequestMessages {
  const byLocale: Record<Locale, DataRequestMessages> = {
    ko: KO_MESSAGES,
    en: EN_MESSAGES,
    th: TH_MESSAGES,
    'zh-Hant': ZH_HANT_MESSAGES,
    ja: JA_MESSAGES,
    hi: HI_MESSAGES,
    tl: TL_MESSAGES,
    ar: AR_MESSAGES,
    ru: RU_MESSAGES,
  };
  return byLocale[locale];
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function DataRequestContent({ lang, dict }: DataRequestContentProps) {
  const i18n = useMemo(() => messagesByLocale(lang), [lang]);
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
  const [requestType, setRequestType] = useState<'UPDATE' | 'DELETE' | ''>('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormReady =
    requestType &&
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

    if (!requestType) nextErrors.requestType = i18n.errors.requiredRequestType;
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
          requestType,
        }),
      });

      if (!response.ok) {
        throw new Error('Submit failed');
      }

      alert(i18n.success);
      setRequestType('');
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
          <div className='flex w-full flex-col gap-2'>
            <p className='text-base leading-6 font-semibold text-neutral-700'>
              {i18n.requestTypeLabel} <span className='text-[#f31110]'>*</span>
            </p>
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value as 'UPDATE' | 'DELETE' | '')}
              className='h-[52px] rounded-xl border border-neutral-400 bg-white px-4 text-sm text-neutral-700'
            >
              <option value=''>{i18n.requestTypePlaceholder}</option>
              <option value='UPDATE'>{i18n.requestTypeUpdate}</option>
              <option value='DELETE'>{i18n.requestTypeDelete}</option>
            </select>
            {errors.requestType ? <p className='text-xs text-[#f31110]'>{errors.requestType}</p> : null}
          </div>

          <InputFieldV2
            label={dict.support?.form?.name?.label || 'Name'}
            required
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={i18n.namePlaceholder}
            error={errors.name}
          />
          <div className='flex w-full flex-col gap-2'>
            <p className='text-base leading-6 font-semibold text-neutral-700'>
              {dict.consultation?.request?.form?.phoneNumber?.label || 'Phone Number'}{' '}
              <span className='text-[#f31110]'>*</span>
            </p>
            <div className='flex gap-2'>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className='h-[52px] min-w-[80px] rounded-xl border border-neutral-400 bg-white px-3 text-sm text-neutral-700'
              >
                {countryOptions.map((option) => (
                  <option key={option.key} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                type='tel'
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder={i18n.phonePlaceholder}
                className='h-[52px] flex-1 rounded-xl border border-neutral-400 bg-white px-4 text-sm text-neutral-700 placeholder:text-neutral-400'
              />
            </div>
            {errors.phone ? <p className='text-xs text-[#f31110]'>{errors.phone}</p> : null}
          </div>
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

          <div className='space-y-3'>
            <p className='text-base leading-6 font-semibold text-neutral-700'>{i18n.fileLabel}</p>
            <p className='whitespace-pre-line text-sm leading-5 text-neutral-500'>{i18n.fileGuide}</p>
            {uploadedFiles.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {uploadedFiles.map((file) => (
                  <button
                    key={file.url}
                    type='button'
                    onClick={() =>
                      setUploadedFiles((prev) => prev.filter((item) => item.url !== file.url))
                    }
                    className='inline-flex items-center gap-1 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-700'
                  >
                    <span className='max-w-[140px] truncate'>{file.name}</span>
                    <Image src='/icons/file-remove.svg' alt='' aria-hidden width={20} height={20} />
                  </button>
                ))}
              </div>
            ) : null}
            <label className='inline-flex h-11 cursor-pointer items-center gap-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-sub-900'>
              <Image src='/icons/file-add.svg' alt='' aria-hidden width={20} height={20} />
              <span>{isUploading ? i18n.uploading : i18n.addFile}</span>
              <input
                type='file'
                accept={getAcceptString()}
                className='hidden'
                onChange={async (e) => {
                  const input = e.currentTarget;
                  const file = input.files?.[0];
                  if (file) await uploadFile(file);
                  input.value = '';
                }}
                disabled={isUploading || uploadedFiles.length >= 10}
              />
            </label>
          </div>

          <div>
            <p className='mb-2 text-base leading-6 font-semibold text-neutral-700'>
              {i18n.privacyLabel} <span className='text-[#f31110]'>*</span>
            </p>
            <label className='flex items-start gap-2 rounded-lg'>
              <input
                type='checkbox'
                checked={privacyAgreed}
                onChange={(e) => setPrivacyAgreed(e.target.checked)}
                className='sr-only'
              />
              <span
                aria-hidden
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${
                  privacyAgreed ? 'border-[#7657ff] bg-[#7657ff]' : 'border-neutral-300 bg-white'
                }`}
              >
                {privacyAgreed ? <Check className='h-3.5 w-3.5 text-white' /> : null}
              </span>
              <span className='text-sm leading-5 text-neutral-500'>{i18n.privacyText}</span>
            </label>
            {errors.privacy ? <p className='mt-2 text-xs text-[#f31110]'>{errors.privacy}</p> : null}
          </div>
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
