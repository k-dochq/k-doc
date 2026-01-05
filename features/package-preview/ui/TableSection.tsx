import { TableImageWithButtonSection } from './TableImageWithButtonSection';
import { type Locale } from 'shared/config';

interface TableSectionProps {
  tableImageSrc: string;
  tableImageAlt: string;
  buttonText: string;
  locale: Locale;
  bubbleText: string;
}

export function TableSection({
  tableImageSrc,
  tableImageAlt,
  buttonText,
  locale,
  bubbleText,
}: TableSectionProps) {
  return (
    <TableImageWithButtonSection
      imageSrc={tableImageSrc}
      imageAlt={tableImageAlt}
      buttonText={buttonText}
      locale={locale}
      bubbleText={bubbleText}
    />
  );
}
