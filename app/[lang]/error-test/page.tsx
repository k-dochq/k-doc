'use client';

import { useState } from 'react';
import { sendErrorToSlack } from 'shared/lib/error-tracking/send-error-to-slack';

export default function ErrorTestPage() {
  const [errorType, setErrorType] = useState<string>('');
  const [shouldThrowError, setShouldThrowError] = useState<string>('');

  // 렌더링 중에 에러를 발생시켜 Error Boundary가 캐치할 수 있도록 함
  if (shouldThrowError) {
    throw new Error(`테스트용 ${shouldThrowError} 에러입니다!`);
  }

  const triggerError = (type: string) => {
    setErrorType(type);

    switch (type) {
      case 'runtime':
        // 렌더링 중에 에러를 발생시켜 Error Boundary가 캐치할 수 있도록 함
        setShouldThrowError('런타임');

      case 'reference':
        // ReferenceError 발생
        // @ts-expect-error - 의도적으로 정의되지 않은 변수 사용
        console.log(undefinedVariable);

      case 'type':
        // TypeError 발생
        // @ts-expect-error - 의도적으로 null 메서드 호출
        null.someMethod();

      case 'async':
        // 비동기 에러 발생
        setTimeout(() => {
          throw new Error('테스트용 비동기 에러입니다!');
        }, 1000);
        break;

      case 'promise':
        // Promise 에러 발생
        Promise.reject(new Error('테스트용 Promise 에러입니다!'));
        break;

      case 'fetch':
        // Fetch 에러 발생
        fetch('/non-existent-endpoint')
          .then(() => {})
          .catch((error) => {
            throw new Error(`테스트용 Fetch 에러: ${error.message}`);
          });
        break;

      case 'direct-slack':
        // 직접 Slack 전송 테스트
        const testError = new Error('직접 Slack 전송 테스트 에러입니다!');
        sendErrorToSlack({
          error: testError,
          errorBoundary: 'direct-test',
          additionalInfo: {
            testType: 'direct-slack',
            timestamp: new Date().toISOString(),
          },
        });
        break;

      default:
        break;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mx-auto max-w-2xl'>
        <h1 className='mb-8 text-3xl font-bold text-gray-900'>🧪 에러 테스트 페이지</h1>

        <div className='mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
          <h2 className='mb-2 text-lg font-semibold text-yellow-800'>⚠️ 주의사항</h2>
          <p className='text-sm text-yellow-700'>
            이 페이지는 Slack 에러 모니터링을 테스트하기 위한 페이지입니다. 각 버튼을 클릭하면
            다양한 종류의 에러가 발생하여 Slack #모니터링 채널로 전송됩니다.
          </p>
        </div>

        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-800'>에러 유형별 테스트</h2>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <button
              onClick={() => triggerError('runtime')}
              className='rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700'
            >
              🚨 런타임 에러
            </button>

            <button
              onClick={() => triggerError('reference')}
              className='rounded-lg bg-orange-600 px-4 py-3 font-medium text-white transition-colors hover:bg-orange-700'
            >
              📝 ReferenceError
            </button>

            <button
              onClick={() => triggerError('type')}
              className='rounded-lg bg-purple-600 px-4 py-3 font-medium text-white transition-colors hover:bg-purple-700'
            >
              🔧 TypeError
            </button>

            <button
              onClick={() => triggerError('async')}
              className='rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700'
            >
              ⏰ 비동기 에러
            </button>

            <button
              onClick={() => triggerError('promise')}
              className='rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition-colors hover:bg-indigo-700'
            >
              🔄 Promise 에러
            </button>

            <button
              onClick={() => triggerError('fetch')}
              className='rounded-lg bg-teal-600 px-4 py-3 font-medium text-white transition-colors hover:bg-teal-700'
            >
              🌐 Fetch 에러
            </button>

            <button
              onClick={() => triggerError('direct-slack')}
              className='rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700'
            >
              🚀 직접 Slack 테스트
            </button>
          </div>
        </div>

        {errorType && (
          <div className='mt-6 rounded-lg bg-gray-100 p-4'>
            <h3 className='mb-2 font-semibold text-gray-800'>
              마지막 테스트된 에러 유형: {errorType}
            </h3>
            <p className='text-sm text-gray-600'>Slack #모니터링 채널을 확인해보세요!</p>
          </div>
        )}

        <div className='mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4'>
          <h3 className='mb-2 font-semibold text-blue-800'>📋 테스트 체크리스트</h3>
          <ul className='space-y-1 text-sm text-blue-700'>
            <li>✅ 환경변수 NEXT_PUBLIC_SLACK_BOT_TOKEN 설정 확인</li>
            <li>✅ Slack #모니터링 채널 존재 확인</li>
            <li>✅ 브라우저 개발자 도구 콘솔 확인</li>
            <li>✅ Slack 메시지 수신 확인</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
