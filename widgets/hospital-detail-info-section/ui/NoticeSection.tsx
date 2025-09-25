import { type NoticeSectionProps } from '../lib/types';

export function NoticeSection({ notice }: NoticeSectionProps) {
  if (!notice) {
    return null;
  }

  return <div className='mt-4 text-xs leading-relaxed text-gray-600'>{notice}</div>;
}
