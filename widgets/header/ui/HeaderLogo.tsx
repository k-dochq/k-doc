import Image from 'next/image';

interface HeaderLogoProps {
  priority?: boolean;
}

export function HeaderLogo({ priority = true }: HeaderLogoProps) {
  return (
    <div className='flex items-center'>
      <Image
        src='/logo_3d.png'
        alt='K-DOC'
        width={105}
        height={26}
        priority={priority}
      />
    </div>
  );
}
