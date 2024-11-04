import { redirect } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { getCurrentUser } from '@/lib/session';
import { constructMetadata } from '@/lib/utils';
import { TLanguage } from '@/features/languages/types';

import { addLanguage, deleteLanguage, fetchLanguages } from './actions';
import { LanguagePageError } from './LanguagePageError';
import { LanguagesHeader } from './LanguagesHeader';
import { LanguagesList } from './LanguagesList';

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
  try {
    const initialLanguages: TLanguage[] = await fetchLanguages(userId);
    return (
      <>
        <LanguagesHeader />
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
