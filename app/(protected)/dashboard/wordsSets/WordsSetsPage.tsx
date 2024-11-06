import { redirect } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { getCurrentUser } from '@/lib/session';
import { constructMetadata } from '@/lib/utils';
import { fetchLanguages } from '@/features/languages/actions';
import { convertLanguagesToClientForm } from '@/features/languages/helpers';
import { TLanguage } from '@/features/languages/types';
import { addWordsSet, deleteWordsSet, fetchWordsSetsData } from '@/features/wordsSets/actions';
import { convertWordsSetsToClientForm } from '@/features/wordsSets/helpers';
import { TWordsSet } from '@/features/wordsSets/types';
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

const initialWordsSets: TWordsSet[] = [
  // prettier-ignore
  { id: 'aa', name: 'AA' },
];

export async function WordsSetsPage() {
  const user = await getCurrentUser();
  // TODO: Check if user valid and presented in the DB?
  if (!user || !user.id /* || user.role !== 'ADMIN' */) {
    redirect('/login');
  }
  const userId = user.id;
  try {
    // const languages: TLanguage[] = await fetchLanguages(userId);
    // TODO: Fetch and pass wordsSets sets list
    const data = await fetchWordsSetsData(userId);
    const { languages, wordsSets } = data;
    const clientLanguages = convertLanguagesToClientForm(languages);
    const clientWordsSets = convertWordsSetsToClientForm(wordsSets);
    console.log('[WordsSetsPage]', {
      languages,
      wordsSets,
      clientLanguages,
      clientWordsSets,
      data,
    });
    return (
      <>
        <WordsSetsHeader />
        <WordsSetsList
          userId={userId}
          // Pass required data to the client
          languages={clientLanguages}
          initialWordsSets={clientWordsSets}
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
