import { type Dictionary } from 'shared/model/types';
import { GlassCard } from 'shared/ui/glass-card';

interface AboutDescriptionProps {
  dict: Dictionary;
}

export function AboutDescription({ dict }: AboutDescriptionProps) {
  return (
    <div className='-mt-30'>
      <GlassCard>
        <p className='text-sm leading-5 font-normal text-[#525252]'>
          {dict.about.description.part1}
          <span className='font-bold'>{dict.about.description.highlight}</span>
          {dict.about.description.part2}
        </p>
      </GlassCard>
    </div>
  );
}
