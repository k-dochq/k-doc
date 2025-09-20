'use client';

import { confirm, alert, openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';

export function ModalDemo() {
  const handleConfirm = async () => {
    const result = await confirm('정말로 삭제하시겠습니까?');
    console.log('Confirm result:', result);

    if (result) {
      await alert('삭제가 완료되었습니다.');
    }
  };

  const handleConfirmWithOptions = async () => {
    const result = await confirm({
      title: '계정 삭제',
      message: '계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 정말로 계속하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
    });

    console.log('Confirm with options result:', result);
  };

  const handleAlert = async () => {
    await alert({
      title: '알림',
      message: '작업이 성공적으로 완료되었습니다.',
      confirmText: '확인',
    });
  };

  const handleCustomModal = () => {
    openModal({
      title: '커스텀 모달',
      description: '이것은 커스텀 컴포넌트를 포함한 모달입니다.',
      content: (
        <div className='space-y-4'>
          <div className='rounded-lg bg-blue-50 p-4'>
            <h3 className='font-semibold text-blue-900'>커스텀 컨텐츠</h3>
            <p className='text-blue-700'>여기에 원하는 컴포넌트를 넣을 수 있습니다.</p>
          </div>
          <div className='flex space-x-2'>
            <button className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
              액션 1
            </button>
            <button className='rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700'>
              액션 2
            </button>
          </div>
        </div>
      ),
    });
  };

  const handleReactComponentModal = () => {
    const CustomComponent = () => (
      <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='rounded border p-3'>
            <h4 className='font-medium'>옵션 1</h4>
            <p className='text-sm text-gray-600'>첫 번째 옵션입니다.</p>
          </div>
          <div className='rounded border p-3'>
            <h4 className='font-medium'>옵션 2</h4>
            <p className='text-sm text-gray-600'>두 번째 옵션입니다.</p>
          </div>
        </div>
        <div className='flex justify-end space-x-2'>
          <button
            onClick={() => {
              alert('옵션 1이 선택되었습니다.');
            }}
            className='rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700'
          >
            선택
          </button>
        </div>
      </div>
    );

    openModal({
      title: 'React 컴포넌트 모달',
      content: <CustomComponent />,
    });
  };

  const handleLoginRequiredModal = () => {
    openModal({
      content: (
        <LoginRequiredModal
          lang='ko'
          dict={{ auth: { login: { loginButton: '로그인하기' } } } as any}
          redirectPath='/some-page'
          title='로그인 필요'
          message='이 기능을 사용하려면 로그인이 필요합니다.'
        />
      ),
    });
  };

  return (
    <div className='space-y-4 p-6'>
      <h2 className='mb-4 text-2xl font-bold'>전역 모달 데모</h2>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <button
          onClick={handleConfirm}
          className='rounded-lg bg-red-600 p-4 text-white transition-colors hover:bg-red-700'
        >
          간단한 Confirm
        </button>

        <button
          onClick={handleConfirmWithOptions}
          className='rounded-lg bg-orange-600 p-4 text-white transition-colors hover:bg-orange-700'
        >
          옵션이 있는 Confirm
        </button>

        <button
          onClick={handleAlert}
          className='rounded-lg bg-blue-600 p-4 text-white transition-colors hover:bg-blue-700'
        >
          Alert
        </button>

        <button
          onClick={handleCustomModal}
          className='rounded-lg bg-purple-600 p-4 text-white transition-colors hover:bg-purple-700'
        >
          커스텀 모달
        </button>

        <button
          onClick={handleReactComponentModal}
          className='rounded-lg bg-green-600 p-4 text-white transition-colors hover:bg-green-700'
        >
          React 컴포넌트 모달
        </button>

        <button
          onClick={handleLoginRequiredModal}
          className='rounded-lg bg-indigo-600 p-4 text-white transition-colors hover:bg-indigo-700'
        >
          로그인 필요 모달
        </button>
      </div>
    </div>
  );
}
