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
  /**
   * (Deprecated) 기존 호출부 호환용. 현재는 제한 로직을 적용하지 않습니다.
   */
  maxDisplay?: number;
  className?: string;
  tagClassName?: string;
  textClassName?: string;
}

/**
 * 진료부위 태그 목록 컴포넌트 V2
 * HospitalCardV2CategoryTag와 동일한 스타일
 */
export function MedicalSpecialtyTagsV2({
  specialties,
  lang,
  maxDisplay: _maxDisplay,
  className = '',
  tagClassName = '',
  textClassName = '',
}: MedicalSpecialtyTagsV2Props) {
  if (!specialties || specialties.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {specialties.map((specialty) => {
        const specialtyName = extractLocalizedText(specialty.name, lang) || '';
        return (
          <MedicalSpecialtyTagV2
            key={specialty.id}
            name={specialtyName}
            className={tagClassName}
            textClassName={textClassName}
          />
        );
      })}
    </div>
  );
}
