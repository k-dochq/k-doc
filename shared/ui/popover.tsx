'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface PopoverTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface PopoverContentProps {
  className?: string;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  children: React.ReactNode;
}

const PopoverContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
});

export function Popover({ children, open, onOpenChange }: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (isControlled) {
        onOpenChange?.(newOpen);
      } else {
        setInternalOpen(newOpen);
      }
    },
    [isControlled, onOpenChange],
  );

  return (
    <PopoverContext.Provider value={{ open: isOpen, setOpen }}>{children}</PopoverContext.Provider>
  );
}

export function PopoverTrigger({ asChild, children }: PopoverTriggerProps) {
  const { setOpen } = React.useContext(PopoverContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        setOpen(true);
        (children as React.ReactElement<any>).props.onClick?.(e);
      },
    });
  }

  return (
    <button type='button' onClick={() => setOpen(true)} className='inline-flex'>
      {children}
    </button>
  );
}

export function PopoverContent({
  className,
  align = 'center',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  children,
}: PopoverContentProps) {
  const { open, setOpen } = React.useContext(PopoverContext);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  const getPositionClasses = () => {
    const baseClasses = 'absolute z-50';

    switch (side) {
      case 'top':
        return `${baseClasses} bottom-full`;
      case 'right':
        return `${baseClasses} left-full`;
      case 'bottom':
        return `${baseClasses} top-full`;
      case 'left':
        return `${baseClasses} right-full`;
      default:
        return `${baseClasses} top-full`;
    }
  };

  const getAlignClasses = () => {
    switch (align) {
      case 'start':
        return 'left-0';
      case 'center':
        return 'left-1/2 -translate-x-1/2';
      case 'end':
        return 'right-0';
      default:
        return 'left-1/2 -translate-x-1/2';
    }
  };

  const getSideOffsetStyle = () => {
    switch (side) {
      case 'top':
        return { marginBottom: `${sideOffset}px` };
      case 'right':
        return { marginLeft: `${sideOffset}px` };
      case 'bottom':
        return { marginTop: `${sideOffset}px` };
      case 'left':
        return { marginRight: `${sideOffset}px` };
      default:
        return { marginTop: `${sideOffset}px` };
    }
  };

  return (
    <div
      ref={contentRef}
      className={cn(
        getPositionClasses(),
        getAlignClasses(),
        'w-auto rounded-md border bg-white p-1 shadow-md',
        className,
      )}
      style={getSideOffsetStyle()}
    >
      {children}
    </div>
  );
}
