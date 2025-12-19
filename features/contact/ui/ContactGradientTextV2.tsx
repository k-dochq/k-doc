'use client';

export function ContactGradientTextV2() {
  return (
    <div className='mt-8 px-5'>
      <p
        className='text-2xl leading-[32px] font-semibold'
        style={{
          background: 'linear-gradient(90deg, #3E57E2 0%, #B133FF 40%, #FF5DCA 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Get international patients
        <br />
        with the leading medical
        <br />
        tourism platform
      </p>
    </div>
  );
}
