import { type Dictionary } from 'shared/model/types';

interface TipsErrorStateProps {
  dict: Dictionary;
}

export function TipsErrorState({ dict }: TipsErrorStateProps) {
  return (
    <div className='py-12 text-center text-sm text-neutral-400'>
      {dict.tips?.error ?? 'Unable to load data.'}
    </div>
  );
}
