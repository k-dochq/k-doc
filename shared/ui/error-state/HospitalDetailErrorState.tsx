interface HospitalDetailErrorStateProps {
  className?: string;
}

export function HospitalDetailErrorState({ className = '' }: HospitalDetailErrorStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-gradient-to-b from-[#FE906C] to-[#FF6CA5] py-12 ${className}`}
    >
      <div className='text-center'>
        <h2 className='mb-2 text-lg font-medium text-gray-900'>
          병원 정보를 불러오는 중 오류가 발생했습니다
        </h2>
        <p className='text-gray-500'>잠시 후 다시 시도해주세요.</p>
      </div>
    </div>
  );
}
