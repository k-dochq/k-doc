import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from '@prisma/client';

interface ApgujeongMiracleProceduresProps {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
}

/**
 * 압구정 미라클 의원 전용 시술상세 컨텐츠 컴포넌트
 */
export function ApgujeongMiracleProcedures({
  hospital,
  lang,
  dict,
}: ApgujeongMiracleProceduresProps) {
  // 언어별 유튜브 영상 ID
  const getYouTubeVideoId = (language: Locale): string => {
    switch (language) {
      case 'ko':
        return '234LOgm0GWI';
      case 'en':
        return 'SjLkNqmkdNw';
      case 'th':
        return 'X_5yv14dDTo?si=-tk6l7UmsMOPA2Uz';
      default:
        return '234LOgm0GWI'; // 기본값은 한국어
    }
  };

  // 언어별 이미지 경로 선택
  const getMiracleDetailImagePath = (language: Locale): string => {
    switch (language) {
      case 'ko':
        return '/images/hospital-detail/miracle_detail_kr.png';
      case 'en':
        return '/images/hospital-detail/miracle_detail_en.png';
      case 'th':
        return '/images/hospital-detail/miracle_detail_th.png';
      default:
        return '/images/hospital-detail/miracle_detail_kr.png'; // 기본값은 한국어
    }
  };

  const videoId = getYouTubeVideoId(lang);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const miracleImagePath = getMiracleDetailImagePath(lang);

  return (
    <div className='space-y-8'>
      {/* 첫 번째 섹션: 유튜브 영상 */}
      <section className='w-full'>
        <div className='mx-auto'>
          <div className='aspect-video w-full overflow-hidden'>
            <iframe
              width='100%'
              height='100%'
              src={embedUrl}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
              className='h-full w-full'
            />
          </div>
          <p className='mt-4 text-center text-base font-semibold text-white'>
            {dict.hospitalDetailTabs.apgujeongMiracle.videoDescription}
          </p>
        </div>
      </section>

      {/* 두 번째 섹션: 이미지 */}
      <section className='w-full'>
        <div className='mx-auto'>
          <div className='flex w-full justify-center'>
            <img
              src={miracleImagePath}
              alt={dict.hospitalDetailTabs.apgujeongMiracle.imageAlt}
              className='h-auto w-full max-w-[375px] object-contain'
            />
          </div>
        </div>
      </section>
    </div>
  );
}
