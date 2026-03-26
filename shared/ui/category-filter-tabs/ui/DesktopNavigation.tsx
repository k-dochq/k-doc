import { NavigationButton } from './NavigationButton';
import { LeftArrowIcon, RightArrowIcon } from './ArrowIcons';

interface DesktopNavigationProps {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onScrollPrev: () => void;
  onScrollNext: () => void;
}

export function DesktopNavigation({
  canScrollPrev,
  canScrollNext,
  onScrollPrev,
  onScrollNext,
}: DesktopNavigationProps) {
  return (
    <>
      {/* 왼쪽 음영 효과 */}
      {canScrollPrev && (
        <>
          <div className='pointer-events-none absolute top-0 start-0 z-5 h-full w-8' />
          <NavigationButton direction='start' onClick={onScrollPrev}>
            <LeftArrowIcon className='rtl:scale-x-[-1]' />
          </NavigationButton>
        </>
      )}

      {/* 끝쪽 음영 효과 */}
      {canScrollNext && (
        <>
          <div className='pointer-events-none absolute top-0 end-0 z-5 h-full w-8' />
          <NavigationButton direction='end' onClick={onScrollNext}>
            <RightArrowIcon className='rtl:scale-x-[-1]' />
          </NavigationButton>
        </>
      )}
    </>
  );
}
