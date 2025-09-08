import Image from 'next/image';

export default function HomePage() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-black text-white'>
      <div className='w-full text-center'>
        <div className='flex items-center justify-center space-x-6'>
          <div className='relative h-32 w-32'>
            <Image src='/kdoc_logo.png' alt='K-DOC Logo' fill className='object-contain' priority />
          </div>
        </div>

        <div className='mt-8 flex justify-center'>
          <div className='relative h-16 w-48'>
            <Image
              src='/coming_soon.png'
              alt='Coming Soon'
              fill
              className='object-contain'
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
