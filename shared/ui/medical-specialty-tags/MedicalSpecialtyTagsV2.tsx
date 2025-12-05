import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { MedicalSpecialtyTagV2 } from './MedicalSpecialtyTagV2';

interface MedicalSpecialty {
  id: string;
  name: any; // Prisma.JsonValue
}

interface MedicalSpecialtyTagsV2Props {
  specialties: MedicalSpecialty[];
  lang: Locale;
  maxDisplay?: number;
  className?: string;
  tagClassName?: string;
}

/**
 * 진료부위 태그 목록 컴포넌트 V2
 * HospitalCardV2CategoryTag와 동일한 스타일
 */
export function MedicalSpecialtyTagsV2({
  specialties,
  lang,
  maxDisplay,
  className = '',
  tagClassName = '',
}: MedicalSpecialtyTagsV2Props) {
  if (!specialties || specialties.length === 0) {
    return null;
  }

  const displaySpecialties = maxDisplay ? specialties.slice(0, maxDisplay) : specialties;
  const remainingCount =
    maxDisplay && specialties.length > maxDisplay ? specialties.length - maxDisplay : 0;

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {displaySpecialties.map((specialty) => {
        const specialtyName = extractLocalizedText(specialty.name, lang) || '';
        return (
          <MedicalSpecialtyTagV2 key={specialty.id} name={specialtyName} className={tagClassName} />
        );
      })}
      {remainingCount > 0 && (
        <MedicalSpecialtyTagV2 name={`+${remainingCount}`} className={tagClassName} />
      )}
    </div>
  );
}
