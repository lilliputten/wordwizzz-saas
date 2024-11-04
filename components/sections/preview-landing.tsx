import Image from 'next/image';

import MaxWidthWrapper from '@/components/shared/max-width-wrapper';

export default function PreviewLanding() {
  return (
    <div className="pb-6 sm:pb-16">
      <MaxWidthWrapper>
        <div className="md:bg-muted/30 rounded-xl md:p-3.5 md:ring-1 md:ring-inset md:ring-border">
          <div className="relative aspect-video overflow-hidden rounded-xl border md:rounded-lg">
            <Image
              className="size-full object-cover object-center dark:opacity-85 dark:invert"
              src="/_static/blog/blog-post-3.jpg"
              alt="preview landing"
              width={2000}
              height={1000}
              priority
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
