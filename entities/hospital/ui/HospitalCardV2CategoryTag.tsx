interface HospitalCardV2CategoryTagProps {
  categoryName: string;
}

export function HospitalCardV2CategoryTag({ categoryName }: HospitalCardV2CategoryTagProps) {
  return (
    <div
      className='flex min-w-[30px] shrink-0 items-center justify-center gap-[10px] rounded-full px-1.5 py-0.5'
      style={{
        background: 'linear-gradient(92deg, #3E57E2 6.05%, #B133FF 43.63%, #FF5DCA 100%)',
      }}
    >
      <p className='relative shrink-0 text-xs leading-4 font-medium text-white'>{categoryName}</p>
    </div>
  );
}
