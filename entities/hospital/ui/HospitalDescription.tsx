interface HospitalDescriptionProps {
  description?: string;
}

export function HospitalDescription({ description }: HospitalDescriptionProps) {
  if (!description) {
    return null;
  }

  return (
    <div className='mb-6'>
      <h3 className='mb-2 text-lg font-semibold text-gray-900'>병원 소개</h3>
      <p className='leading-relaxed whitespace-pre-line text-gray-700'>{description}</p>
    </div>
  );
}
