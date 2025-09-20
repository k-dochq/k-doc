import { type Locale } from 'shared/config/locales';

interface LimousineBannerProps {
  lang: Locale;
}

export function LimousineBanner({ lang }: LimousineBannerProps) {
  // 언어에 따른 이미지 경로 결정
  const getImageSrc = (locale: Locale) => {
    switch (locale) {
      case 'ko':
        return '/images/shared/limousine_ko.png';
      case 'en':
        return '/images/shared/limousine_en.png';
      case 'th':
        return '/images/shared/limousine_th.png';
      default:
        return '/images/shared/limousine_ko.png';
    }
  };

  return (
    <div className='w-full'>
      <img
        src={getImageSrc(lang)}
        alt='Limousine Service'
        style={{ objectFit: 'cover' }}
        className='h-auto w-full'
      />
    </div>
  );
}
