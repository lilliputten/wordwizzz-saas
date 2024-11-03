import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/session';
import { constructMetadata } from '@/lib/utils';
import { DashboardHeader } from '@/components/dashboard/header';
import { siteConfig } from '@/config/site';

import { LanguagesList } from './LanguagesList';
import { LanguagePageError } from './LanguagePageError';
import { TPrismaLanguage } from './types/TPrismaLanguage';
import { TLanguage } from './types/TLanguage';
import { convertPrismaLanguagesToClient } from './helpers/convertPrismaLanguagesToClient';

import { updateLanguages } from './actions/updateLanguages';
import { fetchLanguages } from './actions/fetchLanguages';

export const metadata = constructMetadata({
  title: 'Languages - ' + siteConfig.name,
  description: 'Check and manage your latest languages.',
});

export async function LanguagesPage() {
  const user = await getCurrentUser();
  if (!user || !user.id /* || user.role !== 'ADMIN' */) {
    redirect('/login');
  }
  const userId = user.id;
  /* console.log('[LanguagesPage]', {
   *   userId,
   *   user,
   * });
   */
  try {
    const prismaLanguages: TPrismaLanguage[] = await fetchLanguages(userId);
    const clientLanguages: TLanguage[] = convertPrismaLanguagesToClient(prismaLanguages);
    return (
      <>
        <DashboardHeader heading="Languages" text="Check and manage your latest languages." />
        <LanguagesList
          userId={userId}
          initialLanguages={clientLanguages}
          updateLanguages={updateLanguages}
        />
      </>
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[LanguagesPage] Error fetching usedLanguages', {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    return <LanguagePageError error={error} />;
  }
}
