import { redirect } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { getCurrentUser } from '@/lib/session';
import { constructMetadata } from '@/lib/utils';
import { fetchLanguages } from '@/features/languages/actions';
import { TLanguage } from '@/features/languages/types';
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
  { id: 'wordsSet', name: 'WordsSet' },
];

export async function WordsSetsPage() {
  const user = await getCurrentUser();
  // TODO: Check if user valid and presented in the DB?
  if (!user || !user.id /* || user.role !== 'ADMIN' */) {
    redirect('/login');
  }
  const userId = user.id;
  try {
    const languages: TLanguage[] = await fetchLanguages(userId);
    // TODO: Fetch and pass wordsSets sets list
    // const initialWordsSets: TWordsSet[] = await fetchWordsSets(userId);
    return (
      <>
        <WordsSetsHeader />
        <WordsSetsList
          userId={userId}
          languages={languages}
          initialWordsSets={initialWordsSets}
          // addWordsSet={addWordsSet}
          // deleteWordsSet={deleteWordsSet}
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
