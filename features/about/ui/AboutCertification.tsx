import { type Dictionary } from 'shared/model/types';
import { GlassCard } from 'shared/ui/glass-card';

interface AboutCertificationProps {
  dict: Dictionary;
}

export function AboutCertification({ dict }: AboutCertificationProps) {
  return (
    <div className='mt-12'>
      <h2 className='text-primary text-2xl font-bold'>{dict.about.certification.title}</h2>
      <div className='mt-6 flex gap-4 justify-center'>
        <div className='w-1/2'>
          <img
            src='/images/about_certificate.png'
            alt='K-DOC Certificate'
            width="300"
            height="200"
            className='w-full h-auto object-contain border border-white rounded-xl shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)]'
          />
          <p className='text-xs font-semibold text-neutral-600 text-left mt-2'>
            {dict.about.certification.certificateLabel}
          </p>
        </div>
        <div className='w-1/2'>
          <img
            src='/images/about_SGI.png'
            alt='K-DOC SGI Certificate'
            width="300"
            height="200"
            className='w-full h-auto object-contain border border-white rounded-xl shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)]'
          />
          <p className='text-xs font-semibold text-neutral-600 text-left mt-2'>
            {dict.about.certification.sgiLabel}
          </p>
        </div>
      </div>
      <div className='mt-4'>
        <GlassCard>
          <div className='text-left'>
            <p 
              className='text-sm font-normal text-[#525252]'
              dangerouslySetInnerHTML={{ __html: dict.about.certification.description }}
            />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
