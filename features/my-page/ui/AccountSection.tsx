'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { createClient } from 'shared/lib/supabase/client';
import { useDeleteAccount } from '../model/useDeleteAccount';
import { MenuItem } from './MenuItem';

interface AccountSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function AccountSection({ lang, dict }: AccountSectionProps) {
  const { deleteAccount, isLoading } = useDeleteAccount({
    locale: lang,
    dict,
  });

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

  const handleDeleteAccount = async () => {
    // 사용자 확인
    const confirmed = window.confirm(
      dict.my?.account?.deleteAccountConfirm ||
        '정말로 회원탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    );

    if (!confirmed) {
      return;
    }

    try {
      const result = await deleteAccount();

      if (!result.success && result.error) {
        alert(result.error);
      }
    } catch (error) {
      console.error('회원탈퇴 중 오류가 발생했습니다:', error);
      alert(
        dict.my?.account?.deleteAccountError ||
          '회원탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.',
      );
    }
  };

  return (
    <div className='flex w-full flex-col gap-5'>
      <h2 className='text-lg font-semibold text-gray-900'>{dict.my?.account?.title || '계정'}</h2>

      <div className='flex w-full flex-col gap-3'>
        <MenuItem
          title={dict.my?.account?.logout || '로그아웃'}
          onClick={handleLogout}
          disabled={isLoading}
        />
        <MenuItem
          title={dict.my?.account?.deleteAccount || '회원탈퇴'}
          onClick={handleDeleteAccount}
          isDanger={true}
          loading={isLoading}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
