const GOLD_GRADIENT =
  'linear-gradient(97.94deg, rgb(226, 195, 99) 9.2%, rgb(249, 227, 160) 11.93%, rgb(226, 195, 99) 26.56%, rgb(249, 227, 160) 43.4%, rgb(226, 195, 99) 58.73%, rgb(249, 227, 160) 75.83%, rgb(226, 195, 99) 101.18%)';

export function ConciergeHeroTitle() {
  return (
    <div className='relative w-full' style={{ height: '185px' }}>
      {/* Choose - y:16 */}
      <p
        className='absolute left-0 right-0 text-center text-[52px] leading-[1.2] tracking-[-0.52px] text-white'
        style={{ top: '16px', fontFamily: 'var(--font-high-summit)' }}
      >
        Choose
      </p>

      {/* Your Concierge Experience - y:55, overlaps with Choose */}
      <div
        className='absolute left-0 right-0 bg-clip-text text-center text-[50px] leading-[0.86] tracking-[-0.5px] text-transparent'
        style={{
          top: '55px',
          fontFamily: 'var(--font-dm-serif-text)',
          backgroundImage: GOLD_GRADIENT,
        }}
      >
        <p className='mb-0'>Your Concierge</p>
        <p>Experience</p>
      </div>

      {/* FREE CONSULTATION - y:165 (24px below Your Concierge) */}
      <p
        className='absolute left-0 right-0 text-center text-[17px] font-medium leading-[1.2] tracking-[-0.34px] text-white'
        style={{ top: '165px' }}
      >
        FREE CONSULTATION & RESERVATION
      </p>
    </div>
  );
}
