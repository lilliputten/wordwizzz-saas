'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { docsConfig } from '@/config/docs';
import { marketingConfig } from '@/config/marketing';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useScroll } from '@/hooks/use-scroll';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { DocsSearch } from '@/components/docs/search';
import { ModalContext } from '@/components/modals/providers';
import { Icons } from '@/components/shared/icons';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import { Logo } from '@/components/shared/Logo';

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function NavBar({ scroll = false }: NavBarProps) {
  const scrolled = useScroll(50);
  const { data: session, status } = useSession();
  const { setShowSignInModal } = useContext(ModalContext);

  const selectedLayout = useSelectedLayoutSegment();
  const showDocumentation = selectedLayout === 'docs';
  const showExtraButtons = false; // showDocumentation;

  const configMap = {
    docs: docsConfig.mainNav,
  };

  const links = (selectedLayout && configMap[selectedLayout]) || marketingConfig.mainNav;

  return (
    <header
      className={cn(
        '--navbar--',
        'sticky',
        'top-0',
        'z-40',
        'flex',
        'w-full',
        'justify-center',
        'transition-all',
        'bg-primary/85',
        'backdrop-blur',
        'before:content-[""]',
        'before:absolute',
        'before:inset-0',
        'before:bg-primary/50',
        'before:mix-blend-color',
        scroll ? (scrolled ? 'border-b' : '') : 'border-b',
      )}
    >
      <MaxWidthWrapper
        className={cn(
          // prettier-ignore
          'flex',
          'h-24',
          'items-center',
          'justify-between',
          'py-4',
          'z-10',
        )}
        large={showDocumentation}
      >
        <div className="flex gap-6 md:gap-10">
          <Link
            href="/"
            className={cn(
              // prettier-ignore
              'flex',
              'items-center',
              'space-x-1.5',
              'gap-2',
              'transition-all',
              'hover:opacity-80',
            )}
          >
            <Logo size="lg" className="size-20" />
            <span
              className={cn(
                // prettier-ignore
                'font-urban',
                'text-xl',
                'text-primary-foreground',
                'font-bold',
              )}
            >
              {siteConfig.name}
            </span>
          </Link>

          {links && links.length > 0 ? (
            <nav className="hidden gap-6 md:flex">
              {links.map((item, index) => (
                <Link
                  key={'navbar-' + String(index)}
                  href={item.disabled ? '#' : item.href}
                  prefetch
                  className={cn(
                    'flex',
                    'items-center',
                    'text-lg',
                    'font-medium',
                    'transition-all',
                    'text-primary-foreground/80',
                    'opacity-100',
                    'hover:opacity-80',
                    'sm:text-sm',
                    item.href.startsWith(`/${selectedLayout}`) && 'text-app-orange',
                    item.disabled && 'cursor-not-allowed opacity-50',
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex items-center space-x-3">
          {/* right header for docs */}
          {showExtraButtons ? (
            <div className="hidden flex-1 items-center space-x-4 sm:justify-end lg:flex">
              <div className="hidden lg:flex lg:grow-0">
                <DocsSearch />
              </div>
              <div className="flex lg:hidden">
                <Icons.search className="size-6 text-primary-foreground" />
              </div>
              {/* // Github button
              <div className="flex space-x-4">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className={cn('text-primary-foreground')}
                >
                  <Icons.github className="size-7" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
              */}
            </div>
          ) : null}

          {session ? (
            <Link
              href={session.user.role === 'ADMIN' ? '/admin' : '/dashboard'}
              className="hidden md:block"
            >
              <Button
                className="gap-2 px-5"
                variant="orange"
                // variant="default"
                size="sm"
                rounded="full"
              >
                <span>Dashboard</span>
              </Button>
            </Link>
          ) : status === 'unauthenticated' ? (
            <Button
              className="hidden gap-2 px-5 md:flex"
              variant="orange"
              size="sm"
              rounded="full"
              onClick={() => setShowSignInModal(true)}
            >
              <span>Sign In</span>
              <Icons.arrowRight className="size-4" />
            </Button>
          ) : (
            <Skeleton className="hidden h-9 w-28 rounded-full lg:flex" />
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
