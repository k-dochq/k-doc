import { LocaleLink } from 'shared/ui/locale-link';
import { ArrowRightIcon } from 'features/terms-agreement/ui/AgreementIcons';

interface ProfileSectionInfoProps {
  displayName: string;
  displayEmail: string;
  uploadError: Error | null;
}

export function ProfileSectionInfo({
  displayName,
  displayEmail,
  uploadError,
}: ProfileSectionInfoProps) {
  return (
    <LocaleLink href='/my/profile/edit' className='flex min-w-0 flex-1 items-center gap-4'>
      <div className='flex min-w-0 flex-1 flex-col items-start'>
        <p className='w-full text-lg leading-[28px] font-semibold text-neutral-700'>
          {displayName}
        </p>
        <p className='w-full text-sm leading-[20px] font-normal text-neutral-500'>
          {displayEmail}
        </p>
        {uploadError && (
          <p className='mt-1 w-full text-xs text-red-600'>
            {uploadError instanceof Error ? uploadError.message : '업로드에 실패했습니다.'}
          </p>
        )}
      </div>
      <div className='size-[20px] shrink-0 overflow-clip rtl:scale-x-[-1]'>
        <ArrowRightIcon />
      </div>
    </LocaleLink>
  );
}
