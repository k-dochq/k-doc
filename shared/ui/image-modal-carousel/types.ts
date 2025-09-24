export interface ImageModalItem {
  id: string;
  imageUrl: string;
  alt?: string | null;
  title?: string;
  description?: string;
}

export interface ImageModalCarouselProps {
  images: ImageModalItem[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  centerText?: string;
  backgroundColor?: string;
  onIndexChange?: (index: number) => void;
}
