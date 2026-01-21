'use client';

import { Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useAuth } from 'shared/lib/auth/useAuth';
import { isKdocEmployeeEmail } from 'shared/lib/auth/korea-access';
import { Dialog, DialogContent } from 'shared/ui/dialog';

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
    <Dialog open={shouldShow} onOpenChange={() => undefined}>
      <DialogContent
        className='w-[calc(100vw-60px)] max-w-[calc(500px-60px)] border-none bg-transparent p-0 shadow-none'
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className='flex w-full flex-col items-center gap-8 overflow-hidden rounded-xl bg-white px-5 pt-10 pb-5 text-center'>
          <div className='flex w-full flex-col items-center gap-3'>
            <div className='w-full text-center text-[18px] leading-7 font-bold text-[#404040]'>
              <p>본 서비스는 한국 버전을</p>
              <p>제공하지 않습니다.</p>
            </div>
            <p className='w-full text-center text-[16px] leading-6 font-normal text-[#737373]'>
              K-DOC는 해외 이용자를 위한 서비스입니다. 글로벌 서비스로 계속 이용해 주세요.
            </p>
          </div>

          <button
            type='button'
            onClick={handleGoGlobal}
            className='flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#7657FF] px-5 py-4 text-[16px] leading-6 font-medium text-white'
          >
            <Home className='h-5 w-5' />
            글로벌 서비스로 이동
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

