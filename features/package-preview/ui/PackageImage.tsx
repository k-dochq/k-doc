interface PackageImageProps {
  src: string;
  alt: string;
}

export function PackageImage({ src, alt }: PackageImageProps) {
  return <img src={src} alt={alt} className='w-full' />;
}
