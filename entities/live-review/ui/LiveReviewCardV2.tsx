import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getLocalizedTextByLocale, parseLocalizedText } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { type LiveReviewData } from '../api/use-cases/get-live-reviews';
import { LiveReviewCardV2Thumbnail } from './LiveReviewCardV2Thumbnail';
import { LiveReviewCardV2LocationAndHospital } from './LiveReviewCardV2LocationAndHospital';
import { LiveReviewCardV2Content } from './LiveReviewCardV2Content';

interface LiveReviewCardV2Props {
  liveReview: LiveReviewData;
  lang: Locale;
  dict: Dictionary;
}

export function LiveReviewCardV2({ liveReview, lang, dict }: LiveReviewCardV2Props) {
  // 이미지 처리 (첫 번째 이미지 사용)
  const firstImage = liveReview.LiveReviewImage?.[0];
  const imageUrl = firstImage?.imageUrl || null;

  // 다국어 텍스트 추출
  const hospitalName = getLocalizedTextByLocale(parseLocalizedText(liveReview.Hospital.name), lang);
  const content = getLocalizedTextByLocale(parseLocalizedText(liveReview.content), lang);

  // 지역 정보 추출 (displayLocationName이 있으면 사용, 없으면 address 사용)
  const displayLocationName = liveReview.Hospital.displayLocationName
    ? getLocalizedTextByLocale(parseLocalizedText(liveReview.Hospital.displayLocationName), lang)
    : null;
  const address = getLocalizedTextByLocale(parseLocalizedText(liveReview.Hospital.address), lang);
  const location = displayLocationName || address;

  const cardContent = (
    <div className='flex w-full flex-col items-start overflow-clip rounded-xl bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]'>
      {/* 이미지 영역 */}
      <LiveReviewCardV2Thumbnail
        imageUrl={imageUrl}
        alt={firstImage?.alt || hospitalName || 'Live review image'}
      />

      {/* 텍스트 영역 */}
      <div className='flex w-full shrink-0 flex-col gap-0.5 px-5 py-4'>
        {/* 지역 | 병원명 */}
        <LiveReviewCardV2LocationAndHospital
          location={location}
          hospitalName={hospitalName}
          dict={dict}
        />

        {/* 내용 (한줄 넘어가면 ellipsis) */}
        <LiveReviewCardV2Content content={content} lang={lang} />
      </div>
    </div>
  );

  // detailLink가 있으면 링크로 감싸기
  if (liveReview.detailLink) {
    // 외부 링크인 경우
    if (liveReview.detailLink.startsWith('http') || liveReview.detailLink.startsWith('https')) {
      return (
        <a href={liveReview.detailLink} rel='noopener noreferrer' className='block'>
          {cardContent}
        </a>
      );
    }
    // 내부 링크인 경우 (LocaleLink 사용)
    return (
      <LocaleLink href={liveReview.detailLink} locale={lang} className='block'>
        {cardContent}
      </LocaleLink>
    );
  }

  // detailLink가 없으면 그냥 div로 반환
  return cardContent;
}
