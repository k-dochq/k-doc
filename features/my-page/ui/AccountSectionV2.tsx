'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { createClient } from 'shared/lib/supabase/client';
import { useDeleteAccount } from '../model/useDeleteAccount';
import { MenuItemV2 } from './MenuItemV2';

interface AccountSectionV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function AccountSectionV2({ lang, dict }: AccountSectionV2Props) {
  const { deleteAccount, isLoading } = useDeleteAccount({
    locale: lang,
    dict,
  });

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      if (!supabase) {
        console.error('Supabase client creation failed');
        return;
      }

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error during logout:', error);
        return;
      }

      // Redirect to login page after successful logout
      window.location.href = `/${lang}/auth/login`;
    } catch (error) {
      console.error('Unexpected error during logout:', error);
    }
  };

  const handleDeleteAccount = async () => {
    // User confirmation
    const confirmed = window.confirm(
      dict.my?.account?.deleteAccountConfirm ||
        'Are you sure you want to delete your account? This action cannot be undone.',
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
      console.error('Error during account deletion:', error);
      alert(
        dict.my?.account?.deleteAccountError ||
          'An error occurred while deleting your account. Please try again.',
      );
    }
  };

  const title = dict.my?.account?.title || 'Account';
  const logoutLabel = dict.my?.account?.logout || 'Logout';
  const deleteAccountLabel = dict.my?.account?.deleteAccount || 'Delete Account';

  return (
    <div className='flex w-full flex-col'>
      {/* 계정 타이틀과 회원탈퇴 버튼을 같은 라인에 배치 */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-neutral-700'>{title}</h2>

        {/* 회원탈퇴 버튼 */}
        <div className='flex items-center'>
          <button
            type='button'
            onClick={handleDeleteAccount}
            disabled={isLoading}
            className='text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {deleteAccountLabel}
          </button>
          {isLoading && (
            <div className='ml-2 h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600'></div>
          )}
        </div>
      </div>

      <div className='mt-2 flex w-full flex-col'>
        <MenuItemV2 title={logoutLabel} onClick={handleLogout} disabled={isLoading} />
      </div>
    </div>
  );
}
