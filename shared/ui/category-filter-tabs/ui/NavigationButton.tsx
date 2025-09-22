interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  children: React.ReactNode;
}

export function NavigationButton({ direction, onClick, children }: NavigationButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[1px_2px_10px_0_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-105 hover:shadow-lg ${direction === 'left' ? 'left-0' : 'right-0'} `}
    >
      {children}
    </button>
  );
}
