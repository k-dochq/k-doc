'use client';

import { forwardRef } from 'react';

interface ImageUploadInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const ImageUploadInput = forwardRef<HTMLInputElement, ImageUploadInputProps>(
  ({ onChange, disabled = false }, ref) => {
    return (
      <input
        ref={ref}
        type='file'
        accept='image/*'
        onChange={onChange}
        className='hidden'
        disabled={disabled}
      />
    );
  },
);

ImageUploadInput.displayName = 'ImageUploadInput';
