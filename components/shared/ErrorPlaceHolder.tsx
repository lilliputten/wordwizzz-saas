import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/shared/icons';

interface ErrorPlaceHolderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ErrorPlaceHolder({ className, children, ...props }: ErrorPlaceHolderProps) {
  return (
    <div
      className={cn(
        'flex flex-1 items-center justify-center rounded-lg border border-dashed p-8 text-center shadow-sm animate-in fade-in-50',
        className,
      )}
      {...props}
    >
      <div className="flex max-w-[420px] flex-col items-center text-center">{children}</div>
    </div>
  );
}

interface ErrorPlaceHolderIconProps extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof Icons;
  ref?: ((instance: SVGSVGElement | null) => void) | React.RefObject<SVGSVGElement> | null;
}

ErrorPlaceHolder.Icon = function ErrorPlaceHolderIcon({
  name,
  className,
  ...props
}: ErrorPlaceHolderIconProps) {
  const Icon = Icons[name];

  if (!Icon) {
    return null;
  }

  return (
    <div className="flex size-20 items-center justify-center rounded-full bg-destructive text-white">
      <Icon className={cn('size-10', className)} {...props} />
    </div>
  );
};

interface ErrorPlaceHolderTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

ErrorPlaceHolder.Title = function ErrorPlaceHolderTitle({
  className,
  ...props
}: ErrorPlaceHolderTitleProps) {
  return <h3 className={cn('mt-5 font-heading text-2xl font-bold', className)} {...props} />;
};

interface ErrorPlaceHolderDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

ErrorPlaceHolder.Description = function ErrorPlaceHolderDescription({
  className,
  ...props
}: ErrorPlaceHolderDescriptionProps) {
  return (
    <p
      className={cn(
        'mb-5 mt-1.5 text-center text-sm font-normal leading-6 text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
};
