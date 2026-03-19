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
  /**
   * (Deprecated) 기존 호출부 호환용. 현재는 제한 로직을 적용하지 않습니다.
   */
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
  maxDisplay: _maxDisplay,
  className = '',
  tagClassName = '',
}: MedicalSpecialtyTagsProps) {
  if (!specialties || specialties.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {specialties.map((specialty) => {
        const specialtyName = extractLocalizedText(specialty.name, lang) || '';
        return (
          <MedicalSpecialtyTag key={specialty.id} name={specialtyName} className={tagClassName} />
        );
      })}
    </div>
  );
}
