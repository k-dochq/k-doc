interface TipCoverImageProps {
  src: string;
  alt: string;
}

export function TipCoverImage({ src, alt }: TipCoverImageProps) {
  return (
    <div className='relative aspect-[335/224] w-full overflow-hidden rounded-xl'>
      <img src={src} alt={alt} className='h-full w-full object-cover' />
    </div>
  );
}
