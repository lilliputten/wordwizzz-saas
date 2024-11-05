import { redirect } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { getCurrentUser } from '@/lib/session';
import { constructMetadata } from '@/lib/utils';
// import { TWord } from '@/features/words/types';
import { getErrorText } from '@/shared/helpers/strings';

// import { addWord, deleteWord, fetchWords } from './actions';
import { pageDescription, pageTitle } from './constants/texts';
import { WordsError } from './WordsError';
import { WordsHeader } from './WordsHeader';

// import { WordsList } from './WordsList';

export const metadata = constructMetadata({
  title: pageTitle + ' - ' + siteConfig.name,
  description: pageDescription,
});

export async function WordsPage() {
  const user = await getCurrentUser();
  // TODO: Check if user valid and presented in the DB?
  if (!user || !user.id /* || user.role !== 'ADMIN' */) {
    redirect('/login');
  }
  const userId = user.id;
  try {
    // const initialWords: TWord[] = await fetchWords(userId);
    return (
      <>
        <WordsHeader />
        <p>WordsList</p>
        {/*
        <WordsList
          userId={userId}
          initialWords={initialWords}
          addWord={addWord}
          deleteWord={deleteWord}
        />
        */}
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
