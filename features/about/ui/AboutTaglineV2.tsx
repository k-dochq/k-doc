export function AboutTaglineV2() {
  const taglines = ['Connecting', 'Global Patients', "to Korea's", 'Top 10% Doctors', '& Clinics'];

  return (
    <div className='flex flex-col gap-3 px-5 py-[83px]'>
      {taglines.map((tagline, index) => (
        <p key={index} className='text-4xl font-bold text-neutral-700'>
          {tagline}
        </p>
      ))}
    </div>
  );
}
