'use client';

interface MessageTailProps {
  variant: 'user' | 'hospital';
}

export function MessageTail({ variant }: MessageTailProps) {
  // SVG 경로들 (Figma에서 추출한 tail 이미지들)
  const hospitalTailSvg =
    "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='17' height='21' viewBox='0 0 17 21' fill='none'%3e%3cpath d='M0.234243 0.815399C5.43424 0.0153999 10.5676 2.87877 12.2342 4.71211C10.5164 8.80857 21.1222 18.7581 14.1222 18.7585C12.5036 18.7585 11.1211 22.9986 5.23424 19.8154C5.21303 18.5286 5.23424 14.0742 5.23424 13.3158C5.23424 2.8158 -0.765757 1.41869 0.234243 0.815399Z' fill='%23F5F5F5'/%3e%3c/svg%3e";
  const userTailSvg =
    "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='18' height='21' viewBox='0 0 18 21' fill='none'%3e%3cpath d='M16.9259 20.1846C11.7259 20.9846 6.59258 18.1212 4.92591 16.2879C6.64378 12.1914 -3.962 2.24186 3.038 2.24148C4.65661 2.24148 6.03906 -1.9986 11.9259 1.1846C11.9471 2.47144 11.9259 6.92582 11.9259 7.6842C11.9259 18.1842 17.9259 19.5813 16.9259 20.1846Z' fill='url(%23paint0_linear_1325_10925)'/%3e%3cdefs%3e%3clinearGradient id='paint0_linear_1325_10925' x1='8.82972' y1='0' x2='8.82972' y2='20.3225' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23C03BF6'/%3e%3cstop offset='1' stop-color='%23C33DF5'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";

  const isUser = variant === 'user';
  const tailSvg = isUser ? userTailSvg : hospitalTailSvg;

  return (
    <div
      className={`flex h-5 flex-col content-stretch items-${isUser ? 'end' : 'start'} relative w-[0.1px] shrink-0 justify-end`}
    >
      <div className={`relative h-5 shrink-0 ${isUser ? 'w-[18px]' : 'w-[17px]'}`}>
        <div
          className={`absolute bottom-[-1.61%] ${
            isUser ? 'right-[-75%] left-[-5%]' : 'right-[-4.9%] left-[-44.35%]'
          } top-0`}
        >
          <img
            alt=''
            className={`block size-full max-w-none ${!isUser ? 'rotate-[-90deg]' : ''}`}
            src={tailSvg}
          />
        </div>
      </div>
    </div>
  );
}
