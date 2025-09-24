export interface DoctorCareerImage {
  id: string;
  imageUrl: string;
  alt: string | null;
  order: number | null;
}

export interface DoctorCareerImagesCarouselProps {
  images: DoctorCareerImage[];
  lang: 'ko' | 'en' | 'th';
}
