import { type Dictionary } from 'shared/model/types';
import { ConciergeFaqItem } from './ConciergeFaqItem';

interface ConciergeFaqProps {
  dict: Dictionary;
}

export function ConciergeFaq({ dict }: ConciergeFaqProps) {
  const items = dict.concierge.faq.items;

  return (
    <section className='flex w-full flex-col items-center gap-6 bg-white pt-12 pb-[120px]'>
      <p className='concierge-title w-full text-center text-[42px] leading-[1.1] text-[#7657ff]'>FAQ</p>
      <div className='w-full border-t border-[#d4d4d4]'>
        {items.map((item, index) => (
          <ConciergeFaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            defaultOpen={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
