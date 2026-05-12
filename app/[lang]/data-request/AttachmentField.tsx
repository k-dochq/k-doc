'use client';

import Image from 'next/image';

interface UploadedFile {
  name: string;
  url: string;
}

interface AttachmentFieldProps {
  label: string;
  guide: string;
  addFileLabel: string;
  uploadingLabel: string;
  isUploading: boolean;
  uploadedFiles: UploadedFile[];
  disabled: boolean;
  onRemove: (url: string) => void;
  onFileSelect: (file: File) => Promise<void>;
  accept: string;
}

export function AttachmentField({
  label,
  guide,
  addFileLabel,
  uploadingLabel,
  isUploading,
  uploadedFiles,
  disabled,
  onRemove,
  onFileSelect,
  accept,
}: AttachmentFieldProps) {
  return (
    <div className='space-y-3'>
      <p className='text-base leading-6 font-semibold text-neutral-700'>{label}</p>
      <p className='whitespace-pre-line text-sm leading-5 text-neutral-500'>{guide}</p>
      {uploadedFiles.length > 0 ? (
        <div className='flex flex-wrap gap-2'>
          {uploadedFiles.map((file) => (
            <button
              key={file.url}
              type='button'
              onClick={() => onRemove(file.url)}
              className='inline-flex items-center gap-1 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-700'
            >
              <span className='max-w-[140px] truncate'>{file.name}</span>
              <Image src='/icons/file-remove.svg' alt='' aria-hidden width={20} height={20} />
            </button>
          ))}
        </div>
      ) : null}
      <label className='inline-flex h-11 cursor-pointer items-center gap-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-primary-900'>
        <Image src='/icons/file-add.svg' alt='' aria-hidden width={20} height={20} />
        <span>{isUploading ? uploadingLabel : addFileLabel}</span>
        <input
          type='file'
          accept={accept}
          className='hidden'
          onChange={async (e) => {
            const input = e.currentTarget;
            const file = input.files?.[0];
            if (file) await onFileSelect(file);
            input.value = '';
          }}
          disabled={disabled}
        />
      </label>
    </div>
  );
}
