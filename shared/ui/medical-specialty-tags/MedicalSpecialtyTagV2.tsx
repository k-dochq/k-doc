interface MedicalSpecialtyTagV2Props {
  name: string;
  className?: string;
}

/**
 * 진료부위 태그 컴포넌트 V2
 * HospitalCardV2CategoryTag와 동일한 스타일
 */
export function MedicalSpecialtyTagV2({ name, className = '' }: MedicalSpecialtyTagV2Props) {
  return (
    <div
      className={`flex min-w-[30px] shrink-0 items-center justify-center gap-[10px] rounded-full px-1.5 py-0.5 ${className}`}
      style={{
        background: 'linear-gradient(92deg, #3E57E2 6.05%, #B133FF 43.63%, #FF5DCA 100%)',
      }}
    >
      <p className='relative shrink-0 text-xs leading-4 font-medium text-white' title={name}>
        {name}
      </p>
    </div>
  );
}
