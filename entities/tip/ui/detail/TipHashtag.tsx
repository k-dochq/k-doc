interface TipHashtagProps {
  tag: string;
}

export function TipHashtag({ tag }: TipHashtagProps) {
  return (
    <div className='inline-flex items-center justify-center rounded-lg bg-[#feefff] px-3 py-1.5'>
      <span className='text-sm font-medium leading-5 text-[#f15bff] whitespace-nowrap'>
        #{tag}
      </span>
    </div>
  );
}
