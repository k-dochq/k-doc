'use client';

import * as React from 'react';
import * as DrawerPrimitive from 'vaul';

import { cn } from '@/lib/utils';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';

const Drawer = DrawerPrimitive.Root;

const DrawerTrigger = DrawerPrimitive.Drawer.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Drawer.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Drawer.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Drawer.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Drawer.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/80', className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Drawer.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Drawer.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Drawer.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Drawer.Content
      ref={ref}
      className={cn(
        'bg-background fixed bottom-0 left-1/2 z-50 mt-24 flex h-auto -translate-x-1/2 flex-col rounded-t-[16px] border',
        MAX_MOBILE_WIDTH_CLASS,
        className,
      )}
      {...props}
    >
      <div className='bg-muted mx-auto mt-4 w-[100px] rounded-full' />
      {children}
    </DrawerPrimitive.Drawer.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-lg leading-none font-semibold tracking-tight', className)}
    {...props}
  />
));
DrawerTitle.displayName = 'DrawerTitle';

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
));
DrawerDescription.displayName = 'DrawerDescription';

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
