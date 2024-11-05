// import { redirect } from 'next/navigation';

// import { getCurrentUser } from '@/lib/session';
import { constructMetadata } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/dashboard/header';
import { EmptyPlaceholder } from '@/components/shared/EmptyPlaceholder';

export const metadata = constructMetadata({
  title: 'Words - WordWizzz!',
  description: 'Check and manage your latest words.',
});

export default async function WordsPage() {
  // const user = await getCurrentUser();
  // if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader heading="Words" text="Check and manage your latest words." />
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="package" />
        <EmptyPlaceholder.Title>No words listed</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You dont have any words yet. Start wording a product.
        </EmptyPlaceholder.Description>
        <Button>Buy Products</Button>
      </EmptyPlaceholder>
    </>
  );
}
