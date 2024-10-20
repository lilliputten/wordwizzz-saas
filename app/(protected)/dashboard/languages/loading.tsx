import { Skeleton } from '@/components/ui/skeleton';
import { DashboardHeader } from '@/components/dashboard/header';

export default function LanguagesLoading() {
  return (
    <>
      <DashboardHeader heading="Languages" text="Check and manage your latest languages." />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
