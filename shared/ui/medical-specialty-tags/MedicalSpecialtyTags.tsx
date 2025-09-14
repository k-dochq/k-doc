import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { MedicalSpecialtyTag } from '../medical-specialty-tag/MedicalSpecialtyTag';

interface MedicalSpecialty {
  id: string;
  name: any; // Prisma.JsonValue
}

interface MedicalSpecialtyTagsProps {
  specialties: MedicalSpecialty[];
  lang: Locale;
  maxDisplay?: number;
  className?: string;
  tagClassName?: string;
}

/**
 * 진료부위 태그 목록 컴포넌트
 */
export function MedicalSpecialtyTags({
  specialties,
  lang,
  maxDisplay,
  className = '',
  tagClassName = '',
}: MedicalSpecialtyTagsProps) {
  if (!specialties || specialties.length === 0) {
    return null;
  }

  const displaySpecialties = maxDisplay ? specialties.slice(0, maxDisplay) : specialties;
  const remainingCount =
    maxDisplay && specialties.length > maxDisplay ? specialties.length - maxDisplay : 0;

  return (
    <div className={`flex gap-1 ${className}`}>
      {displaySpecialties.map((specialty) => {
        const specialtyName = extractLocalizedText(specialty.name, lang) || '';
        return (
          <MedicalSpecialtyTag key={specialty.id} name={specialtyName} className={tagClassName} />
        );
      })}
      {remainingCount > 0 && (
        <MedicalSpecialtyTag name={`+${remainingCount}`} className={tagClassName} />
      )}
    </div>
  );
}
