import { ConciergeServiceCard } from './ConciergeServiceCard';

const CARDS = {
  recovery: {
    src: '/images/concierge/section1-card-recovery.jpg',
    line1: 'K-DOC',
    line2: 'Recovery Care',
    overlayGradient:
      'linear-gradient(0deg, #ea4df9 10%, rgba(234, 77, 249, 0.8) 30%, rgba(234, 77, 249, 0) 60%)',
  },
  vip: {
    src: '/images/concierge/section1-card-vip.jpg',
    line1: 'VIP',
    line2: 'Transportation',
    overlayGradient:
      'linear-gradient(0deg, #0fe5e1 10%, rgba(15, 229, 225, 0.8) 30%, rgba(15, 229, 225, 0) 60%)',
  },
  interpreter: {
    src: '/images/concierge/section1-card-interpreter.jpg',
    line1: 'Medical',
    line2: 'Interpreter',
    overlayGradient:
      'linear-gradient(0deg, #e5b62d 10%, rgba(229, 182, 45, 0.8) 30%, rgba(229, 182, 45, 0) 60%)',
  },
} as const;

export function ConciergeHeroCards() {
  return (
    <>
      {/* Left card - K-DOC Recovery Care */}
      <div className='absolute' style={{ left: '20px', top: '254px' }}>
        <ConciergeServiceCard
          src={CARDS.recovery.src}
          alt='K-DOC Recovery Care'
          line1={CARDS.recovery.line1}
          line2={CARDS.recovery.line2}
          overlayGradient={CARDS.recovery.overlayGradient}
          width={126}
          height={134}
        />
      </div>

      {/* Center card - VIP Transportation */}
      <div className='absolute' style={{ left: '98px', top: '225px' }}>
        <ConciergeServiceCard
          src={CARDS.vip.src}
          alt='VIP Transportation'
          line1={CARDS.vip.line1}
          line2={CARDS.vip.line2}
          overlayGradient={CARDS.vip.overlayGradient}
          width={180}
          height={192}
          textSize={22}
          textFromTop={124}
          className='bg-white'
        />
      </div>

      {/* Right card - Medical Interpreter */}
      <div className='absolute' style={{ right: '20px', top: '254px' }}>
        <ConciergeServiceCard
          src={CARDS.interpreter.src}
          alt='Medical Interpreter'
          line1={CARDS.interpreter.line1}
          line2={CARDS.interpreter.line2}
          overlayGradient={CARDS.interpreter.overlayGradient}
          width={126}
          height={134}
        />
      </div>
    </>
  );
}
