import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type RecommendedTipArticle } from '../../model/useTipDetail';
import { RecommendedTipCard } from './RecommendedTipCard';

interface RecommendedTipsSectionProps {
  articles: RecommendedTipArticle[];
  lang: Locale;
  dict: Dictionary;
}

export function RecommendedTipsSection({
  articles,
  lang,
  dict,
}: RecommendedTipsSectionProps) {
  if (articles.length === 0) return null;

  return (
    <section
      className='-mx-5 px-5 pt-8 pb-[80px]'
      style={{ background: '#F1EEFF' }}
    >
      <h2 className='text-2xl leading-8 font-semibold text-neutral-700'>
        {dict.tips?.recommendedArticlesTitle ?? "Don't Miss These Articles"}
      </h2>
      <div className='mt-4 flex flex-col gap-4'>
        {articles.map((article) => (
          <RecommendedTipCard key={article.id} article={article} lang={lang} />
        ))}
      </div>
    </section>
  );
}
