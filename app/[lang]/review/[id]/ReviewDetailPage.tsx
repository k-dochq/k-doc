import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from 'entities/review/model/types';
import { ReviewDetailContent as ReviewDetailContentComponent } from 'entities/review/ui';

interface ReviewDetailPageProps {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
}

export function ReviewDetailPage({ review, lang, dict }: ReviewDetailPageProps) {
  return <ReviewDetailContentComponent review={review} lang={lang} dict={dict} />;
}
