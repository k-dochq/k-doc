interface HospitalCardV2PriceProps {
  price: string;
}

export function HospitalCardV2Price({ price }: HospitalCardV2PriceProps) {
  // formatHospitalPrice를 통해 이미 포맷팅된 문자열을 받음
  // 가격이 없으면 "상담 후 협의"가 포함되어 있음
  return (
    <p className='relative min-w-full shrink-0 text-sm leading-7 font-semibold whitespace-pre-wrap text-neutral-700'>
      {price}
    </p>
  );
}
