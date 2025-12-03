interface HospitalCardV2PriceProps {
  price: string;
}

export function HospitalCardV2Price({ price }: HospitalCardV2PriceProps) {
  if (!price) return null;

  return (
    <p className='relative min-w-full shrink-0 text-lg leading-7 font-semibold whitespace-pre-wrap text-neutral-700'>
      {price}
    </p>
  );
}
