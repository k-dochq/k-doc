'use client';

import { type Dictionary } from 'shared/model/types';
import { resolveDrawer } from 'shared/lib/drawer';

export type ProfileImageActionSheetResult = 'album' | 'delete';

interface ProfileImageActionSheetProps {
  dict: Dictionary;
  canDelete: boolean;
}

export function ProfileImageActionSheet({ dict, canDelete }: ProfileImageActionSheetProps) {
  const menu = dict.my?.profile?.imageMenu;
  const albumLabel = menu?.pickFromAlbum ?? 'Choose from Library';
  const deleteLabel = menu?.delete ?? 'Delete Profile Photo';
  const cancelLabel = menu?.cancel ?? dict.common?.cancel ?? 'Cancel';

  const handleAlbum = () => {
    resolveDrawer<ProfileImageActionSheetResult>('album');
  };

  const handleDelete = () => {
    resolveDrawer<ProfileImageActionSheetResult>('delete');
  };

  const handleCancel = () => {
    resolveDrawer();
  };

  return (
    <div className='w-full bg-white px-5 pt-0 pb-10'>
      <button
        type='button'
        onClick={handleAlbum}
        className='relative flex h-14 w-full items-center justify-center border-t-0 border-r-0 border-b border-l-0 border-solid border-neutral-200'
      >
        <p className='text-base leading-6 font-medium text-neutral-700'>{albumLabel}</p>
      </button>

      {canDelete && (
        <button
          type='button'
          onClick={handleDelete}
          className='relative flex h-14 w-full items-center justify-center border-t-0 border-r-0 border-b border-l-0 border-solid border-neutral-200'
        >
          <p className='text-base leading-6 font-medium text-neutral-700'>{deleteLabel}</p>
        </button>
      )}

      <button
        type='button'
        onClick={handleCancel}
        className='flex h-14 w-full items-center justify-center px-5'
      >
        <p className='text-base leading-6 font-medium text-neutral-400'>{cancelLabel}</p>
      </button>
    </div>
  );
}
