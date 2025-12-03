interface LiveReviewCardV2ContentProps {
  content: string;
}

export function LiveReviewCardV2Content({ content }: LiveReviewCardV2ContentProps) {
  return (
    <p className='relative w-full shrink-0 truncate text-base leading-6 font-medium text-neutral-700'>
      {content}
    </p>
  );
}
