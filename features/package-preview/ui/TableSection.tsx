import { TableImageWithButtonSection } from './TableImageWithButtonSection';
import { type Locale } from 'shared/config';

interface TableSectionProps {
  tableImageSrc: string;
  tableImageAlt: string;
  buttonText: string;
  locale: Locale;
}

export function TableSection({
  tableImageSrc,
  tableImageAlt,
  buttonText,
  locale,
}: TableSectionProps) {
  return (
    <TableImageWithButtonSection
      imageSrc={tableImageSrc}
      imageAlt={tableImageAlt}
      buttonText={buttonText}
      locale={locale}
    />
  );
}
