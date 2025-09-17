'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { MenuItem } from './MenuItem';

interface AccountSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function AccountSection({ lang, dict }: AccountSectionProps) {
  const handleLogout = () => {
    // TODO: 로그아웃 기능 구현
    console.log('로그아웃');
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
