import { type Dictionary } from 'shared/model/types';
import { GlassCard } from 'shared/ui/glass-card';

interface AboutCeoGreetingProps {
  dict: Dictionary;
}

export function AboutCeoGreeting({ dict }: AboutCeoGreetingProps) {
  return (
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
              {dict.about.ceoGreeting.content.slice(1, -4).map((paragraph, index) => (
                <p key={index + 1} className='text-sm leading-5 font-normal text-[#525252]'>
                  {paragraph}
                </p>
              ))}
              <p className='text-sm leading-5 font-normal text-[#525252]'>
                {dict.about.ceoGreeting.content[dict.about.ceoGreeting.content.length - 4]}
                <br />
                {dict.about.ceoGreeting.content[dict.about.ceoGreeting.content.length - 3]}
              </p>
              <p className='text-sm leading-5 font-normal text-[#525252]'>
                {dict.about.ceoGreeting.content[dict.about.ceoGreeting.content.length - 2]}
                <br />
                <span className='font-bold'>
                  {dict.about.ceoGreeting.content[dict.about.ceoGreeting.content.length - 1]}
                </span>
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
