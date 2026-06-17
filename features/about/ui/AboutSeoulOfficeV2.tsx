import Image from 'next/image';
import { type Dictionary } from 'shared/model/types';
import { splitCeoGreetingContent } from '../lib/ceo-greeting-content';

interface AboutSeoulOfficeV2Props {
  dict: Dictionary;
}

export function AboutSeoulOfficeV2({ dict }: AboutSeoulOfficeV2Props) {
  const { title, description } = dict.about.seoulOffice;
  const { closing } = splitCeoGreetingContent(dict.about.ceoGreeting.content);

  // closing 구조 (content[3..9]):
  // [0..n-5]: 마무리 본문 문단들
  // [n-4], [n-3]: "GOD BLESS YOU" + "감사합니다." (일반 weight)
  // [n-2], [n-1]: 서명 두 줄 (semibold)
  const bodyParagraphs = closing.slice(0, -4);
  const closingLine1 = closing[closing.length - 4];
  const closingLine2 = closing[closing.length - 3];
  const signatureLine1 = closing[closing.length - 2];
  const signatureLine2 = closing[closing.length - 1];

  return (
    <div className='flex flex-col pt-6 pb-14'>
      {/* 서울 지사 건물 이미지 — 풀폭(여백·라운드 없음), 하단만 살짝 페이드(알파 마스크) */}
      <div
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, #000 82%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, #000 82%, transparent 100%)',
        }}
      >
        <Image
          src='/images/building-office.png'
          alt={title}
          width={1800}
          height={2314}
          className='h-auto w-full object-cover'
        />
      </div>

      {/* 라벨 + 타이틀 — 이미지 하단 페이드 영역에 겹침 */}
      <div className='relative -mt-10 flex flex-col gap-1 px-5'>
        <p className='text-sm font-bold leading-5 text-[#7657ff]'>{title}</p>
        <p className='text-lg font-bold leading-7 whitespace-pre-line text-[#404040]'>
          {description}
        </p>
      </div>

      {/* 마무리 본문 + 맺음말 + 서명 */}
      <div className='mt-6 flex flex-col gap-3 px-5'>
        {bodyParagraphs.map((paragraph, index) => (
          <p key={index} className='text-base font-normal leading-6 text-neutral-500'>
            {paragraph}
          </p>
        ))}

        {/* 맺음말 (GOD BLESS YOU + 감사합니다.) */}
        <div>
          <p className='text-base font-normal leading-6 text-neutral-500'>{closingLine1}</p>
          <p className='text-base font-normal leading-6 text-neutral-500'>{closingLine2}</p>
        </div>

        {/* 서명 */}
        <div>
          <p className='text-base font-semibold leading-6 text-neutral-700'>{signatureLine1}</p>
          <p className='text-base font-semibold leading-6 text-neutral-700'>{signatureLine2}</p>
        </div>
      </div>
    </div>
  );
}
