import { Skeleton } from '@/components/ui/skeleton';
import { DashboardHeader } from '@/components/dashboard/header';

export default function WordsLoading() {
  return (
    <>
      <DashboardHeader heading="Words" text="Check and manage your latest words." />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
