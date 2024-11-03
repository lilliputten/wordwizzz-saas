// import { useThemeContext } from "@radix-ui/themes";
import { useTheme } from 'next-themes';

import {
  // backgroundLightColor,
  // foregroundLightColor,
  // backgroundDarkColor,
  // foregroundDarkColor,
  // appBlueColor,
  secondaryColor,
} from '@/styles/cssVariables';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/shared/icons';

interface TWaitingSplashProps {
  show?: boolean;
  theme?: string;
}

export function WaitingSplash(props: TWaitingSplashProps) {
  const {
    // prettier-ignore
    show,
    theme: userTheme,
  } = props;
  const hidden = !show;
  const { resolvedTheme } = useTheme();
  const theme = userTheme != undefined ? userTheme : resolvedTheme;
  const isLight = theme !== 'dark';
  /* console.log('[WaitingSplash]', {
   *   appBlueColor,
   *   theme,
   * });
   */
  return (
    <div
      className={cn(
        '__WaitingSplash',
        hidden ? '__WaitingSplash_Hidden' : '__WaitingSplash_Visible',
        'absolute',
        'inset-0',
        'flex',
        'flex-col',
        'items-center',
        'content-center',
        'justify-center',
        'transition-opacity',
        hidden && 'opacity-0',
        hidden && 'pointer-events-none',
      )}
    >
      <div
        className={cn(
          '__WaitingSplash_Backdrop',
          'absolute',
          'inset-0',
          'opacity-80',
          isLight ? 'bg-backgroundLight' : 'bg-backgroundDark',
        )}
      />
      <Icons.spinner
        className={cn(
          // prettier-ignore
          // 'opacity-50',
          'size-8',
          'animate-spin',
        )}
        // color={isLight ? foregroundLightColor : foregroundDarkColor}
        color={secondaryColor}
      />
    </div>
  );
}
