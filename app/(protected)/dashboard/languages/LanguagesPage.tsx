import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/session';
import { constructMetadata } from '@/lib/utils';
import { DashboardHeader } from '@/components/dashboard/header';
import { siteConfig } from '@/config/site';

import { LanguagesList } from './LanguagesList';
import { LanguagePageError } from './LanguagePageError';
import { TLanguage } from './types';

import { fetchLanguages, addLanguage, deleteLanguage } from './actions';

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
    const initialLanguages: TLanguage[] = await fetchLanguages(userId);
    return (
      <>
        <DashboardHeader
          heading="Languages"
          text="Check and manage languages what you could use for all your applications."
        />
        <LanguagesList
          userId={userId}
          initialLanguages={initialLanguages}
          addLanguage={addLanguage}
          deleteLanguage={deleteLanguage}
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
