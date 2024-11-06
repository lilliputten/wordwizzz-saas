import { redirect } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { getCurrentUser } from '@/lib/session';
import { constructMetadata } from '@/lib/utils';
import { addLanguage, deleteLanguage, fetchLanguages } from '@/features/languages/actions';
import { TLanguage } from '@/features/languages/types';
import { getErrorText } from '@/shared/helpers/strings';
import { UseScrollableLayout } from '@/shared/helpers/ui/ScrollableLayout';

import { pageDescription, pageTitle } from './constants/texts';
import { LanguagesError } from './LanguagesError';
import { LanguagesHeader } from './LanguagesHeader';
import { LanguagesList } from './LanguagesList';

export const metadata = constructMetadata({
  title: pageTitle + ' - ' + siteConfig.name,
  description: pageDescription,
});

export async function LanguagesPage() {
  const user = await getCurrentUser();
  // TODO: Check if user valid and presented in the DB?
  if (!user || !user.id /* || user.role !== 'ADMIN' */) {
    redirect('/login');
  }
  const userId = user.id;
  try {
    const initialLanguages: TLanguage[] = await fetchLanguages(userId);
    return (
      <>
        <UseScrollableLayout type="clippable" />
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
    // TODO: Probably there are no such user in the DB? To do logout and redirect then?
    const errText = getErrorText(error);
    // eslint-disable-next-line no-console
    console.error('[LanguagesPage] Error fetching languages:', errText, {
      error,
    });
    // debugger; // eslint-disable-line no-debugger
    return <LanguagesError error={errText} />;
  }
}
