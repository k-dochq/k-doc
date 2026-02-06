'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useAuth } from 'shared/lib/auth/useAuth';
import { isKdocEmployeeEmail } from 'shared/lib/auth/korea-access';

export function KoreaGateModal() {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  const shouldShow = useMemo(() => {
    const safePathname = pathname ?? '';
    const isKoPath = safePathname === '/ko' || safePathname.startsWith('/ko/');
    if (!isKoPath) return false;
    if (isLoading) return false; // 허용 계정일 수 있어 플래시 방지
    return !isKdocEmployeeEmail(user?.email);
  }, [pathname, isLoading, user?.email]);

  const handleGoGlobal = () => {
    // hard navigation (요구사항)
    window.location.href = '/en';
  };

  return (
    <DialogPrimitive.Root open={shouldShow} onOpenChange={() => undefined}>
      <DialogPrimitive.Portal>
        {/* Korea gate 모달에서만 배경을 흰색으로 완전히 덮음 */}
        <DialogPrimitive.Overlay className='fixed inset-0 z-[70] bg-white' />

        <DialogPrimitive.Content
          className='fixed top-[50%] left-[50%] z-[70] w-[calc(100vw-60px)] max-w-[calc(500px-60px)] translate-x-[-50%] translate-y-[-50%] border-none bg-transparent p-0 shadow-none'
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <div className='flex w-full flex-col items-center gap-8 overflow-hidden rounded-xl bg-white px-5 pt-10 pb-5 text-center'>
          <div className='flex w-full flex-col items-center gap-3'>
            <div className='w-full text-center text-[18px] leading-7 font-bold text-[#404040]'>
              <p>The Korean version of</p>
              <p>this service is not available.</p>
            </div>
            <p className='w-full text-center text-[16px] leading-6 font-normal text-[#737373]'>
              <span className='block'>K-DOC is intended for international users.</span>
              <span className='block'>Please continue using our global service.</span>
            </p>
          </div>

          <button
            type='button'
            onClick={handleGoGlobal}
            className='flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#7657FF] px-5 py-4 text-[16px] leading-6 font-medium text-white'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
              aria-hidden='true'
              focusable='false'
            >
              <path
                d='M16.5833 16.5833V7.08333L8.66667 0.75L0.75 7.08333V16.5833H6.29167V10.25H11.0417V16.5833H16.5833Z'
                stroke='white'
                strokeWidth='1.5'
                strokeLinejoin='round'
              />
            </svg>
            Go to Global Service
          </button>
        </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

