import { TipHashtag } from './TipHashtag';

interface TipHashtagListProps {
  hashtags: string[];
}

export function TipHashtagList({ hashtags }: TipHashtagListProps) {
  if (hashtags.length === 0) return null;

  return (
    <div className='flex flex-wrap gap-1.5'>
      {hashtags.map((tag) => (
        <TipHashtag key={tag} tag={tag} />
      ))}
    </div>
  );
}
