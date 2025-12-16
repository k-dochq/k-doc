'use client';

interface FieldErrorProps {
  message?: string;
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return <p className='text-sm leading-5 text-[#f31110]'>{message}</p>;
}
