'use client';

import { useState } from 'react';

// 에러를 발생시키는 컴포넌트
function ErrorThrower({ errorType }: { errorType: string }) {
  // 렌더링 중에 에러를 발생시켜 Error Boundary가 캐치하도록 함
  switch (errorType) {
    case 'runtime':
      throw new Error('테스트용 런타임 에러입니다! Error Boundary가 캐치하여 Sentry로 전송됩니다.');

    case 'reference':
      // 의도적으로 정의되지 않은 변수 사용하여 ReferenceError 발생
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const refError = undefinedVariable;
      throw new Error(`ReferenceError: ${refError}`);

    case 'type':
      // 의도적으로 null 메서드 호출하여 TypeError 발생
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const typeError = null.someMethod();
      throw new Error(`TypeError: ${typeError}`);

    case 'async-render':
      // 렌더링 중 비동기 작업 시도 (실제로는 동기적으로 에러 발생)
      throw new Error('테스트용 렌더링 에러입니다! Error Boundary가 캐치합니다.');

    default:
      return null;
  }
}

export default function SentryTestPage() {
  const [errorType, setErrorType] = useState<string>('');

  const triggerError = (type: string) => {
    setErrorType(type);
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mx-auto max-w-2xl'>
        <h1 className='mb-8 text-3xl font-bold text-gray-900'>🧪 Sentry 에러 테스트 페이지</h1>

        <div className='mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4'>
          <h2 className='mb-2 text-lg font-semibold text-blue-800'>ℹ️ 안내</h2>
          <p className='text-sm text-blue-700'>
            이 페이지는 Sentry 에러 모니터링을 테스트하기 위한 페이지입니다. 각 버튼을 클릭하면
            다양한 종류의 에러가 발생하여 Error Boundary(error.tsx)가 캐치하고, 거기서 Sentry로
            전송됩니다.
          </p>
        </div>

        {errorType && <ErrorThrower errorType={errorType} />}

        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-800'>에러 유형별 테스트</h2>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <button
              onClick={() => triggerError('runtime')}
              className='rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700'
            >
              🚨 런타임 에러
              <span className='block text-xs opacity-90'>(Error Boundary 캐치)</span>
            </button>

            <button
              onClick={() => triggerError('reference')}
              className='rounded-lg bg-orange-600 px-4 py-3 font-medium text-white transition-colors hover:bg-orange-700'
            >
              📝 ReferenceError
              <span className='block text-xs opacity-90'>(Error Boundary 캐치)</span>
            </button>

            <button
              onClick={() => triggerError('type')}
              className='rounded-lg bg-purple-600 px-4 py-3 font-medium text-white transition-colors hover:bg-purple-700'
            >
              🔧 TypeError
              <span className='block text-xs opacity-90'>(Error Boundary 캐치)</span>
            </button>

            <button
              onClick={() => triggerError('async-render')}
              className='rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700'
            >
              ⏰ 렌더링 에러
              <span className='block text-xs opacity-90'>(Error Boundary 캐치)</span>
            </button>
          </div>
        </div>

        {errorType && (
          <div className='mt-6 rounded-lg bg-gray-100 p-4'>
            <h3 className='mb-2 font-semibold text-gray-800'>
              에러 발생: <span className='text-red-600'>{errorType}</span>
            </h3>
            <p className='text-sm text-gray-600'>
              Error Boundary가 에러를 캐치하여 error.tsx로 이동합니다. error.tsx에서 Sentry로
              전송됩니다.
            </p>
          </div>
        )}

        <div className='mt-8 rounded-lg border border-green-200 bg-green-50 p-4'>
          <h3 className='mb-2 font-semibold text-green-800'>📋 테스트 체크리스트</h3>
          <ul className='space-y-1 text-sm text-green-700'>
            <li>✅ Sentry DSN 설정 확인</li>
            <li>✅ 브라우저 개발자 도구 콘솔 확인</li>
            <li>✅ error.tsx 페이지로 이동하는지 확인</li>
            <li>✅ Sentry 대시보드에서 이벤트 수신 확인</li>
            <li>✅ 에러 상세 정보 확인 (스택 트레이스, 컨텍스트 등)</li>
          </ul>
        </div>

        <div className='mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
          <h3 className='mb-2 font-semibold text-yellow-800'>⚠️ 참고사항</h3>
          <ul className='space-y-1 text-sm text-yellow-700'>
            <li>
              • 모든 에러는 <strong>Error Boundary</strong>가 캐치하여 <strong>error.tsx</strong>로
              이동합니다
            </li>
            <li>
              • <strong>error.tsx</strong>에서 <strong>Sentry.captureException</strong>을 호출하여
              Sentry로 전송됩니다
            </li>
            <li>
              • 에러 페이지에서 <strong>&quot;Try Again&quot;</strong> 버튼을 클릭하면 다시 테스트할
              수 있습니다
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
