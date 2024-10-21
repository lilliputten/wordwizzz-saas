// import { redirect } from 'next/navigation';
// import { getCurrentUser } from '@/lib/session';
import { constructMetadata } from '@/lib/utils';
import { DashboardHeader } from '@/components/dashboard/header';
import { siteConfig } from '@/config/site';

import { LanguagesList } from './LanguagesList';

export const metadata = constructMetadata({
  title: 'Languages - ' + siteConfig.name,
  description: 'Check and manage your latest languages.',
});

export default function LanguagesPage() {
  // const user = await getCurrentUser();
  // if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader heading="Languages" text="Check and manage your latest languages." />
      <LanguagesList />
    </>
  );
}
