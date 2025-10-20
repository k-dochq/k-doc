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
      if (!supabase) {
        console.error('Supabase client 생성 실패');
        return;
      }

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
      {/* 계정 타이틀과 회원탈퇴 버튼을 같은 라인에 배치 */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-gray-900'>{dict.my?.account?.title || '계정'}</h2>

        {/* 회원탈퇴 - 텍스트만 클릭 가능 */}
        <div className='flex items-center'>
          <button
            type='button'
            onClick={handleDeleteAccount}
            disabled={isLoading}
            className='text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-700 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {dict.my?.account?.deleteAccount || '회원탈퇴'}
          </button>
          {isLoading && (
            <div className='ml-2 h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600'></div>
          )}
        </div>
      </div>

      <div className='flex w-full flex-col gap-3'>
        <MenuItem
          title={dict.my?.account?.logout || '로그아웃'}
          onClick={handleLogout}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
