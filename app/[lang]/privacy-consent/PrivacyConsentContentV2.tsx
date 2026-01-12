import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface PrivacyConsentContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

interface TableRow {
  purpose: string;
  items: {
    required?: string;
    optional?: string;
  };
  retentionPeriod: string;
}

export function PrivacyConsentContentV2({ lang: _lang, dict }: PrivacyConsentContentV2Props) {
  const privacyConsent = dict.privacyConsent as
    | {
        title?: string;
        table?: {
          headers?: {
            purpose?: string;
            items?: string;
            retentionPeriod?: string;
          };
          rows?: TableRow[];
        };
        notice?: string;
        tableLabels?: {
          required?: string;
          optional?: string;
        };
      }
    | undefined;

  return (
    <div className='px-5 pt-8 pb-20'>
      <h1 className='mb-8 text-3xl font-semibold text-neutral-700'>
        {privacyConsent?.title || '개인정보 수집/이용 동의'}
      </h1>

      <div className='flex flex-col gap-8'>
        {/* 테이블 */}
        <div className='flex flex-col gap-2 overflow-x-auto'>
          <div className='flex min-w-[600px] flex-col border-t border-neutral-400'>
            {/* 테이블 헤더 */}
            <div className='flex border-b border-neutral-200 bg-neutral-100'>
              <div className='flex w-[100px] shrink-0 items-center px-3 py-4'>
                <p className='text-sm leading-5 font-semibold text-neutral-700'>
                  {privacyConsent?.table?.headers?.purpose || '목적'}
                </p>
              </div>
              <div className='flex w-0 shrink-0 items-center justify-center'>
                <div className='h-full w-px bg-neutral-200' />
              </div>
              <div className='flex flex-1 items-center px-3 py-4'>
                <p className='text-sm leading-5 font-semibold text-neutral-700'>
                  {privacyConsent?.table?.headers?.items || '항목'}
                </p>
              </div>
              <div className='flex w-0 shrink-0 items-center justify-center'>
                <div className='h-full w-px bg-neutral-200' />
              </div>
              <div className='flex w-[90px] shrink-0 items-center px-3 py-4'>
                <p className='text-sm leading-5 font-semibold text-neutral-700'>
                  {privacyConsent?.table?.headers?.retentionPeriod || '보유 및 이용 기간'}
                </p>
              </div>
            </div>

            {/* 테이블 본문 */}
            {privacyConsent?.table?.rows?.map((row, index) => (
              <div key={index} className='flex border-b border-neutral-200'>
                <div className='flex w-[100px] shrink-0 items-center px-3 py-4'>
                  <p className='text-sm leading-5 font-normal text-neutral-500'>{row.purpose}</p>
                </div>
                <div className='flex w-0 shrink-0 items-center justify-center'>
                  <div className='h-full w-px bg-neutral-200' />
                </div>
                <div className='flex flex-1 flex-col items-start px-3 py-4'>
                  {row.items.required && (
                    <p className='text-sm leading-5 font-normal text-neutral-500'>
                      {privacyConsent?.tableLabels?.required || '[필수]'} {row.items.required}
                    </p>
                  )}
                  {row.items.optional && (
                    <p className='text-sm leading-5 font-normal text-neutral-500'>
                      {privacyConsent?.tableLabels?.optional || '[선택]'} {row.items.optional}
                    </p>
                  )}
                </div>
                <div className='flex w-0 shrink-0 items-center justify-center'>
                  <div className='h-full w-px bg-neutral-200' />
                </div>
                <div className='flex w-[90px] shrink-0 items-center px-3 py-4'>
                  <p className='text-sm leading-5 font-normal text-neutral-500'>
                    {row.retentionPeriod}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 안내 문구 */}
        <div className='flex flex-col gap-4'>
          <p className='text-base font-normal text-neutral-700'>
            {privacyConsent?.notice ||
              '위와 같이 개인정보를 수집/이용하는데 동의를 거부할 수 있으며, 동의를 거절하는 경우 서비스 이용이 제한될 수 있습니다.'}
          </p>
        </div>
      </div>
    </div>
  );
}
