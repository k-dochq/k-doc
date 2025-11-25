import { PackageImage } from './PackageImage';

interface ImageItem {
  src: string;
  alt: string;
}

interface PackageImagesProps {
  images: ImageItem[];
}

export function PackageImages({ images }: PackageImagesProps) {
  return (
    <>
      {images.map((image, index) => (
        <PackageImage key={index} src={image.src} alt={image.alt} />
      ))}
    </>
  );
}
