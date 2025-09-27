import { type Dictionary } from 'shared/model/types';

interface ContactHeroProps {
  dict: Dictionary;
}

export function ContactHero({ dict }: ContactHeroProps) {
  return (
    <>
      <h1 className='text-primary text-5xl font-bold'>{dict.contact.title}</h1>
      <div className='mt-8'>
        <h2 className='text-primary text-2xl font-bold'>{dict.contact.subtitle}</h2>
      </div>
    </>
  );
}
