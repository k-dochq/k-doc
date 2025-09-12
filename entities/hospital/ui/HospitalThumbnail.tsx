interface HospitalThumbnailProps {
  imageUrl: string | null;
  alt?: string;
}

export function HospitalThumbnail({
  imageUrl,
  alt = 'Hospital thumbnail',
}: HospitalThumbnailProps) {
  return (
    <div className='relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg'>
      {imageUrl ? (
        <img src={imageUrl} alt={alt} className='h-full w-full object-cover' />
      ) : (
        <div className='flex h-full w-full items-center justify-center bg-gray-200'>
          <span className='text-xs text-gray-400'>No Image</span>
        </div>
      )}
      {/* HOT 라벨 */}
      <div className='absolute top-2 left-2 rounded bg-pink-500 px-2 py-1 text-xs font-medium text-white'>
        HOT
      </div>
    </div>
  );
}
