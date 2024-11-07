import { redirect } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { getCurrentUser } from '@/lib/session';
import { constructMetadata } from '@/lib/utils';
import { fetchLanguages } from '@/features/languages/actions';
import { convertLanguagesToClientForm } from '@/features/languages/helpers';
import { addWordsSet, deleteWordsSet, fetchWordsSetsData } from '@/features/wordsSets/actions';
import { getErrorText } from '@/shared/helpers/strings';

// import { addWordsSet, deleteWordsSet, fetchWordsSets } from '@/features/wordsSets/actions';

import { pageDescription, pageTitle } from './constants/texts';
import { WordsSetsError } from './WordsSetsError';
import { WordsSetsHeader } from './WordsSetsHeader';
import { WordsSetsList } from './WordsSetsList';

export const metadata = constructMetadata({
  title: pageTitle + ' - ' + siteConfig.name,
  description: pageDescription,
});

export async function WordsSetsPage() {
  const user = await getCurrentUser();
  // TODO: Check if user valid and presented in the DB?
  if (!user || !user.id /* || user.role !== 'ADMIN' */) {
    redirect('/login');
  }
  const userId = user.id;
  try {
    const languages = await fetchLanguages(userId);
    const wordsSets = await fetchWordsSetsData(userId);
    const clientLanguages = convertLanguagesToClientForm(languages);
    const initialWordsSets = wordsSets; // convertWordsSetsToClientForm(wordsSets);
    console.log('[WordsSetsPage]', {
      languages,
      wordsSets,
      clientLanguages,
      initialWordsSets,
    });
    return (
      <>
        <WordsSetsHeader />
        <WordsSetsList
          userId={userId}
          // Pass required data to the client
          languages={clientLanguages}
          initialWordsSets={initialWordsSets}
          // Pass server actions to the client
          addWordsSet={addWordsSet}
          deleteWordsSet={deleteWordsSet}
        />
      </>
    );
  } catch (error) {
    // TODO: Probably there are no such user in the DB? To do logout and redirect then?
    const errText = getErrorText(error);
    // eslint-disable-next-line no-console
    console.error('[WordsSetsPage] Error fetching usedWordsSets:', errText, {
      error,
    });
    // debugger; // eslint-disable-line no-debugger
    return <WordsSetsError error={errText} />;
  }
}
