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
          <div className='pointer-events-none absolute top-0 left-0 z-5 h-full w-8' />
          <NavigationButton direction='left' onClick={onScrollPrev}>
            <LeftArrowIcon />
          </NavigationButton>
        </>
      )}

      {/* 오른쪽 음영 효과 */}
      {canScrollNext && (
        <>
          <div className='pointer-events-none absolute top-0 right-0 z-5 h-full w-8' />
          <NavigationButton direction='right' onClick={onScrollNext}>
            <RightArrowIcon />
          </NavigationButton>
        </>
      )}
    </>
  );
}
