import { redirect } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { getCurrentUser } from '@/lib/session';
import { constructMetadata } from '@/lib/utils';
import { fetchLanguages } from '@/features/languages/actions';
import { convertLanguagesToClientForm } from '@/features/languages/helpers';
import { TLanguage } from '@/features/languages/types';
import { TWord } from '@/features/words/types';
import { getErrorText } from '@/shared/helpers/strings';

// import { addWord, deleteWord, fetchWords } from '@/features/words/actions';

import { pageDescription, pageTitle } from './constants/texts';
import { WordsError } from './WordsError';
import { WordsHeader } from './WordsHeader';
import { WordsList } from './WordsList';

export const metadata = constructMetadata({
  title: pageTitle + ' - ' + siteConfig.name,
  description: pageDescription,
});

const initialWords: TWord[] = [
  // prettier-ignore
  { id: 'word', text: 'Word' },
];

export async function WordsPage() {
  const user = await getCurrentUser();
  // TODO: Check if user valid and presented in the DB?
  if (!user || !user.id /* || user.role !== 'ADMIN' */) {
    redirect('/login');
  }
  const userId = user.id;
  try {
    const languages: TLanguage[] = await fetchLanguages(userId);
    const clientLanguages = convertLanguagesToClientForm(languages);
    // const initialWords: TWord[] = await fetchWords(userId);
    return (
      <>
        <WordsHeader />
        <WordsList
          userId={userId}
          languages={clientLanguages}
          initialWords={initialWords}
          // addWord={addWord}
          // deleteWord={deleteWord}
        />
      </>
    );
  } catch (error) {
    // TODO: Probably there are no such user in the DB? To do logout and redirect then?
    const errText = getErrorText(error);
    // eslint-disable-next-line no-console
    console.error('[WordsPage] Error fetching usedWords:', errText, {
      error,
    });
    // debugger; // eslint-disable-line no-debugger
    return <WordsError error={errText} />;
  }
}
