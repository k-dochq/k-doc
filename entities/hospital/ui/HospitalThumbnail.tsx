import { HotLabel } from 'shared/ui/hot-label';

interface HospitalThumbnailProps {
  imageUrl: string | null;
  alt?: string;
}

export function HospitalThumbnail({
  imageUrl,
  alt = 'Hospital thumbnail',
}: HospitalThumbnailProps) {
  return (
    <div className='relative h-[120px] w-[120px] flex-shrink-0'>
      {imageUrl ? (
        <img src={imageUrl} alt={alt} className='h-full w-full rounded-lg object-contain' />
      ) : (
        <img
          src='/images/shared/default_image.png'
          alt={alt}
          className='h-full w-full rounded-lg object-fill'
        />
      )}
      <div className='absolute top-[-5px] left-[-5px]'>
        <HotLabel />
      </div>
    </div>
  );
}
