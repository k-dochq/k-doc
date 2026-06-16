import { type Dictionary } from 'shared/model/types';

interface AboutCeoGreetingV2Props {
  dict: Dictionary;
}

export function AboutCeoGreetingV2({ dict }: AboutCeoGreetingV2Props) {
  const { title, name, greeting, content } = dict.about.ceoGreeting;

  // content 배열 구조:
  // [0]: 첫 번째 인사 문단 (greeting과 합쳐서 표시)
  // [1..n-4]: 본문 문단들
  // [n-3], [n-2]: "GOD BLESS YOU" + "감사합니다." (일반 weight)
  // [n-1], [n]: 서명 두 줄 (semibold)
  const firstParagraph = `${greeting} ${content[0]}`;
  const bodyParagraphs = content.slice(1, -4);
  const closingLine1 = content[content.length - 4];
  const closingLine2 = content[content.length - 3];
  const signatureLine1 = content[content.length - 2];
  const signatureLine2 = content[content.length - 1];

  return (
    <div className='flex flex-col gap-6 px-5 py-14'>
      {/* 섹션 레이블 */}
      <p className='text-base font-bold leading-6 text-neutral-400'>{title}</p>

      {/* 내용 영역 */}
      <div className='flex flex-col gap-3'>
        {/* 이름 */}
        <p className='text-2xl font-bold leading-8 text-neutral-700'>{name}</p>

        {/* 첫 번째 문단 (인사 + 감사 인사) */}
        <p className='text-base font-normal leading-6 text-neutral-500'>{firstParagraph}</p>

        {/* 본문 문단들 */}
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
