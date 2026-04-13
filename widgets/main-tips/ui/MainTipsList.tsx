'use client';

import { type Locale } from 'shared/config';
import { useTipsList } from 'entities/tip/model/useTipsList';
import { TipArticleCard } from 'entities/tip/ui/TipArticleCard';
import { TipArticleCardSkeletonList } from 'entities/tip/ui/TipArticleCardSkeleton';

interface MainTipsListProps {
  lang: Locale;
}

export function MainTipsList({ lang }: MainTipsListProps) {
  const { data, isLoading, isError } = useTipsList({ limit: 3, sort: 'latest' });

  if (isLoading) {
    return <TipArticleCardSkeletonList count={3} />;
  }

  if (isError || !data) {
    return null;
  }

  return (
    <div className='flex flex-col gap-4'>
      {data.map((article) => (
        <TipArticleCard key={article.id} article={article} lang={lang} />
      ))}
    </div>
  );
}
