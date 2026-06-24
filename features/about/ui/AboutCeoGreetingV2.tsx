import { type Dictionary } from 'shared/model/types';
import { splitCeoGreetingContent } from '../lib/ceo-greeting-content';

interface AboutCeoGreetingV2Props {
  dict: Dictionary;
}

export function AboutCeoGreetingV2({ dict }: AboutCeoGreetingV2Props) {
  const { title, name, greeting, content } = dict.about.ceoGreeting;
  const { intro } = splitCeoGreetingContent(content);

  // intro[0]: 첫 인사 문단 (greeting과 합쳐 표시)
  // intro[1..]: 도입부 본문
  // 마무리(content[3..])는 AboutSeoulOfficeV2에서 이어서 렌더한다.
  const firstParagraph = `${greeting} ${intro[0]}`;
  const introParagraphs = intro.slice(1);

  return (
    <div className='flex flex-col gap-6 px-5 pt-14'>
      {/* 섹션 레이블 */}
      <p className='text-base font-bold leading-6 text-neutral-400'>{title}</p>

      {/* 내용 영역 */}
      <div className='flex flex-col gap-3'>
        {/* 이름 */}
        <p className='text-2xl font-bold leading-8 text-neutral-700'>{name}</p>

        {/* 첫 번째 문단 (인사 + 감사 인사) */}
        <p className='text-base font-normal leading-6 text-neutral-500'>{firstParagraph}</p>

        {/* 도입부 본문 문단들 */}
        {introParagraphs.map((paragraph, index) => (
          <p key={index} className='text-base font-normal leading-6 text-neutral-500'>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
