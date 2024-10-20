// import { redirect } from 'next/navigation';

// import { getCurrentUser } from '@/lib/session';
import { constructMetadata } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/dashboard/header';
import { EmptyPlaceholder } from '@/components/shared/empty-placeholder';

export const metadata = constructMetadata({
  title: 'Languages - WordWizzz!',
  description: 'Check and manage your latest languages.',
});

export default async function LanguagesPage() {
  // const user = await getCurrentUser();
  // if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader heading="Languages" text="Check and manage your latest languages." />
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="package" />
        <EmptyPlaceholder.Title>No languages listed</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You dont have any languages yet. Start languageing a product.
        </EmptyPlaceholder.Description>
        <Button>Buy Products</Button>
      </EmptyPlaceholder>
    </>
  );
}
