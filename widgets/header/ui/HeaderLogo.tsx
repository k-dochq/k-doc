import Image from 'next/image';

export function HeaderLogo() {
  return (
    <div className='flex items-center'>
      <Image
        src='/logo_3d.png'
        alt='K-DOC'
        width={105}
        height={26}
        priority
      />
    </div>
  );
}
