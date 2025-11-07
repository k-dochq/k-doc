import { type ReactNode } from 'react';

interface AlertDialogProps {
  message: string | ReactNode;
  confirmText: string;
  onConfirm: () => void;
}

export function AlertDialog({ message, confirmText = '확인', onConfirm }: AlertDialogProps) {
  return (
    <div className='space-y-4 rounded-lg border bg-white p-6 shadow-lg'>
      <div className='text-sm'>{typeof message === 'string' ? <p>{message}</p> : message}</div>
      <div className='flex justify-end'>
        <button
          onClick={onConfirm}
          className='rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
