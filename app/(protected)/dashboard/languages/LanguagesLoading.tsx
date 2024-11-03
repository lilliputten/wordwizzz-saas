import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardHeader } from '@/components/dashboard/header';

export function LanguagesLoading() {
  return (
    <>
      <DashboardHeader
        // prettier-ignore
        heading="Languages (loading)"
        text="Check and manage your latest languages."
      />
      <Skeleton
        className={cn(
          '__LanguagesLoading size-full rounded-lg',
          'border-2 border-dashed border-black',
        )}
      />
    </>
  );
}
