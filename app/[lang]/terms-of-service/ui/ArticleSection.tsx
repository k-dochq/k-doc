import { type Dictionary } from 'shared/model/types';

interface ArticleSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ArticleSection({ title, children }: ArticleSectionProps) {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-semibold text-neutral-700'>{title}</h2>
      {children}
    </div>
  );
}
