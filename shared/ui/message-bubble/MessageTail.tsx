'use client';

interface MessageTailProps {
  variant: 'user' | 'hospital';
  /**
   * 커스텀 그라데이션 색상 (user variant에서만 적용)
   */
  customGradient?: string;
  /**
   * 스크롤 그라디언트 활성화 여부
   */
  enableScrollGradient?: boolean;
}

export function MessageTail({ variant, customGradient, enableScrollGradient = false }: MessageTailProps) {
  const isUser = variant === 'user';

  // user 꼬리 - currentColor 사용으로 부모의 color 상속
  if (isUser) {
    return (
      <div
        className="flex h-5 flex-col content-stretch items-end relative w-[0.1px] shrink-0 justify-end"
      >
        <div className="relative h-5 shrink-0 w-[18px]">
          <div className="absolute bottom-[-1.61%] right-[-75%] left-[-5%] top-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="21"
              viewBox="0 0 18 21"
              fill="none"
              className="block size-full max-w-none"
            >
              <path
                d="M16.9259 20.1846C11.7259 20.9846 6.59258 18.1212 4.92591 16.2879C6.64378 12.1914 -3.962 2.24186 3.038 2.24148C4.65661 2.24148 6.03906 -1.9986 11.9259 1.1846C11.9471 2.47144 11.9259 6.92582 11.9259 7.6842C11.9259 18.1842 17.9259 19.5813 16.9259 20.1846Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // hospital 꼬리 - currentColor 사용으로 부모의 color 상속
  return (
    <div
      className="flex h-5 flex-col content-stretch items-start relative w-[0.1px] shrink-0 justify-end"
    >
      <div className="relative h-5 shrink-0 w-[17px]">
        <div className="absolute bottom-[-1.61%] right-[-4.9%] left-[-44.35%] top-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="21"
            viewBox="0 0 17 21"
            fill="none"
            className="block size-full max-w-none"
          >
            <path
              d="M0.234243 0.815399C5.43424 0.0153999 10.5676 2.87877 12.2342 4.71211C10.5164 8.80857 21.1222 18.7581 14.1222 18.7585C12.5036 18.7585 11.1211 22.9986 5.23424 19.8154C5.21303 18.5286 5.23424 14.0742 5.23424 13.3158C5.23424 2.8158 -0.765757 1.41869 0.234243 0.815399Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
