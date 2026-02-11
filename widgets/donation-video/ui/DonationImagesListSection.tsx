'use client';

export interface DonationImagesListSectionProps {
  list1ImageSrcs: string[];
  list2ImageSrcs: string[];
  className?: string;
}

export function DonationImagesListSection({
  list1ImageSrcs,
  list2ImageSrcs,
  className = '',
}: DonationImagesListSectionProps) {
  const duplicatedList1 = [...list1ImageSrcs, ...list1ImageSrcs];
  const duplicatedList2 = [...list2ImageSrcs, ...list2ImageSrcs];

  return (
    <section className={`relative w-full flex flex-col gap-[20px] pb-[120px] bg-[#E2F3FF] ${className}`}>
      {/* list_1: scroll left */}
      <div className='overflow-hidden'>
        <div
          className="flex flex-nowrap gap-[20px] w-max animate-scroll-left"
          style={{ willChange: 'transform' }}
        >
          {duplicatedList1.map((src, index) => (
            <img
              key={`list1-${index}`}
              src={src}
              alt={`Donation list 1 image ${(index % list1ImageSrcs.length) + 1}`}
              className="shrink-0 w-[245px] h-auto object-cover"
            />
          ))}
        </div>
      </div>
      {/* list_2: scroll right */}
      <div className='overflow-hidden'>
        <div
          className="flex flex-nowrap gap-[20px] w-max animate-scroll-right"
          style={{ willChange: 'transform' }}
        >
          {duplicatedList2.map((src, index) => (
            <img
              key={`list2-${index}`}
              src={src}
              alt={`Donation list 2 image ${(index % list2ImageSrcs.length) + 1}`}
              className="shrink-0 w-[245px] h-auto object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
