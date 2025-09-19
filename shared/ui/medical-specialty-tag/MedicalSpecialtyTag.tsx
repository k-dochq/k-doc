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
      className={`flex items-center justify-center gap-2.5 rounded bg-gradient-to-r from-[#C853FF] to-[#5667FF] px-1 py-0.5 ${className}`}
    >
      <span className='text-xs font-medium text-white'>{name}</span>
    </div>
  );
}
