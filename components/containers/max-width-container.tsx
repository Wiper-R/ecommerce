import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export function MaxWidthContainer({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn('max-w-screen-xl w-full mx-auto', className)}
      {...props}
    />
  );
}
