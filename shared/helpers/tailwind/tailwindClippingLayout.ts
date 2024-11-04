// TODO: Create `tailwindScrollingWrapper`

import { cn } from '@/lib/utils';

interface TTailwindClippingLayoutParams {
  className?: string;
  clippingLayout?: boolean;
  vertical?: boolean;
}
export function tailwindClippingLayout(params: TTailwindClippingLayoutParams = {}) {
  const {
    // prettier-ignore
    clippingLayout = true,
    className,
    vertical,
  } = params;
  return cn(
    className,
    clippingLayout &&
      [
        // Clipping layout
        '__tailwindClippingLayout',
        // 'h-screen',
        // 'w-screen',
        // 'flex-1', // TODO: To remove or make optional
        'flex',
        'size-full',
        // 'h-full',
        'overflow-hidden',
        vertical && 'flex-col',
      ]
        .filter(Boolean)
        .join(' '),
  );
}
