import Image from 'next/image';

// import { cn } from '@/lib/utils';
import { TPropsWithClassName } from '@/types/generic';

type TLogoSize = 'md' | 'sm' | 'lg';
const defaultSize: TLogoSize = 'lg';

interface TProps extends TPropsWithClassName {
  size?: TLogoSize;
}

const logoSize = 96;

const sources: Record<TLogoSize, string> = {
  sm: '/_static/logo/sm-super-simple.svg',
  md: '/_static/logo/sm-tr-sq-no-details.svg',
  lg: '/_static/logo/tr.svg',
};

export function Logo(props: TProps) {
  const { className, size = defaultSize } = props;
  const src = sources[size];
  return (
    <Image
      // prettier-ignore
      src={src}
      className={className}
      width={logoSize}
      height={logoSize}
      alt="Logo"
    />
  );
}
