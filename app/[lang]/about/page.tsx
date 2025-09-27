import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getDictionary } from '../dictionaries';
import Image from 'next/image';
import { GlassCard } from 'shared/ui/glass-card';

interface AboutPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // 언어별 이미지 경로 설정
  const getImageSrc = (locale: Locale) => {
    switch (locale) {
      case 'ko':
        return '/images/k-doc_make_kr.png';
      case 'en':
        return '/images/k-doc_make_en.png';
      case 'th':
        return '/images/k-doc_make_th.png';
      default:
        return '/images/k-doc_make_kr.png';
    }
  };

  return (
    <div className='px-5 pt-12 pb-20'>
      <h1 className='text-primary text-5xl font-bold'>{dict.about.title}</h1>
      <div className='mt-8'>
        <h2 className='text-primary text-2xl font-bold'>{dict.about.subtitle}</h2>
      </div>
      <div className='md:mt-8'>
        <Image
          src={getImageSrc(lang)}
          alt={dict.about.subtitle}
          width={468}
          height={387}
          className='h-[387px] w-full max-w-[468px] object-contain'
          priority
        />
      </div>
      <div className='-mt-30'>
        <GlassCard>
          <p className='text-sm leading-5 font-normal text-[#525252]'>
            {dict.about.description.part1}
            <span className='font-bold'>{dict.about.description.highlight}</span>
            {dict.about.description.part2}
          </p>
        </GlassCard>
      </div>

      {/* CEO 인사말 섹션 */}
      <div className='mt-12'>
        <h2 className='text-primary text-2xl font-bold'>{dict.about.ceoGreeting.title}</h2>
        <div className='mt-6'>
          <GlassCard>
            <div className='space-y-3'>
              <h3 className='text-2xl leading-8 font-semibold text-[#737373]'>
                {dict.about.ceoGreeting.name}
              </h3>
              <div className='space-y-3'>
                <div className='space-y-0'>
                  <p className='text-xl leading-7 font-bold text-[#DA47EF]'>
                    {dict.about.ceoGreeting.greeting}
                  </p>
                  <p className='text-xl leading-7 font-bold text-[#DA47EF]'>
                    {dict.about.ceoGreeting.content[0]}
                  </p>
                </div>
                {dict.about.ceoGreeting.content.slice(1).map((paragraph, index) => (
                  <p key={index + 1} className='text-sm leading-5 font-normal text-[#525252]'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* 서울 지사 섹션 */}
      <div className='mt-12'>
        <h2 className='text-primary text-2xl font-bold'>{dict.about.seoulOffice.title}</h2>
        <div className='mt-2'>
          <p className='text-sm leading-5 font-normal text-[#525252]'>
            {dict.about.seoulOffice.description}
          </p>
        </div>
        <div className='mt-6'>
          <Image
            src='/images/building.png'
            alt={dict.about.seoulOffice.title}
            width={335}
            height={446}
            className='w-full object-contain'
            priority
          />
        </div>
      </div>

      {/* K-DOC 비전 섹션 */}
      <div className='mt-12'>
        <h2 className='text-primary text-2xl font-bold'>{dict.about.vision.title}</h2>
        <div className='mt-6 space-y-6'>
          {dict.about.vision.sections.map((section, index) => (
            <div key={index}>
              <GlassCard>
                <div className='space-y-4'>
                  <div className='relative h-[224px] w-full overflow-hidden rounded-xl md:h-[316px]'>
                    <Image
                      src={`/images/${section.image}`}
                      alt={section.title}
                      fill
                      className='rounded-xl object-contain md:hidden'
                      priority
                    />
                    <Image
                      src={`/images/${section.imagePc}`}
                      alt={section.title}
                      fill
                      className='hidden rounded-xl object-contain md:block'
                      priority
                    />
                  </div>
                  <div>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-5 w-5 flex-col items-center justify-center rounded-full bg-[#DA47EF] px-1.5'>
                        <span className='text-sm leading-5 font-semibold text-[#FCE4FF]'>
                          {index + 1}
                        </span>
                      </div>
                      <h3 className='text-lg leading-7 font-semibold text-[#525252]'>
                        {section.title}
                      </h3>
                    </div>
                    {section.description && (
                      <p className='mt-1 ml-8 text-sm leading-5 font-normal whitespace-pre-line text-[#525252]'>
                        {section.description}
                      </p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
