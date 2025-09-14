interface MedicalSpecialtyTagProps {
  name: string;
  className?: string;
}

/**
 * 진료부위 태그 컴포넌트
 */
export function MedicalSpecialtyTag({ name, className = '' }: MedicalSpecialtyTagProps) {
  return (
    <div
      className={`bg-primary-light flex items-center justify-center gap-2.5 rounded px-1 py-0.5 ${className}`}
    >
      <span className='text-primary text-xs font-medium'>{name}</span>
    </div>
  );
}
