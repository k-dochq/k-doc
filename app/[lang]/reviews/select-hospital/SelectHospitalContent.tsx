'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useAuth } from 'shared/lib/auth/useAuth';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { ReservedHospitalsInfiniteList } from './ReservedHospitalsInfiniteList';
import { useEffect } from 'react';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';

interface SelectHospitalContentProps {
  lang: Locale;
  dict: Dictionary;
}

export function SelectHospitalContent({ lang, dict }: SelectHospitalContentProps) {
  const { user, isLoading } = useAuth();
  const router = useLocalizedRouter();

  // 로그인하지 않은 사용자는 로그인 모달 표시 후 리뷰 페이지로 리다이렉트
  useEffect(() => {
    if (!isLoading && !user) {
      openModal({
        content: <LoginRequiredModal lang={lang} dict={dict} redirectPath='/reviews' />,
      });
      router.push('/reviews');
    }
  }, [user, isLoading, lang, dict, router]);

  // 로딩 중이거나 사용자가 없으면 빈 화면
  if (isLoading || !user) {
    return null;
  }

  return (
    <div className=''>
      {/* 병원 리스트 */}
      <ReservedHospitalsInfiniteList lang={lang} dict={dict} />
    </div>
  );
}
