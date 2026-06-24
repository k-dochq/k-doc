import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { MedicalSpecialtyTagV2 } from './MedicalSpecialtyTagV2';

interface MedicalSpecialty {
  id: string;
  name: any; // Prisma.JsonValue
  specialtyType?: string;
}

interface MedicalSpecialtyTagsV2Props {
  specialties: MedicalSpecialty[];
  lang: Locale;
  /**
   * (Deprecated) 기존 호출부 호환용. 현재는 제한 로직을 적용하지 않습니다.
   */
  maxDisplay?: number;
  /**
   * 카드처럼 좁은 영역에서 카테고리 개수가 임계값(4) 이상일 때
   * 앞 2개만 노출하고 나머지는 "+N" 배지로 표시합니다.
   */
  collapseOverflow?: boolean;
  className?: string;
  tagClassName?: string;
  textClassName?: string;
}

const COLLAPSE_THRESHOLD = 4;
const VISIBLE_WHEN_COLLAPSED = 2;

/** 퀵메뉴에서 숨긴 레거시 카테고리 — 태그로도 노출하지 않음 */
const HIDDEN_SPECIALTY_TYPES = new Set(['LIPOSUCTION', 'BODY', 'ETC']);

/**
 * 진료부위 태그 목록 컴포넌트 V2
 * HospitalCardV2CategoryTag와 동일한 스타일
 */
export function MedicalSpecialtyTagsV2({
  specialties,
  lang,
  maxDisplay: _maxDisplay,
  collapseOverflow = false,
  className = '',
  tagClassName = '',
  textClassName = '',
}: MedicalSpecialtyTagsV2Props) {
  const visibleSpecialtiesByType = specialties.filter(
    (s) => !s.specialtyType || !HIDDEN_SPECIALTY_TYPES.has(s.specialtyType),
  );

  if (!visibleSpecialtiesByType || visibleSpecialtiesByType.length === 0) {
    return null;
  }

  const shouldCollapse = collapseOverflow && visibleSpecialtiesByType.length >= COLLAPSE_THRESHOLD;
  const visibleSpecialties = shouldCollapse
    ? visibleSpecialtiesByType.slice(0, VISIBLE_WHEN_COLLAPSED)
    : visibleSpecialtiesByType;
  const overflowCount = shouldCollapse ? visibleSpecialtiesByType.length - VISIBLE_WHEN_COLLAPSED : 0;

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {visibleSpecialties.map((specialty) => {
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
      {overflowCount > 0 && (
        <MedicalSpecialtyTagV2
          name={`+${overflowCount}`}
          className={tagClassName}
          textClassName={textClassName}
        />
      )}
    </div>
  );
}
