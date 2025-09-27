import { type Dictionary } from 'shared/model/types';
import Image from 'next/image';
import { GlassCard } from 'shared/ui/glass-card';

interface AboutVisionProps {
  dict: Dictionary;
}

export function AboutVision({ dict }: AboutVisionProps) {
  return (
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
                    className='rounded-xl object-cover md:hidden'
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
  );
}
