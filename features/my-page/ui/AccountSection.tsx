'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { createClient } from 'shared/lib/supabase/client';
import { MenuItem } from './MenuItem';

interface AccountSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function AccountSection({ lang, dict }: AccountSectionProps) {
  const handleLogout = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('로그아웃 중 오류가 발생했습니다:', error);
        return;
      }

      // 로그아웃 성공 후 로그인 페이지로 이동
      window.location.href = `/${lang}/auth/login`;
    } catch (error) {
      console.error('로그아웃 중 예상치 못한 오류가 발생했습니다:', error);
    }
  };

  const handleDeleteAccount = () => {
    // TODO: 회원탈퇴 기능 구현
    console.log('회원탈퇴');
  };

  return (
    <div className='flex w-full flex-col gap-5'>
      <h2 className='text-lg font-semibold text-gray-900'>{dict.my?.account?.title || '계정'}</h2>

      <div className='flex w-full flex-col gap-3'>
        <MenuItem title={dict.my?.account?.logout || '로그아웃'} onClick={handleLogout} />
        <MenuItem
          title={dict.my?.account?.deleteAccount || '회원탈퇴'}
          onClick={handleDeleteAccount}
          isDanger={true}
        />
      </div>
    </div>
  );
}
